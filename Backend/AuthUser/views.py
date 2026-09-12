from fastapi import APIRouter, Depends, Response, Header, Cookie
from Backend.models.pydentic_models import (
    UserSessionInfo,
)

from Backend.AuthUser.cookies import (
    COOKIE_SESSION_KEY,
    get_session_data,
)
from Backend.AuthUser.crud import (
    get_auth_user_userinfo,
    generate_session_key,
    create_session_data,
)

from Backend.SessionDataBase.post_data_in_redis import (
    save_session,
    delete_session
    # delete_session_by_idw
)

from Backend.SessionDataBase.get_data_from_redis import (
    get_user_all_sessions,
    get_session_owner_by_id
)

from Backend.AuthUser import exceptions

router = APIRouter(prefix="/users")

@router.post("/login-cookie/")
async def auth_login_set_cookie(
    response: Response,
    user_agent: str | None = Header(default=None),
    auth_user: dict = Depends(get_auth_user_userinfo),
):
    session_key = await generate_session_key()
    session_data = await create_session_data(auth_user, user_agent)

    await save_session(session_key, session_data, auth_user["username"])

    response.set_cookie(
        COOKIE_SESSION_KEY,
        session_key,
        httponly=True,
        secure=False,
        samesite="strict",
    )

    return {
        "result": "ok",
        **session_data
    }


@router.get("/validate-session-id/", response_model=UserSessionInfo)
async def get_yourself_for_user(
        user_session_data: dict = Depends(get_session_data),
):
    return user_session_data


@router.get("/info-sessions-user/", response_model=UserSessionInfo, response_model_exclude_none=True)
async def get_all_info_sessions_user(
    user_session_data: dict = Depends(get_session_data),
):

    all_sessions_user = await get_user_all_sessions(
        user_session_data["username"],
    )

    return {
        **user_session_data,
        "all_sessions_user": all_sessions_user,
    }


@router.post("/logout-cookie/")
async def auth_logout_cookie(
    response: Response,
    session_key: str = Cookie(alias=COOKIE_SESSION_KEY),
    user_session_data: dict = Depends(get_session_data),
):
    await delete_session(session_key=session_key, session_id=user_session_data["session_id"])
    response.delete_cookie(COOKIE_SESSION_KEY)
    username = user_session_data["username"]
    return {
        "message": f"Bye, {username}!",
    }


@router.post("/recall-session-user/")
async def recall_auth_session_cookie(
    session_id: int,
    user_session_data: dict = Depends(get_session_data),
):

    owner = await get_session_owner_by_id(session_id)

    if owner is None:
        raise await exceptions.content_not_found("")

    if owner != user_session_data["username"]:
        raise await exceptions.content_forbidden()

    await delete_session(session_id=session_id)

    return {"result": "ok"}