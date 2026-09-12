import json

from Backend.SessionDataBase.redis_connectior import connection


async def get_session(session_key: str) -> dict | None:
    input_json_converting_string = await connection.get(f"session:{session_key}")
    if not input_json_converting_string:
        return None

    output_json_converted_data = json.loads(input_json_converting_string)
    head_identifiers = output_json_converted_data["identifiers"]
    body_data = output_json_converted_data["data"]

    return {
        "session_id": head_identifiers[1],
        "username": head_identifiers[0],
        "email": body_data["email"],
        "agent_user_info": body_data["agent_user_info"],
        "login_at": body_data["login_at"],
    }


async def get_user_all_sessions(username: str) -> dict:
    session_keys = await connection.keys("session:*")
    if not session_keys:
        return {}

    async with connection.pipeline() as pipe:
        for key in session_keys:
            pipe.get(key)
        results = await pipe.execute()

    list_sessions_user = {}
    for key, value in zip(session_keys, results):
        if value:
            output_json_converted_data = json.loads(value)
            head_identifiers = output_json_converted_data["identifiers"]
            if head_identifiers[0] == username:
                session_id = head_identifiers[1]
                body_data = output_json_converted_data["data"]
                list_sessions_user[session_id] = {
                    "username": head_identifiers[0],
                    "session_id": session_id,
                    "email": body_data["email"],
                    "agent_user_info": body_data["agent_user_info"],
                    "login_at": body_data["login_at"],
                }

    return list_sessions_user


async def get_session_owner_by_id(session_id: int) -> str | None:
    session_key = await connection.hget("session_id_to_key", str(session_id))
    if not session_key:
        return None

    data = await connection.get(f"session:{session_key}")
    if not data:
        await connection.hdel("session_id_to_key", str(session_id))
        return None

    input_json_converting_string = await connection.get(f"session:{session_key}")
    if not input_json_converting_string:
        return None

    output_json_converted_data = json.loads(input_json_converting_string)
    return output_json_converted_data["identifiers"][0]