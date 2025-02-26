"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { createCustomer } from "@/actions/CustomerAction";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { LoadingSpinner } from "@/components/loading-spinner";

type Customer = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address: string;
};

const initialState = {
  message: undefined,
  errors: {
    name: "",
    email: "",
    address: "",
    phone_number: "",
  },
};

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

const UpdateCustomer = () => {
  const params = useParams();
  const customerId = Number(params.id);
  const token = Cookies.get("token");

  const [data, setData] = useState<Customer>({
    id: customerId,
    name: "",
    email: "",
    address: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useActionState(createCustomer, initialState);

  useEffect(() => {
    fetch(`http://localhost:8000/customers/${customerId}`, {
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
            id: customerId,
            name: "",
            email: "",
            address: "",
            phone_number: "",
          }
        );
      })
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
    <div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
      <h1 className="text-3xl mb-5">Update Customer</h1>
      <form action={formAction}>
        <Input id="id" name="id" value={customerId} type="hidden" />
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Customer Name</Label>
            <Input id="name" name="name" type="text" defaultValue={data.name} />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.name}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="email">Email</Label>
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={data.email}
            />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.email}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="address">Address</Label>
            </div>
            <Input
              id="address"
              name="address"
              type="text"
              defaultValue={data.address}
            />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.address}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="phone_number">Phone Number</Label>
            </div>
            <Input
              id="phone_number"
              name="phone_number"
              type="text"
              defaultValue={data.phone_number}
            />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">
                {state.errors.phone_number}
              </small>
            )}
          </div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomer;
