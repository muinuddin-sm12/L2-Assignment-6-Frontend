"use client";
import { useUser } from "@/context/UserContext";
import { IOrder, IProvier } from "@/types";
import Image from "next/image";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface DashboardPageProps {
  providersData: IProvier[];
  providerOrders: IOrder[];
}
const DashboardPage = ({
  providersData,
  providerOrders,
}: DashboardPageProps) => {
  const { user } = useUser();
  const currentProvider = providersData.find(
    (p: IProvier) => p.userId._id === user?._id
  );
  const totalSale = providerOrders.reduce((acc, curr) => acc + curr.price, 0);
  const monthlySale: Record<string, number> = {};
  providerOrders.forEach((data) => {
    const date = new Date();
    const monthYear = date.toLocaleString("en-US", {
      month: "short",
      year: "2-digit",
    });
    monthlySale[monthYear] = (monthlySale[monthYear] || 0) + data.price;
  });
  const chartData = Object.entries(monthlySale).map(([label, sales]) => ({
    label,
    sales,
  }));
  // console.log()
  return (
    <div className="px-5 h-full w-full  py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[400px] md:gap-6">
        <div className="col-span-2 bg-gray-100 rounded-2xl border">
          <div className="section col-md-6 h-full w-full p-5">
            <h3 className="section-title text-gray-500">
              Total Sale:{" "}
              <span className="text-lg font-[600]">${totalSale}</span>
            </h3>
            <div className="section-content mt-8">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  className="p-2"
                  margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                >
                  <Tooltip />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#FB8833" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-green-50  p-5 rounded-2xl border mt-6 md:mt-0">
            <span className="bg-green-100 px-2 text-green-400 font-[600] py-1 rounded-full text-sm">
              Provider Profile
            </span>
            <div className="flex flex-col items-center justify-center mt-5">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-200">
                <Image
                  src={currentProvider?.logo || ""}
                  className="object-cover h-full w-full bg-center"
                  height={50}
                  width={50}
                  alt="logo"
                />
              </div>
              <div>
                <p className="font-[600] ">{currentProvider?.providerName}</p>
                <p className="text-sm leading-5">{currentProvider?.about}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-5  border flex flex-col justify-between">
            <div className="mb-2">
              <span className="bg-orange-100 font-[600] text-orange-400 px-2 py-1 rounded-full text-sm">Recent Orders:</span>
            </div>
            <div>
              {providerOrders
                .reverse()
                .slice(0, 4)
                .map((order, index) => (
                  <div key={order._id}>
                    <div className="flex items-center gap-1 px-2 mb-1">
                      {index + 1}. Id:<p className="text-sm">{order._id}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
