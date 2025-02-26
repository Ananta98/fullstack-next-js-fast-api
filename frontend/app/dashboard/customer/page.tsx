"use client";

import CustomerCard from "@/components/customer-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

type Customer = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address: string;
};

const CustomerPage = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteCustomer = (id: number) => {
    const token = Cookies.get("token");
    fetch(`http://127.0.0.1:8000/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setLoading(true);
    fetch("http://127.0.0.1:8000/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data?.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl mb-5">Customers</h1>
      <Link
        href="/dashboard/customer/create"
        className={buttonVariants({ variant: "outline" })}
      >
        Add Customer
      </Link>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => {
          return (
            <CustomerCard
              key={item.id}
              id={item.id}
              name={item.name}
              phone_number={item.phone_number}
              email={item.email}
              address={item.address}
              deleteCustomer={deleteCustomer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomerPage;
