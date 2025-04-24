"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createMealPlan = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meal-plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });
    revalidateTag("MEALPLAN");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getALlMealsPlans = async (query: string|undefined) => {
  try {
    const url = query? `/meal-plan?mealPlanType=${query}` : `/meal-plan`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      next: {
        tags: ["MEALPLAN"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleMealsPlans = async (planId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meal-plan/${planId}`);
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
