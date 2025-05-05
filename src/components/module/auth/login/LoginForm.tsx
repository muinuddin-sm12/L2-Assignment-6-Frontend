/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/Auth";
import { toast } from "sonner";
import Logo from "@/assets/Logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import { loginSchema } from "./loginValidation";
import { useEffect, useState } from "react";

const customerCredentials = {
  email: "mahin@gmail.com",
  password: "123456",
};
const adminCredentials = {
  email: "nabil@gmail.com",
  password: "654321",
};
const providerCredentials = {
  email: "shakil@gmail.com",
  password: "123456",
};
interface IFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [defaultEmail, setDefaultEmail] = useState<string | undefined>(
    undefined
  );
  const [defaultPassword, setDefaultPassword] = useState<string | undefined>(
    undefined
  );
  const form = useForm<IFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail,
      password: defaultPassword,
    },
  });
  useEffect(() => {
    if (defaultEmail || defaultPassword) {
      form.reset({
        email: defaultEmail || "",
        password: defaultPassword || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultEmail, defaultPassword]);
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    // console.log(data)
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
          router.refresh();
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCredentials = (role: string) => {
    if (role === "admin") {
      setDefaultEmail(adminCredentials.email);
      setDefaultPassword(adminCredentials.password);
    }
    if (role === "provider") {
      setDefaultEmail(providerCredentials.email);
      setDefaultPassword(providerCredentials.password);
    }
    if (role === "customer") {
      setDefaultEmail(customerCredentials.email);
      setDefaultPassword(customerCredentials.password);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex flex-col">
        <div className="flex items-center space-x-4 mb-6">
          <Image src={Logo} height={30} width={30} alt="logo" />
          <div>
            <h1 className="text-xl font-semibold">Login</h1>
            <p className="font-light text-sm text-gray-600">Welcome back!</p>
          </div>
        </div>
        <div className="flex items-center mx-auto mb-6 gap-4 text-[12px] font-light">
          <div
            onClick={() => handleCredentials("admin")}
            className="px-2 py-1 bg-gray-100 hover:bg-[#4CAF50] hover:text-white transition-colors duration-500 cursor-pointer rounded-full"
          >
            Admin Credentials
          </div>
          <div
            onClick={() => handleCredentials("provider")}
            className="px-2 py-1 bg-gray-100 hover:bg-[#4CAF50] hover:text-white transition-colors duration-500 cursor-pointer rounded-full"
          >
            Provider Credentials
          </div>
          <div
            onClick={() => handleCredentials("customer")}
            className="px-2 py-1 bg-gray-100 hover:bg-[#4CAF50] hover:text-white transition-colors duration-500 cursor-pointer rounded-full"
          >
            User Credentials
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-5 cursor-pointer w-full bg-[#4CAF50] hover:bg-[#4bce4f]"
          >
            {isSubmitting ? (
              <ImSpinner3 className="animate-spin text-center text-lg flex items-center justify-center" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?{" "}
        <Link href="/register" className="text-[#ebd401] font-[600] underline">
          Register
        </Link>
      </p>
    </div>
  );
}
