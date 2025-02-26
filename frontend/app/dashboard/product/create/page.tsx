"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createProduct } from "@/actions/ProductAction";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const initialState = {
  errors: {} as Record<string, string>,
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

const CreateProduct = () => {
  const [state, formAction] = useActionState(createProduct, initialState);
  return (
    <div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
      <h1 className="text-3xl mb-5">Create New Product</h1>
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Product Name</Label>
            <Input id="name" name="name" type="text" />
            {state?.errors && typeof state.errors === "object" && (
              <small className="text-red-500">{state.errors.name}</small>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="price">Price</Label>
            </div>
            <Input id="price" name="price" type="number" step="0.01" />
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

export default CreateProduct;
