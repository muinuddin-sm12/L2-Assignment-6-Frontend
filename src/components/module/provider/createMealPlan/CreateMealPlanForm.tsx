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
import { Textarea } from "@/components/ui/textarea";
import { createMealPlan } from "@/services/mealPlan";
import { IProvier } from "@/types";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const meals = ["breakfast", "lunch", "dinner"];

const CreateMealPlanForm = ({ providerData }: { providerData: IProvier }) => {
  // const router = useRouter();

  const form = useForm<FieldValues>();
  //   {
  // resolver: zodResolver(registerValidation),
  //   }

  const {
    formState: { isSubmitting },
  } = form;

  const scheduleType = form.watch("scheduleType");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    try {
      const newData = {
        ...data,
        pricePerDay: parseFloat(data?.pricePerDay),
        providerId: providerData?._id,
      };
      // console.log('new data',newData);
      const res = await createMealPlan(newData);
      if (res?.success) {
        toast.success(res?.message);
        form.reset({
          mealPlanType: "",
          scheduleType: "",
        });
        // router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className="border rounded-xl border-gray-300 flex-grow max-w-lg w-full p-5">
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
            name="pricePerMeal"
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
                    className="w-full text-sm px-3 py-2 border rounded-md"
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
                    className="w-full text-sm px-3 py-2 border rounded-md"
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
                        name={`menu.${day}.${meal}`}
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

          <Button
            type="submit"
            className="mt-5 w-full  bg-[#4CAF50] hover:bg-[#4bce4f]"
          >
            {isSubmitting ? (
              <ImSpinner3 className="animate-spin text-center text-white text-lg flex items-center justify-center" />
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
