"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

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