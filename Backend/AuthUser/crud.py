import secrets
from time import time

from user_agents import parse
from typing import Annotated
from pydantic import TypeAdapter, EmailStr, ValidationError
from fastapi import Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pwdlib import PasswordHash

from Backend.DataBase_Logic.data_base_handler import db_handler
from Backend.AuthUser import exceptions
from Backend.models.pydentic_models import AgentUserInfo

from SessionDataBase.post_data_in_redis import generate_session_id

security = HTTPBasic()

email_adapter = TypeAdapter(EmailStr)
password_helper = PasswordHash.recommended()

async def validate_email(email: str) -> None:
    try:
        email_adapter.validate_python(email)
    except ValidationError:
        raise await exceptions.invalid_email()

async def parse_user_agent(user_agent: str) -> AgentUserInfo:
    user_agent_output = parse(user_agent)

    return AgentUserInfo(
        browser=user_agent_output.browser.family,
        browser_version=user_agent_output.browser.version_string,
        os=user_agent_output.os.family,
        os_version=user_agent_output.os.version_string,
        device=user_agent_output.device.family,
    )


async def create_session_data(auth_user: dict, user_agent: str | None) -> dict:

    agent = await parse_user_agent(user_agent) if user_agent else None

    return {
        "session_id": await generate_session_id(),
        "username": auth_user["username"],
        "email": auth_user["email"],
        "agent_user_info": agent,
        "login_at": int(time()),
    }


async def get_auth_user_userinfo(
    credentials: Annotated[HTTPBasicCredentials, Depends(security)],
) -> dict:

    await validate_email(credentials.username)

    user = await db_handler.get_userinfo_from_database(credentials.username)
    if not user:
        raise await exceptions.invalid_key_authorize()


    if not password_helper.verify(credentials.password, user.password):
        raise await exceptions.invalid_key_authorize()

    return {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
    }


async def generate_session_key(length: int = 32) -> str:
    return secrets.token_hex(length)


# def generate_session_id() -> str:
#     return uuid.uuid4().hex


async def post_create_user_in_database(request: str, params=None):
    await db_handler.create_user_in_database(request, params)
