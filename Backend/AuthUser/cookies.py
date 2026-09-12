from fastapi import Cookie

from AuthUser.exceptions import invalid_key_authorize
from SessionDataBase.get_data_from_redis import get_session

COOKIE_SESSION_KEY = "web-app-session-id"

async def get_session_data(
    session_key: str | None = Cookie(default=None, alias=COOKIE_SESSION_KEY),
) -> dict:
    
    if not session_key:
        raise await invalid_key_authorize()

    session_data = await get_session(session_key)
    if session_data is None:
        raise await invalid_key_authorize()

    return session_data
