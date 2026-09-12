from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent

class Settings(BaseSettings):

    # Main
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    cors_origins: list[str] = []

    # PostgreSQL
    postgres_host: str
    postgres_port: int = 5432
    postgres_user: str
    postgres_password: str
    postgres_db_name: str

    # Redis
    redis_host: str
    redis_port: int = 6379
    redis_password: str | None = None
    redis_database: int = 0

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()