from datetime import timedelta
from fastapi import APIRouter, HTTPException
from starlette import status
from models.sql.user import Users
from models.pydantic.auth import CreateUserRequest, Token
from database.connection import db_depedency

from operations.auth import bcrypt_context, authenticate_user, create_access_token

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_depedency, create_user_request: CreateUserRequest):
    create_user_model = Users(
        username=create_user_request.username,
        password=bcrypt_context.hash(create_user_request.password)
    )
    db.add(create_user_model)
    db.commit()
    return { 'message' : f'{create_user_request.username} created'}

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: CreateUserRequest, db: db_depedency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    expires_date, token = create_access_token(user.username, user.id, timedelta(minutes=60))
    return { 'access_token' : token, 'token_type': 'bearer', 'expires_date' : expires_date}