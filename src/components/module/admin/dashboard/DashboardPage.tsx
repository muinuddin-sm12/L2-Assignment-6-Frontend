"use client";

import { IOrder, IProvier, IUser } from "@/types";
import React from "react";
import GroupIcon from "@/assets/group.png";
import ChefIcon from "@/assets/chef.png";
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
import Image from "next/image";

type TDashboardProps = {
  orders: IOrder[];
  users: IUser[];
  providers: IProvier[];
};

const DashboardPage = ({ orders, users, providers }: TDashboardProps) => {
  const totalOrder = orders.reduce((acc, curr) => acc + curr.price, 0);
  console.log(orders);

  const monthlySale: Record<string, number> = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthYear = date.toLocaleString("en-US", {
      month: "short",
      year: "2-digit",
    });
    monthlySale[monthYear] = (monthlySale[monthYear] || 0) + order.price;
  });
  const chartData = Object.entries(monthlySale).map(([label, sales]) => ({
    label,
    sales,
  }));
  return (
    <div className="px-5 h-full w-full  py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[400px] md:gap-6">
        <div className="col-span-2 bg-gray-100 rounded-2xl border">
          <div className="section col-md-6 h-full w-full p-5">
            <h3 className="section-title text-gray-500">
              Total Sales:{" "}
              <span className="text-lg font-[600]">${totalOrder}</span>
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
          <div className="bg-green-50 flex flex-col py-5 items-center justify-center rounded-2xl border mt-6 md:mt-0">
            <Image src={GroupIcon} height={50} width={50} alt="group icon" />
            <h2 className="text-xl font-[600]">Total Users</h2>
            <p className="text-4xl font-[800]">{users.length} +</p>
          </div>
          <div className="bg-violet-50 rounded-2xl flex py-5 flex-col items-center justify-center border">
            <Image src={ChefIcon} height={50} width={50} alt="group icon" />
            <h2 className="text-xl font-[600]">Total Providers</h2>
            <p className="text-4xl font-[800]">{providers.length} +</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
