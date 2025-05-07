"use client";
import { useUser } from "@/context/UserContext";
import { IProvier } from "@/types";
import Image from "next/image";
import React from "react";

interface DashboardPageProps {
  providersData: IProvier[];
}
const DashboardPage = ({ providersData }: DashboardPageProps) => {
  const { user } = useUser();
  const currentProvider = providersData.find(
    (p: IProvier) => p.userId._id === user?._id
  );
  console.log(currentProvider);
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <div className="gird grid-cols-1 md:grid-cols-2 space-y-4 rounded-lg flex flex-col">
          <div className="h-32 p-5 bg-pink-200 rounded-lg">
            <h2>hello</h2>
          </div>
          <div className="h-32 p-5 bg-orange-200 rounded-lg">
            <h2>hi</h2>
          </div>
        </div>
        <div className="bg-yellow-100 p-5 rounded-lg flex flex-col justify-center items-center">
          <h3 className="font-semibold text-lg mb-4">Provider Profile</h3>
          <div className="mb-4 h-20 w-20 rounded-full border-2 border-sky-200 overflow-hidden">
            <Image
              className="h-full w-full object-cover bg-center"
              src={currentProvider?.logo || ""}
              height={100}
              width={100}
              alt="provider logo"
            />
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
