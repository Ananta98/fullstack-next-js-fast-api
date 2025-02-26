def decode_transaction(transaction, customer) -> dict:
    return {
        'id': transaction.id,
        'customer_id': transaction.customer_id,
        'customer_name': customer.name,
        'transaction_date': transaction.transaction_date,
        'total': transaction.total,
    }

def decode_transactions(docs) -> list:
    return [
        decode_transaction(transaction, customer) for transaction, customer in docs
    ]

def decode_transaction_detail(transactionList, product) -> dict:
    return {
        'id': transactionList.id,
        'product_id': transactionList.product_id,
        'product_name': product.name,
        'count': transactionList.count,
        'sub_total': transactionList.sub_total,
    }

def decode_transaction_details(docs) -> list:
    return [
        decode_transaction_detail(transactionList, product) for transactionList, product in docs
    ]