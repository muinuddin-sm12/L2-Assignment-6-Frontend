import { z } from "zod";

export const createMealPlanValidationShcema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  pricePerMeal: z.coerce
    .number({ required_error: "This field is required" })
    .min(1, "Min price is $1")
    .max(999, "Max price is $999"),
  mealPlanType: z.string({ required_error: "This field is requierd" }),
  scheduleType: z.string({ required_error: "Schedule type is required" }),
  menu: z.object({
    sunday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
    monday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
    tuesday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
    wednesday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
    thursday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
    friday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
    saturday: z.object({
      breakfast: z.string().min(1, "Breakfast meal ID is required"),
      lunch: z.string().min(1, "Lunch meal ID is required"),
      dinner: z.string().min(1, "Dinner meal ID is required"),
    }),
  }),
});
