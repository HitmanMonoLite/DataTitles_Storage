from fastapi import HTTPException, status

async def invalid_key_authorize() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid login or password",
    )

async def invalid_email() -> HTTPException:
 return HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
    detail= "Invalid email",
)

async def content_forbidden() -> HTTPException:
    return  HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Forbidden",
    )

async def content_not_found(content) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Content {content} not found",
    )
