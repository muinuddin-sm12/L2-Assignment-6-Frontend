"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createMeal = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals/post-meal`,
      {
        method: "POST",
        headers: {
          authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );
    revalidateTag("MEAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getALlMeals = async (query: string|undefined) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals?search=${query}`, {
      next: {
        tags: ["MEAL"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleMeal = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals/${mealId}`
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
