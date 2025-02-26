from starlette import status
from operations.auth import user_depedency
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix='/user',
    tags=['user']
)

@router.get("/", status_code=status.HTTP_200_OK)
async def getUser(user: user_depedency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed.')
    return {"id" : user['id'], "username": user['username']}