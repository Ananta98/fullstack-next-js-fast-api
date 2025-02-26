"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type FieldsErrors = {
  [key: string]: string[];
};

export async function createCustomer(
  prevState:
    | { errors: Record<string, string>; message?: undefined }
    | { message: string; errors?: undefined }
    | undefined,
  formData: FormData
) {
  const formSchema = z.object({
    name: z.string().min(1, "Nama customer wajib di isi !"),
    phone_number: z.string().min(1, "Nomer telepon wajib di isi !"),
    email: z.string().min(1, "Email wajib di isi !").email(),
    address: z.string().min(1, "Alamat wajib di isi !"),
  });

  const parse = formSchema.safeParse({
    name: formData.get("name"),
    phone_number: formData.get("phone_number"),
    email: formData.get("email"),
    address: formData.get("address"),
  });

  if (!parse.success) {
    const fieldErrors: FieldsErrors = parse.error.formErrors.fieldErrors || {};
    const errors = Object.keys(fieldErrors)?.reduce((acc, key) => {
      acc[key] = fieldErrors[key]?.[0] || "Unknown Error";
      return acc;
    }, {} as Record<string, string>);
    return { errors };
  }

  const cookiesToken = await cookies();

  const isUpdate =
    formData.get("id") !== undefined && formData.get("id") !== "";

  const url = isUpdate
    ? "http://127.0.0.1:8000/customers/" + formData.get("id")
    : "http://127.0.0.1:8000/customers";

  await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: {
      Authorization: `Bearer ${cookiesToken.get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parse.data),
  })
    .then(() => {
      revalidatePath("/dashboard/customer");
    })
    .catch(() => {
      return { message: "Failed to create notes" };
    })
    .finally(() => {
      redirect("/dashboard/customer");
    });
}
