import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Transactions = {
  id: number;
  customer_id: number;
  customer_name: string;
  transaction_date: Date;
  total: number;
};

type TransactionResponse = {
  success: boolean;
  message: string;
  data: Transactions[];
};

async function getTransactions() {
  const cookiesToken = await cookies();
  const res: TransactionResponse = await fetch(
    "http://localhost:8000/transactions",
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

const TransactionPage = async () => {
  const transactions = await getTransactions();
  return (
    <div>
      <h1 className="text-3xl mb-5">Transaction List</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer name
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Date
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const date = new Date(transaction.transaction_date);
            const formattedDate = `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`;
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
                <td className="px-6 py-4">{transaction.customer_name}</td>
                <td className="px-6 py-4">{formattedDate}</td>
                <td className="px-6 py-4">IDR {transaction.total}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/transactions/${transaction.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionPage;
