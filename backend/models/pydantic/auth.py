from pydantic import BaseModel
from datetime import datetime

class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_date: datetime