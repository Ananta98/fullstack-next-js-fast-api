from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, user, product, customer, transaction

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows specific frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(product.router)
app.include_router(customer.router)
app.include_router(transaction.router)