"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Cookies from "js-cookie";
import { z } from "zod";

type FieldsErrors = {
  [key: string]: string[];
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [payload, setPayload] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formSchema = z.object({
      username: z.string().min(1, "Username wajib di isi !"),
      password: z.string().min(1, "Password wajib di isi !"),
    });

    const parse = formSchema.safeParse({
      username: payload.username,
      password: payload.password,
    });

    if (!parse.success) {
      const fieldErrors: FieldsErrors =
        parse.error.formErrors.fieldErrors || {};
      const errors = Object.keys(fieldErrors)?.reduce((acc, key) => {
        acc[key] = fieldErrors[key]?.[0] || "Unknown Error";
        return acc;
      }, {} as Record<string, string>);
      setErrors(errors);
      return { errors };
    }

    const response = await fetch("http://127.0.0.1:8000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    Cookies.set("token", response?.access_token, {
      expires: new Date(response?.expires_date),
      path: "/dashboard",
    });

    window.location.href = "/dashboard";
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  onChange={(e) =>
                    setPayload({ ...payload, username: e.target.value })
                  }
                  placeholder="JohnDoe99"
                />
                {errors && typeof errors === "object" && (
                  <small className="text-red-500">{errors.username}</small>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                />
                {errors && typeof errors === "object" && (
                  <small className="text-red-500">{errors.password}</small>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
