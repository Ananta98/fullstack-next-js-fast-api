"use client";

import { createProduct } from "@/actions/ProductAction";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Cookies from "js-cookie";

type Product = {
  id: number;
  name: string;
  price: number;
};

const initialState = {
  errors: {} as Record<string, string>,
};

const EditProductPage = () => {
  const params = useParams();
  const productId = Number(params.id);
  const token = Cookies.get("token");

  const [data, setData] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useActionState(createProduct, initialState);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(
          data?.data || {
            id: 0,
            name: "",
            price: 0,
          }
        );
      })
      .finally(() => setLoading(false));
  }, []);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full">
        {pending ? (
          <div className="flex flex-row gap-2">
            <Loader2 className="animate-spin" />
            <h1>Loading ...</h1>
          </div>
        ) : (
          <span>Update</span>
        )}
      </Button>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="" />
      </div>
    );
  }

  return (
    <div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
      <h1 className="text-3xl mb-5">Update Product</h1>
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <Input id="id" name="id" value={productId} type="hidden" />
          <div className="grid gap-2">
            <Label htmlFor="username">Product Name</Label>
            <Input id="name" name="name" type="text" defaultValue={data.name} />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.name}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="price">Price</Label>
            </div>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={data.price}
            />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.price}</small>
            )}
          </div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
