from pydantic import BaseModel, EmailStr

class AgentUserInfo(BaseModel):
    browser: str
    browser_version: str
    os: str
    os_version: str
    device: str

class UserSessionInfo(BaseModel):
    session_id: int
    username: str
    email: str
    agent_user_info: AgentUserInfo | None = None
    login_at: int
    all_sessions_user: dict | None = None

    def to_redis_dict(self) -> dict:
        return self.model_dump(exclude={"all_sessions_user"})

class User(BaseModel):
    id: int
    username: str
    email: EmailStr
    password: str
