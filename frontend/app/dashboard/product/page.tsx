"use client";

import Cookies from "js-cookie";
import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteProduct = (id: number) => {
    const token = Cookies.get("token");
    fetch(`http://127.0.0.1:8000/products/${id}`, {
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
    fetch("http://127.0.0.1:8000/products", {
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
      <h1 className="text-3xl mb-5">Products</h1>
      <Link
        href="/dashboard/product/create"
        className={buttonVariants({ variant: "outline" })}
      >
        Add Product
      </Link>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              deleteProduct={deleteProduct}
            />
          );
        })}
      </div>
    </div>
  );
}
