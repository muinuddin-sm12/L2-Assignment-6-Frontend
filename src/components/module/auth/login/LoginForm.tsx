/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/Auth";
import { toast } from "sonner";
import Logo from "@/assets/Logo.png"
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, Form, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
    const form = useForm();
    const {setIsLoading} = useUser();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirectPath');
    const router = useRouter();

    const {formState: {isSubmitting}} = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try{
            const res = await loginUser(data);
            setIsLoading(true);
            if(res?.success){
                toast.success(res?.message);
                if(redirect){
                    router.push(redirect);
                }else{
                    router.push('/')
                }
            }else{
                toast.error(res?.message);
            }
        }catch(error: any){
            console.log(error)
        }
    }


    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Image src={Logo} height={30} width={30} alt="logo"/>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
    )
}