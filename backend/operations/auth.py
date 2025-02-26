from typing import Annotated
from starlette import status
from jose import jwt, JWTError
from models.sql.user import Users
from passlib.context import CryptContext
from datetime import timedelta, datetime
from fastapi import Depends, HTTPException
from database.connection import db_depedency
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = '<SECRET_KEY>'
ALGORITHM = 'HS256'

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    try:
        token = credentials.credentials
        payload = jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
        return {'username': username, 'id': user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')

def authenticate_user(username: str, password: str, db: db_depedency):
    user = db.query(Users).filter(Users.username == username).first()
    if not user or not bcrypt_context.verify(password, user.password):
        return False
    return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id }
    expires = datetime.now() + expires_delta
    encode.update({'exp':expires})
    return expires, jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

user_depedency = Annotated[dict, Depends(get_current_user)]
