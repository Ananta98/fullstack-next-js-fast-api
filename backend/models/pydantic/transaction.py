from datetime import datetime
from pydantic import BaseModel
from typing import List

class TransactionDetails(BaseModel):
    product_id: int
    count: int
    sub_total: int

class TransactionRequest(BaseModel):
    customer_id: int
    total: int
    transaction_details: List[TransactionDetails]