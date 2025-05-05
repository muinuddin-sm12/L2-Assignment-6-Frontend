"use client";
import { IMealPlan } from "@/types/mealPlan";
import React, { useEffect, useState } from "react";
import balanceIcon from "../../../assets/icons/balancedHealthyUI.webp";
import chefIcon from "../../../assets/icons/chefs-picksHealthyUI.webp";
import highProteinIcon from "../../../assets/icons/high-proteinHealthyUI.webp";
import lowCarbIcon from "../../../assets/icons/low-carbHealthyUI.webp";
import ketoIcon from "../../../assets/icons/ketoHealthyUI.png";
import vegetarianIcon from "../../../assets/icons/vegetarianHealthyUI.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getALlMealsPlans } from "@/services/mealPlan";

const mealPlanType = [
  {
    title: "Balanced",
    value: "balanced",
    description:
      "Designed to give your body everything it needs to feel its best each day",
    icon: balanceIcon,
  },
  {
    title: "Chef's picks",
    value: "custom",
    description: "Flavor-first meals tailored to your taste, not the rules",
    icon: chefIcon,
  },
  {
    title: "High protein",
    value: "high-protein",
    description:
      "Power up your day with high-quality protein for strength and stamina",
    icon: highProteinIcon,
  },
  {
    title: "Low-carb",
    value: "low-carb",
    description:
      "Light on carbs, rich in healthy fats and nutrient-dense veggies",
    icon: lowCarbIcon,
  },
  {
    title: "Keto",
    value: "keto",
    description: "Ultra-low carb meals high in healthy fats to support ketosis",
    icon: ketoIcon,
  },
  {
    title: "Vegetarian",
    value: "vegetarian",
    description:
      "Meat-free meals rich in grains, greens, and plant-powered goodness",
    icon: vegetarianIcon,
  },
];
const PlanAndPackagePage = ({ data }: { data: IMealPlan[] }) => {
  // console.log(data)
  const [selectedType, setSelectedType] = useState<string>();
  const [initiateData, setInitiateData] = useState(data);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async() => {
      const datas = await getALlMealsPlans(selectedType)
      if(datas.success){
        setInitiateData(datas.data);
      }
    }
    fetchData();
  },[selectedType])

  const handleSelectedType = (type?: string)=> {
    setSelectedType(type);
  }
  const handleOnclick = (id: string) => {
    router.push(`/plans-and-packages/${id}`)
  }

  // console.log(initiateData)
  return (
    <div>
      <div>
        <h1 className="text-5xl font-[700] pt-16 pb-8">Plan Types</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-20 items-start">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mealPlanType.map((plan, index) => (
            <div
              key={index}
              onClick={() => handleSelectedType(plan?.value)}
              className={`border select-none cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition duration-500 rounded-2xl p-4 ${selectedType === plan?.value ? 'border-green-300 bg-green-100' : ''}`}
            >
              <div>
                <h1 className="font-[700] mb-2">{plan.title}</h1>
                <p className="text-sm font-light leading-5">{plan.description}</p>
              </div>
              <div className="">
                <Image src={plan.icon} alt="icons" height={100} width={100} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto">
          <div>
            <h1 className="text-3xl font-[700] pb-6">
              Select a plan & customize it
            </h1>
          </div>
          {initiateData.length>0 ? (<div className="flex flex-col gap-4 overflow-y-auto">
            {initiateData?.map((plan, index) => (
              <div
                key={plan?._id}
                onClick={() => handleOnclick(plan?._id)}
                className="relative border select-none cursor-pointer flex justify-between items-center gap-3 hover:bg-gray-100 transition duration-500 rounded-2xl px-4 pt-10 pb-4"
              >
                <div>
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="text-[10px] px-2 py-1 bg-green-100 text-[#4CAF50] rounded-full">
                      {plan.scheduleType}
                    </span>
                    <span className="text-[10px] px-2 py-1 bg-yellow-100 text-[#ad9c03] rounded-full">
                      {plan.mealPlanType}
                    </span>
                  </div>
                  <div className="">
                    <span>{index + 1}.{" "}</span>
                    {plan.title}
                  </div>
                </div>
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-[10px] text-[#4CAF50]">Provider</span>
                    <div className="flex items-end gap-1 text-sm">
                      <Image
                        className="rounded-full object-cover"
                        src={plan?.providerId?.logo || ""}
                        alt="provider img"
                        height={30}
                        width={30}
                      />
                      <div><span  className="text-gray-600">{plan?.providerId?.providerName}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>): (<div>
            <span className="font-light text-center text-sm ">No result</span>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default PlanAndPackagePage;
