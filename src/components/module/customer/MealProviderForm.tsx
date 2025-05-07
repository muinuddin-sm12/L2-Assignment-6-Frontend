/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import ImagePreviewer from "@/components/ui/core/MImageUploader/ImagePreviewer";
import MImageUploader from "@/components/ui/core/MImageUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { createProvider } from "@/services/Provider";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealProviderFromSchema } from "./mealProviderFormValidation";

const MealProviderForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const router = useRouter();
  const {user} = useUser();
  const form = useForm({
    resolver: zodResolver(mealProviderFromSchema)
  });
  //   {
  // resolver: zodResolver(registerValidation),
  //   }

  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const cuisineSpecialties = data?.cuisineSpecialties.split(',').map((item:string) => item.trim()).filter((item: string) => item.length>0);
    const fullFormData = {
      ...data,
      userId: user?._id,
      cuisineSpecialties,
    }
    // console.log('...', fullFormData)
    try {
      const formData = new FormData();
    
      formData.append("data", JSON.stringify(fullFormData));
      formData.append("logo", imageFiles[0]);

      // console.log(formData);
      const res = await createProvider(formData);
      // console.log(res);
      if (res?.success) {
        router.refresh();
        toast.success("Request send successfully");
        // router.push("/customer/dashboard");
        form.reset();
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full px-5 pb-5">
      <h1 className="text-xl font-medium text-center mb-10">
        Become a Provider{" "}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="providerName"
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
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-4">
          <div className="col-span-2">
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
          </div>
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
          </div>
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
                label="Upload Logo"
              />
            </div>
          )}

          <Button type="submit" className="mt-5 w-[200px] cursor-pointer bg-[#4CAF50] hover:bg-[#4bce4f]">
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
