"use server";

import { IUser } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getALLUser = async () => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
           next: {
            tags: ["USER"]
           }
        })
        return res.json();
    }catch(error: any){
        return Error(error);
    }
}
export const getAUser = async (userID: {userId:string}) => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userID}`)
        return res.json();
    }catch(error: any){
        return Error(error);
    }
}
export const updateAUser = async (data: Partial<IUser>, id: string):Promise<any> => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")!.value,
            },
        })
        revalidateTag("USER")
        return res.json();
    }catch(error: any){
        return Error(error);
    }
}