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
// import { registerValidation } from "./registerValidation";
// import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ImagePreviewer from "@/components/ui/core/MImageUploader/ImagePreviewer";
import MImageUploader from "@/components/ui/core/MImageUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { IProvier } from "@/types";
import { createMeal } from "@/services/Meal";

const CreateMealForm = ({providerData}:{providerData: IProvier}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const router = useRouter();
  
  const form = useForm<FieldValues>();
 
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const ingredients = data?.ingredients.split(',').map((item:string) => item.trim()).filter((item: string) => item.length>0);
    const dietaryTags = data?.dietaryTags.split(',').map((item:string) => item.trim()).filter((item: string) => item.length>0);
    const price = parseFloat(data?.price)
    const fullFormData = {
      ...data,
      ingredients,
      dietaryTags,
      price,
      providerId: providerData?._id,
    }
    // console.log(fullFormData)
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(fullFormData));
      formData.append("image", imageFiles[0]);
      const res = await createMeal(formData);
      // console.log('res.....', res)
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        router.push("/menu");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="border border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="mealName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
          </div>
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="separate every ingredients with a comma(' , ')"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietaryTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DietaryTags</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="separate every dietary tags with a comma(' , ')"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5 w-full bg-[#4CAF50] hover:bg-[#4bce4f]">
            {isSubmitting ? (
              <ImSpinner3 className="animate-spin text-center text-white text-lg flex items-center justify-center" />
            ) : (
              "Post Meal"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateMealForm;
