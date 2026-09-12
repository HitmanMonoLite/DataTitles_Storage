from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from Backend.DataBase_Logic.data_base_handler import db_handler

from AuthUser.views import router as auth_user

from config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db_handler.connect()
    yield
    await db_handler.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_user, tags=["Autorisation"])

if __name__ == '__main__':
    uvicorn.run('main:app', host=settings.app_host, reload=True)