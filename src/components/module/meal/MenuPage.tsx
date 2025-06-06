/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMeal } from "@/types/meal";
import { motion } from "framer-motion";

const MenuSection = ({ data }: { data: IMeal[] | [] }) => {
  // console.log(data)
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/menu/${id}`);
  };
  return (
    <div className="grid min-h-screen grid-cols-1 mx-auto w-full sm:grid-cols-2 md:grid-cols-4 gap-6">
      {data.map((meal, index) => (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.1, duration: 0.5, type: "keyframes" }}
          onClick={() => handleCardClick(meal?._id)}
          key={index}
          className="relative h-[380px] group overflow-hidden rounded-xl break-inside-avoid cursor-pointer shadow-md"
        >
          {/* Image */}
          <Image
            src={meal?.image!}
            alt={meal?.mealName || "Meal"}
            width={300}
            height={200}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Slide-up title bar with blur */}
          <div className="absolute left-0 right-0 bottom-0 h-[0px] group-hover:h-[60px] overflow-hidden transition-all duration-500">
            <div className="w-full h-full flex items-center justify-center backdrop-blur-md bg-white/30">
              <h3 className="text-white font-semibold">{meal?.mealName}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MenuSection;
