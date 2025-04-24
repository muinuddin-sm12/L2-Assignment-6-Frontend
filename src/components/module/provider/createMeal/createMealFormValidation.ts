import {z} from "zod";

export const createMealValidationSchema = z.object({
    mealName: z.string({required_error: "Meal name is required"}),
    description: z.string({required_error: "Description is required"}),
    price: z.coerce.number({required_error: "Price is required"}).min(1, "Min price is $1").max(999, "Max price is $999"),
    cuisine: z.string({required_error: "Cuisine is required"}),
    ingredients: z.string({required_error: "Ingredients are required"}),
    dietaryTags: z.string({required_error: "Dietary Tags are required"}),
})