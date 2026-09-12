import json

from Backend.SessionDataBase.redis_connectior import connection
from Backend.models.pydentic_models import UserSessionInfo


async def save_session(session_key: str, session_data: dict, username: str):
    session = UserSessionInfo(**session_data)
    session_ttl = 60 * 60 * 24 * 30

    session_key_to_convert = f"session:{session_key}"

    head_identifiers = [username, session.session_id, session_key]
    body_data = session.model_dump(exclude={"all_sessions_user", "session_id", "username"})

    main_data_stored_to_convert = {
        "identifiers": head_identifiers,
        "data": body_data
    }

    await connection.set(
        session_key_to_convert,
        json.dumps(main_data_stored_to_convert),
        ex=session_ttl
    )

    await connection.hset("session_id_to_key", str(session.session_id), session_key)


async def generate_session_id() -> int:
    return await connection.incr("global:next_session_id")


async def delete_session(session_key: str = None, session_id: int = None):
    if session_id is not None:
        session_key = await connection.hget("session_id_to_key", str(session_id))

    if not session_key:
        return

    full_name_session_key = f"session:{session_key}"
    input_json_converting_string = await connection.get(full_name_session_key)

    if input_json_converting_string:
        output_json_converted_data = json.loads(input_json_converting_string)
        if session_id is None:
            session_id = output_json_converted_data["identifiers"][1]

        await connection.hdel("session_id_to_key", str(session_id))

    await connection.delete(full_name_session_key)