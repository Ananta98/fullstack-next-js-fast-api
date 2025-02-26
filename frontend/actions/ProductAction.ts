"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FieldsErrors = {
  [key: string]: string[];
};

export async function createProduct(
  prevState:
    | { errors: Record<string, string>; message?: undefined }
    | { message: string; errors?: undefined }
    | undefined,
  formData: FormData
) {
  const formSchema = z.object({
    name: z.string().min(1, "Nama produk wajib di isi !"),
    price: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)), // Convert input to number
      z
        .number({ invalid_type_error: "Enter a valid decimal number" })
        .min(0.01, "Value is required") // ✅ Prevent empty input
        .positive("Value must be positive")
        .max(1000000, "Too large")
    ),
  });

  const parse = formSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
  });

  if (!parse.success) {
    const fieldErrors: FieldsErrors = parse.error.formErrors.fieldErrors || {};
    const errors = Object.keys(fieldErrors)?.reduce((acc, key) => {
      acc[key] = fieldErrors[key]?.[0] || "Unknown Error";
      return acc;
    }, {} as Record<string, string>);
    return { errors };
  }

  try {
    const cookiesToken = await cookies();

    const isUpdate =
      formData.get("id") !== undefined && formData.get("id") !== "";

    const url = isUpdate
      ? "http://127.0.0.1:8000/products/" + formData.get("id")
      : "http://127.0.0.1:8000/products";

    await fetch(url, {
      method: isUpdate ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${cookiesToken.get("token")?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parse.data),
    });

    redirect("/dashboard");
  } catch (error) {
    return { message: "Failed to create product " + error };
  }
}
