"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createCustomer } from "@/actions/CustomerAction";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

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
        <span>Add</span>
      )}
    </Button>
  );
}

const CreateCustomer = () => {
  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
      <h1 className="text-3xl mb-5">Create New Customer</h1>
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Customer Name</Label>
            <Input id="name" name="name" type="text" />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.name}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="email">Email</Label>
            </div>
            <Input id="email" name="email" type="email" />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.email}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="address">address</Label>
            </div>
            <Input id="address" name="address" type="text" />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.address}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="phone_number">Phone Number</Label>
            </div>
            <Input id="phone_number" name="phone_number" type="text" />
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

export default CreateCustomer;
