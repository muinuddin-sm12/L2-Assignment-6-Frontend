import {z} from "zod";

export const GetInTouchFormSchema = z.object({
    name: z.string({required_error: "Name is required"}),
    email: z.string({required_error: 'Email is required'}).email(),
})