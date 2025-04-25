"use server";

import { IOrder } from "@/types";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createOrders = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });
    revalidateTag("ORDERS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getALlOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
      next: {
        tags: ["ORDERS"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getSpecificUserOrders = async ( userId : { userId: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${userId}`
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getSpecificProviderOrders = async (providerId: {
  providerId: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/provider/${providerId}`
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updateOrderStatus = async (
  orderId: string ,
  data: Partial<IOrder> 
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("ORDERS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyPayment = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/verify?order_id=${orderId}`
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
