/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { IMealDetail } from "@/types";
import Image from "next/image";
import React from "react";
import { TbPoint } from "react-icons/tb";

const MealDetailsPage = ({ data }: { data: IMealDetail }) => {
  // console.log(data);
  return (
    <div className="md:min-h-screen flex flex-col md:flex-row justify-between  max-w-[900px] mx-auto py-16">
      <div>
        <div className="mb-3">
          {data.dietaryTags.map((tag, index) => (
            <span
              className="px-3 py-2 text-sm font-[600] capitalize rounded-full bg-green-100 text-[#4CAF50] mr-2"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="md:w-[300px] ">
          <div className="">
            <h1 className="text-3xl font-[600] mb-3">{data.mealName}</h1>
            <p className=" leading-4 mb-3 text-gray-700">{data?.description}</p>
            <div className="mb-6 font-[600]">
              <span className="text-[#F4511E] font-[600]">Pirce:</span> $
              {data?.price}
            </div>
          </div>
          <div className="h-[340px] w-[250px] rounded-[80px] mb-6 overflow-hidden">
            <Image
              className="object-cover h-full w-full"
              height={400}
              width={300}
              alt="meal photo"
              src={data?.image!}
            />
          </div>

          <div className="w-full">
            <h2 className="font-[600] text-xl mb-2">Ingredients</h2>
            {data?.ingredients.map((ing, index) => (
              <span key={index} className="inline-flex mr-3 leading-4 items-center ">
              <TbPoint className="text-[#4CAF50]"/> {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[350px] mt-8 md:mt-[35vh]">
        <div>
          <h1 className="text-xl font-[600] mb-3">Provider Info: </h1>
          <div className="flex items-end gap-3 mb-2">
            <div className="h-20 w-20 overflow-hidden rounded-xl">
              <Image
                className="object-cover h-full w-full"
                alt="provider image"
                height={300}
                width={250}
                src={data?.providerId?.logo!}
              />
            </div>
            <div>
              <div>
                <table className="">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td className="px-2"> :</td>
                      <td>{data?.providerId?.providerName}</td>
                    </tr>
                    <tr>
                      <td>Id</td>
                      <td className="px-2"> :</td>
                      <td>{data?.providerId?._id}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <p>
              <span className="font-[600] ">About: </span>
              {data?.providerId?.about}
            </p>
          </div>
          <div>
            <div className="py-6 border-b border-[#4CAF50]">
              <h1 className="text-xl font-[600] mt-10 md:mt-36 mb-3">
                What Our Foodies Say 😊
              </h1>
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
