/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Connect_icon from "@/assets/connections_icon.png";
import Image from "next/image";
import GetInTouchImage from "@/assets/get_in_touch.webp";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

const GetInTouch = () => {
  const form = useForm();
  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('access_key', process.env.NEXT_PUBLIC_WEB3_FORM_ACCESS_KEY || '')
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          })
          const res = await response.json();
          console.log(res)
          if(res.success){
            toast.success("Message Sent Successfully")
            reset();
          }else{
            toast.error(res.message)
          }
    }catch (error: any) {
        toast.error(error.message);
      }
  };
  return (
    <div className="pt-20 px-6 md:px-12 lg:px-20">
      <div className="pb-10">
        <h1 className="text-4xl font-[700]">
          Get In <br />
          <span className="flex items-center gap-2">
            <Image
              src={Connect_icon}
              height={40}
              width={40}
              alt="connect-icon"
            />
            Touch
          </span>
        </h1>
      </div>

      <div className="md:h-[430px] rounded-2xl overflow-hidden  grid grid-cols-1 md:grid-cols-2">
        <div className="flex-1">
          <Image
            className="object-cover h-full w-full"
            src={GetInTouchImage}
            height={600}
            width={700}
            alt="image"
          />
        </div>
        <div className="flex-1 flex items-center h-full w-full justify-center text-center bg-[#039608] py-6">
          <div className="md:w-[70%] mx-auto ">
            <h1 className="text-3xl font-[600] text-white">
              Healthy Meals, Made Easy
            </h1>
            <p className="text-gray-200">
              Taste the difference with healthy restaurant quality meals
              delivered to your door.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <div className="w-[230px] mx-auto space-y-3 mt-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="bg-gray-200 rounded-full overflow-hidden">
                        <FormControl>
                          <Input
                            placeholder="David"
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="bg-gray-200 rounded-full overflow-hidden">
                        <FormControl>
                          <Input
                            placeholder="example@gmail.com"
                            type="email"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-5 mx-auto cursor-pointer flex justify-center items-center px-4 py-2 rounded-full text-white bg-[#4CAF50] font-[600] "
                >
                  {isSubmitting ? (
                    <ImSpinner3 className="animate-spin text-center text-base flex items-center justify-center" />
                  ) : (
                    <span>Get Started</span>
                  )}
                </button>
              </form>
            </Form>
            <p className="leading-4 mt-6 text-gray-100 text-[12px] px-4 md:px-0">By clicking Get Started you agree to receive marketing emails and to Our Terms and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
