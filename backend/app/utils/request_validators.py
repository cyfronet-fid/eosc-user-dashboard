from fastapi import HTTPException
from starlette import status


def valid_limit(limit: int) -> bool:
    if limit <= 0:
        raise HTTPException(status_code=400, detail="Limit should be larger than 0")

    return True


def valid_offset(limit: int, offset: int) -> bool:
    if offset < 0:
        raise HTTPException(status_code=400, detail="Offset should be equal or larger than 0")
    if offset >= limit:
        raise HTTPException(status_code=400, detail="Offset can't be larger than size of returned array")

    return True
