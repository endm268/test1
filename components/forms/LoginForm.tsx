"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formloginSchema } from "@/Schema/Schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { login } from "@/app/api/login/route";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formloginSchema>>({
    resolver: zodResolver(formloginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formloginSchema>) => {
    startTransition(async () => {
      setError(null);

      // Use the server action to handle the form submission
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await login(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  py-20 px-10 rounded-lg"
      >
        <div className="mx-auto grid w-full gap-6">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
            <p className="text-balance text-muted-foreground">
              أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
            </p>
          </div>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>بريد إلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="a@admin.com"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "..." : "دخول"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
