/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IMealPlan } from "@/types/mealPlan";
import Image from "next/image";
import React, { useState } from "react";
import cartIcon from "../../../../assets/icons/mealCraft.png";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { createOrders } from "@/services/Order";
import { toast } from "sonner";
import { ImSpinner3 } from "react-icons/im";
const mealTimes = ["Breakfast", "Lunch", "Dinner"];

const PlanDetailsPage = ({ data }: { data: IMealPlan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedMeals, setSelectedMeals] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const pricePerDay = data?.pricePerMeal * selectedMeals.length;
  const planPrice = pricePerDay * 7;
  const deliveryFee = 20;
  const vat = parseFloat((((planPrice + deliveryFee) / 100) * 5).toFixed(2));
  const totalPrice = planPrice + deliveryFee + vat;
  const toggleMealSelection = (meal: string) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };
  const { user } = useUser();
  const handleCheckout = async () => {
    setIsLoading(true);
    if (!user) {
      router.push("/login");
      return;
    }
    // if (!data || !data.pricePerMeal) {
    //   toast.error("Missing plan data. Please try again.");
    //   setIsLoading(false);
    //   return;
    // }
    const checkOutDetails = {
      providerId: data?.providerId?._id,
      customerId: user?._id,
      mealPlanId: data?._id,
      price: totalPrice,
      mealPerDay: selectedMeals,
      deliverySchedule: startDate,
    };

    try {
      const res = await createOrders(checkOutDetails);
      if (res.success) {
        setIsLoading(false);
        // toast.success(res?.message);
        router.replace(res?.data);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
    // console.log(checkOutDetails);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-[700] pt-16 pb-12">
        Customize Your <br /> Perfect Meal Plan
      </h1>
      <div className="flex items-center justify-between gap-20">
        <div className="max-w-[600px]">
          <h1>{data?.title}</h1>
          <div>
            <p className="text-sm">{data?.description}</p>
          </div>
          <div className="py-14">
            <div>
              <h1 className="text-3xl font-[700] leading-5">
                How many meals per day?
              </h1>
              <span className="text-sm font-light">
                Select a minimum of 2 meals, including lunch or dinner.
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {mealTimes.map((meal) => {
                const isSelected = selectedMeals.includes(meal);
                return (
                  <div
                    key={meal}
                    onClick={() => toggleMealSelection(meal)}
                    className={`cursor-pointer flex justify-between items-center py-6 px-4 rounded-xl border transition ${
                      isSelected
                        ? "bg-green-50 border-green-500"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <span className="text-lg font-medium">{meal}</span>
                    <div
                      className={`w-6 h-6 rounded-md border flex items-center justify-center transition ${
                        isSelected
                          ? "bg-green-500 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <span>✔</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="py-8">
              <h1 className="text-3xl font-[700] leading-5 mb-3">
                Select schedule
              </h1>
              <div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Starting Date</span>
                  <DatePicker
                    // showIcon
                    className="px-4 py-6 border rounded-lg"
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
            </div>
            {/* <div className="py-8 ">
              <h1 className="text-3xl font-[700] leading-5 mb-4">
                
              </h1>
            </div> */}
          </div>
        </div>
        <div className="w-[400px] bg-gray-100 p-6 rounded-3xl ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-[700] leading-6">
                Your package, your way
              </h1>
              <div>
                <p className="text-gray-600">
                  {data.mealPlanType},{" "}
                  {selectedMeals ? `${selectedMeals.length} meals` : "3 meals"},
                  7 days{" "}
                </p>
              </div>
            </div>
            <div>
              <Image src={cartIcon} height={100} width={100} alt="cart" />
            </div>
          </div>
          <div className="py-8">
            <h1 className="text-xl py-3">Payment summary</h1>
            <div className="text-sm">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Plan price</p>
                <p>${planPrice}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Delivery fee</p>
                <p>$20</p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <p className="text-gray-600">VAT ( 05% )</p>
                <p>${vat}</p>
              </div>
              <div className="flex text-base items-center justify-between py-1">
                <p>Total </p>
                <p>${totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              disabled={
                selectedMeals.length < 2 ||
                user?.role === "provider" ||
                user?.role === "admin"
              }
              onClick={() => handleCheckout()}
              className="bg-[#4CAF50] cursor-pointer w-full rounded-2xl text-base font-[600] py-6 hover:bg-[#5acc5e]"
            >
              {isLoading ? (
                <ImSpinner3 className="animate-spin text-center text-lg flex items-center justify-center" />
              ) : (
                "Checkout"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPage;
