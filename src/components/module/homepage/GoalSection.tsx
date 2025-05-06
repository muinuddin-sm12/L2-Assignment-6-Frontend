import React from "react";
import g_1 from "../../../assets/goalSection/g-1.jpeg";
import g_2 from "../../../assets/goalSection/g-2.jpeg";
import g_3 from "../../../assets/goalSection/g-3.jpeg";
import Image from "next/image";
import Path_icon from '../../../assets/path_icon.png'

const GoalSection = () => {
  return (
    <div className="pt-20 px-6 md:px-12 lg:px-20">
      <div className="pb-10">
        <h1 className="text-4xl font-[700]">
        Plan Your  <br/><span className="flex items-center gap-2"><Image src={Path_icon} height={40} width={40} alt="meal-icon"/>Path</span>
        </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className=" relative h-[500px] rounded-3xl overflow-hidden bg-cover bg-center bg-gray-50 flex items-center justify-center text-3xl font-[600]">
          <Image
            className="w-full h-full object-cover "
            src={g_1}
            height={500}
            width={500}
            alt="g-1"
          />
          <div className="absolute backdrop-grayscale-100 backdrop-brightness-75 hover:backdrop-grayscale-0 transition-all duration-500 text-white h-full w-full flex items-center justify-center">
            Gain muscle
          </div>
        </div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden bg-cover bg-center bg-gray-50 flex items-center justify-center text-3xl font-[600]">
          <Image
            className="w-full h-full object-cover "
            src={g_2}
            height={500}
            width={500}
            alt="g-2"
          />
          <div className="absolute  backdrop-grayscale-100 backdrop-brightness-75 hover:backdrop-grayscale-0 transition-all duration-500 text-white h-full w-full flex items-center justify-center">
            Lose weight
          </div>
        </div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden bg-cover bg-center bg-gray-50 flex items-center justify-center text-3xl font-[600]">
          <Image
            className="w-full h-full object-cover "
            src={g_3}
            height={500}
            width={500}
            alt="g-3"
          />
          <div className="absolute backdrop-grayscale-100 backdrop-brightness-75 hover:backdrop-grayscale-0 transition-all duration-500 text-white h-full w-full flex items-center justify-center">
            Enjoy lifestyle
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSection;
