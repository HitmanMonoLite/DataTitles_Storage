import redis.asyncio as redis
from config import settings

connection = redis.Redis(
    host=settings.redis_host,
    port=settings.redis_port,
    db=settings.redis_database,
    password=settings.redis_password,
    decode_responses=True
)