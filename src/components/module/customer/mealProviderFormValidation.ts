import { z } from "zod";

export const mealProviderFromSchema = z.object({
  providerName: z.string({ required_error: "Provider name is required" }),
  about: z.string({ required_error: "About field is required" }),
  cuisineSpecialties: z.string({required_error:"This field is required"}),
  experience: z.string({required_error:"Experience field is required"}),
  address: z.string({required_error: "Address is required"}),
  
});
