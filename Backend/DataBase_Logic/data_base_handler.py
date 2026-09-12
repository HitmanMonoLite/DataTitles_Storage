import asyncpg

from Backend.models.pydentic_models import User
from config import settings

class DatabaseHandler:
    def __init__(self):
        self.pool: asyncpg.Pool | None = None

    async def connect(self):
        try:
            self.pool = await asyncpg.create_pool(
                host=settings.postgres_host,
                port=settings.postgres_port,
                user=settings.postgres_user,
                password=settings.postgres_password,
                database=settings.postgres_db_name,
                min_size=1,
                max_size=25
            )
            print("[INFO] Database pool created successfully")
        except Exception as error:
            print(f"[ERROR] Failed to create database pool: {error}")

    async def disconnect(self):
        if self.pool:
            await self.pool.close()
            print("[INFO] Database pool closed")

    async def get_userinfo_from_database(self, email: str) -> User | None:
        if not self.pool:
            raise RuntimeError("Database is not connected")

        async with self.pool.acquire() as connection:
            row = await connection.fetchrow(
                "SELECT id, username, email, password FROM users WHERE email = $1",
                email
            )


        if row is None:
            return None

        return User(
            id=row['id'],
            username=row['username'],
            email=row['email'],
            password=row['password']
        )

    async def create_user_in_database(self, username: str, email: str, password_hash: str) -> None:
        if not self.pool:
            raise RuntimeError("Database is not connected")

        async with self.pool.acquire() as connection:
            async with connection.transaction():
                await connection.execute(
                    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                    username, email, password_hash
                )
                print(f"[INFO] User {username} created successfully")

db_handler = DatabaseHandler()





'''legacy ver.'''
# async def connection_to_database(func: Callable) -> Callable:
#     async def wrapper(*args, **kwargs) -> Any:
#         connection = None
#
#         try:
#             connection = psycopg2.connect(
#                 host=host,
#                 user=user,
#                 password=passwd,
#                 database=db_name,
#             )
#
#             with connection.cursor() as cursor:
#                 result = func(cursor, *args, **kwargs)
#                 connection.commit()
#                 return result
#
#         except Exception as e:
#             print("[ERROR] Error", e)
#
#         finally:
#             if connection:
#                 connection.close()
#                 print("[INFO] Connection closed")
#
#     return wrapper
#
# @connection_to_database
# async def get_userinfo_from_database(cursor, email: str) -> User | None:
#     cursor.execute(
#         "SELECT id, username, email, password FROM users WHERE email = %s",
#         (email,)
#     )
#     print("[INFO] Request completed successfully")
#
#     row = cursor.fetchone()
#     if row is None:
#         return None
#
#     return User(id=row[0], username=row[1], email=row[2], password=row[3])
#
# @connection_to_database
# async def create_user_in_database(cursor, request: str, params=None) -> None:
#     cursor.execute(
#         request,
#         params
#     )
#     print("[INFO] Request completed successfully")