"use client";

import Logo from "@/assets/Logo.png";
import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { registerValidation } from "./registerValidation";
// import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import ImagePreviewer from "@/components/ui/core/MImageUploader/ImagePreviewer";
import MImageUploader from "@/components/ui/core/MImageUploader";
import { useState } from "react";
import { registerUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const MealProviderForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const router = useRouter();

  const form = useForm();
  //   {
  // resolver: zodResolver(registerValidation),
  //   }

  const {
    formState: { isSubmitting },
  } = form;
  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("image", imageFiles[0]);

      // console.log(formData);
      // const res = await registerUser(formData);
      // console.log(res);
      // if (res?.success) {
      //     router.refresh();
      //   toast.success(res?.message);
      //   router.push("/");
      // } else {
      //   toast.error(res?.message);
      // }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuisineSpecialties"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine Specialties</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="separate every cuisine specialties with a comma(' , ')"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="0 year"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreview?.length > 0 ? (
            <ImagePreviewer
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              className="mt-4"
            />
          ) : (
            <div className="mt-4">
              <MImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
              />
            </div>
          )}

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? (
              <ImSpinner3 className="animate-spin text-center text-lg flex items-center justify-center" />
            ) : (
              "Send Request"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MealProviderForm;
