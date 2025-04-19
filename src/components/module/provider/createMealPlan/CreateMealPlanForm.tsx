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

const days = [
  "SunDay",
  "Monday",
  "TuesDay",
  "WednesDay",
  "Thursday",
  "Friday",
  "Saturday",
];
const meals = ["breakfast", "lunch", "dinner"];

const CreateMealPlanForm = () => {
  const router = useRouter();

  const form = useForm();
  //   {
  // resolver: zodResolver(registerValidation),
  //   }

  const {
    formState: { isSubmitting },
  } = form;

  const scheduleType = form.watch("scheduleType");
  // console.log(scheduleType);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    // try {
    //   const formData = new FormData();
    //   formData.append("data", JSON.stringify(data));
    //   formData.append("image", imageFiles[0]);

    //   console.log(formData);
    // const res = await registerUser(formData);
    // console.log(res);
    // if (res?.success) {
    //     router.refresh();
    //   toast.success(res?.message);
    //   router.push("/");
    // } else {
    //   toast.error(res?.message);
    // }
    // } catch (error) {
    //   toast.error(error);
    // }
  };
  return (
    <div className="border-l flex-grow max-w-lg w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
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
          <FormField
            control={form.control}
            name="pricePerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Day</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mealPlanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Meal Plan Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full text-sm px-3 py-2 border rounded-md bg-white dark:bg-slate-900"
                  >
                    <option value="">Select plan type</option>
                    <option value="balanced">Balanced</option>
                    <option value="high-protein">High Protein</option>
                    <option value="low-carb">Low Carb</option>
                    <option value="keto">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="custom">Custom</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Schedule Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full text-sm px-3 py-2 border rounded-md bg-white dark:bg-slate-900"
                  >
                    <option value="">Select schedule</option>
                    <option value="weekly">Weekly</option>
                    <option disabled value="monthly">
                      Monthly
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Meal Plan  */}
          {scheduleType === "weekly" && (
            <>
              {days.map((day) => (
                <div
                  key={day}
                  className="mb-2 mt-3 border p-4 rounded-xl shadow-sm"
                >
                  <h3 className="font-semibold mb-2">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {meals.map((meal) => (
                      <FormField
                        key={`${day}.${meal}`}
                        control={form.control}
                        name={`weeklyMenu.${day}.${meal}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {meal.charAt(0).toUpperCase() + meal.slice(1)}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Enter meal id`}
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? (
              <ImSpinner3 className="animate-spin text-center text-lg flex items-center justify-center" />
            ) : (
              "Create Meal Plan"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateMealPlanForm;
