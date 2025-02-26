import { cookies } from "next/headers";

type TransactionDetailsList = {
  id: number;
  product_id: number;
  product_name: string;
  count: number;
  sub_total: number;
};

type Transactions = {
  id: number;
  customer_id: number;
  customer_name: string;
  transaction_date: Date;
  total: number;
  transaction_list: TransactionDetailsList[];
};

type TransactionDetailResponse = {
  success: boolean;
  message: string;
  data: Transactions;
};

async function getTransactionDetails(transactionId: number) {
  const cookiesToken = await cookies();
  const res: TransactionDetailResponse = await fetch(
    `http://localhost:8000/transactions/${transactionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookiesToken.get("token")?.value}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return res.data;
}

const TransactionDetails = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const transactionId = Number((await params).id);
  const transactionDetails = await getTransactionDetails(transactionId);
  const date = new Date(transactionDetails.transaction_date);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return (
    <div>
      <h1 className="text-3xl font-bold">Transaction Details</h1>
      <div className="flex flex-col gap-1 mt-4 mb-4">
        <div className="text-sm font-bold text-black">
          ID: {transactionDetails.id}
        </div>
        <div className="text-sm font-bold text-black">
          Customer Name: {transactionDetails.customer_name}
        </div>
        <div className="text-sm font-bold text-black">
          Total: {transactionDetails.total}
        </div>
        <div className="text-sm font-bold text-black">
          Transaction Date: {formattedDate}
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Sub Total
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails.transaction_list.map((transaction) => {
            return (
              <tr
                key={transaction.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.id}
                </th>
                <td className="px-6 py-4">{transaction.product_name}</td>
                <td className="px-6 py-4">{transaction.count}</td>
                <td className="px-6 py-4">IDR {transaction.sub_total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
