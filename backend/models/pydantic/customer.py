from pydantic import BaseModel

class CustomerRequest(BaseModel):
    name: str
    phone_number: str
    email: str
    address: str