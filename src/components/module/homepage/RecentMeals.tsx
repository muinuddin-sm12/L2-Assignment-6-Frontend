"use client";
import { IMeal } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Meal_icon from "../../../assets/meal_icon.png";
import Link from "next/link";
import RightArrow from "@/assets/right-arrow.png";

const RecentMeals = ({ data }: { data: IMeal[] | [] }) => {
  const [recentMealData, setRecentMealData] = useState<IMeal[] | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const latestData = data?.reverse()?.slice(0, 4);
    setRecentMealData(latestData);
  }, [data]);
  const handleCardClick = (mealId: string) => {
    router.push(`/menu/${mealId}`);
  };
  return (
    <div className="pt-20 px-6 md:px-12 lg:px-20">
      <div className="relative pb-10">
        <h1 className="text-4xl font-[700]">
          Latest <br />
          <span className="flex items-center gap-2">
            <Image src={Meal_icon} height={40} width={40} alt="meal-icon" />
            Meals
          </span>
        </h1>
        <div className="absolute bottom-[15] right-0 ml-auto w-fit mt-3">
          <Link
            className="px-2 flex items-center hover:bg-[#4CAF50] transition-colors duration-500 hover:text-white gap-1 text-sm py-1 cursor-pointer rounded-full border group relative"
            href={"/menu"}
          >
            View All Meals
            <span className="relative  inline-flex overflow-hidden">
              <div className=" transition-transform transform duration-500 group-hover:-translate-x-[110%]">
                <Image src={RightArrow} alt="icon" height={15} width={15} />
              </div>
              <div className="absolute  -translate-x-[110%] transition-transform transform duration-500 group-hover:translate-x-0 ">
                <Image src={RightArrow} alt="icon" height={15} width={15} />
              </div>
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 mx-auto w-full sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recentMealData?.map((meal, index) => (
          <div
            onClick={() => handleCardClick(meal?._id)}
            key={index}
            className="relative h-[380px] group overflow-hidden rounded-xl break-inside-avoid cursor-pointer shadow-md"
          >
            {/* Image */}
            <Image
              src={meal?.image || ""}
              alt={meal?.mealName || "Meal"}
              width={300}
              height={200}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Slide-up title bar with blur */}
            <div className="absolute left-0 right-0 bottom-0 h-[0px] group-hover:h-[60px] overflow-hidden transition-all duration-500">
              <div className="w-full h-full flex items-center justify-center backdrop-blur-md bg-white/30">
                <h3 className="text-white font-semibold px-4">
                  {meal?.mealName}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMeals;
