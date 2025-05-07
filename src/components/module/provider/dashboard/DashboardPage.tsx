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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentProvider = providersData.find(
    (p: IProvier) => p.userId._id === user?._id
  );
//   console.log(currentProvider);
  return (
    <div className="px-5 h-full">
      <h1 className="text-xl font-medium flex items-center justify-center pt-20">
        Welcome to <span className="text-[#4CAF50] px-2 text-2xl"> Provider </span> Dashboard
      </h1>
      <small className="absolute right-5 bottom-5">🕒 Almost there! This page is under development.</small>
    </div>
  );
};

export default DashboardPage;
