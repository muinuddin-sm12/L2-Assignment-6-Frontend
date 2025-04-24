/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client"
import { IMealDetail } from "@/types";
import Image from "next/image";
import React from "react";


const MealDetailsPage = ({ data }: { data: IMealDetail }) => {
  // console.log(data);
  return (
    <div className="min-h-screen flex justify-between  max-w-[900px] mx-auto py-16">
      <div>
        <div className="mb-3">
          {data.dietaryTags.map((tag, index) => (
            <span className="px-3 py-2 text-sm font-[600] capitalize rounded-full bg-green-100 text-[#4CAF50] mr-2" key={index}>{tag}</span>
          ))}
        </div>
        <div className="w-[300px] ">
          <div className="">
            <h1 className="text-3xl font-[600] mb-4">{data.mealName}</h1>
            <p className=" leading-4 mb-8">{data?.description}</p>
          </div>
          <div className="h-[340px] w-[250px] rounded-[80px]  overflow-hidden">
            <Image
              className="object-cover h-full w-full"
              height={400}
              width={300}
              alt="meal photo"
              src={data?.image!}
            />
          </div>
        </div>
      </div>
      <div className="max-w-[350px] mt-[35vh]">
        <div>
          <h1 className="text-xl font-[600] mb-3">Provider Info: </h1>
          <div className="flex items-end gap-3 mb-2">
            <div className="h-20 w-20 overflow-hidden rounded-xl">
              <Image className="object-cover h-full w-full" alt="provider image" height={300} width={250} src={data?.providerId?.logo!}/>
            </div>
            <div>
              <div >
                <table className="">
                  <tr>
                    <td>Name</td>
                    <td className="px-2">{" "}:</td>
                    <td>{data?.providerId?.providerName}</td>
                  </tr>
                  <tr>
                    <td>Id</td>
                    <td className="px-2">{" "}:</td>
                    <td>{data?.providerId?._id}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div>
            <p><span className="font-[600] ">About: </span>{data?.providerId?.about}</p>
          </div>
          <div>
            <div className="py-6 border-b border-[#4CAF50]">
            <h1 className="text-xl font-[600] mt-36 mb-3">What Our Foodies Say 😊</h1>
            <div>
              <span className="text-sm">0 reviews</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailsPage;
