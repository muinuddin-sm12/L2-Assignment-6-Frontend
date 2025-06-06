'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {motion} from "framer-motion";

const BannerSection = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover w-full bg-center blur-sm"
        style={{ backgroundImage: "url('/bgImg.jpg')" }}
      ></div>

      {/* Content Layer */}
      <motion.div initial={{y:40, opacity:0}} animate={{y:0, opacity: 1}} transition={{duration: 0.8, ease: 'easeOut'}} className="relative z-10 w-[600px] mx-auto text-center p-8 rounded-xl ">
        <h1 className="text-[45px] md:text-6xl font-bold mb-4 leading-10 md:leading-14 tracking-wide">
          Healthy Eating <br /> <span className="text-[35px] md:text-4xl">for</span> <br/> Busy People
        </h1>
        <p className="text-gray-700 mb-4">
          Custom meal plans and personalized recipes — crafted to save your time
          and help you eat better, every day.
        </p>
      <Link href={'/menu'}><Button className="bg-[#4CAF50] hover:bg-[#5ed662] px-6 py-6 text-base cursor-pointer ">Explore Meals</Button></Link>
      </motion.div>

    </div>
  );
};

export default BannerSection;
