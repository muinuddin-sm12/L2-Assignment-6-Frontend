"use server";

// import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const createProvider = async (data: FormData) => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meal-provider`, {
            method: "POST",
            // headers: {
            //   authorization: (await cookies()).get("accessToken")!.value,
            // },
            body: data,
        })
        return res.json();
    }catch(error: any){
        return Error(error);
    }
}
export const getALLProvider = async () => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meal-provider`, {
        //    next: {
        //     tags: ["MEAL"]
        //    }
        })
        return res.json();
    }catch(error: any){
        return Error(error);
    }
}
