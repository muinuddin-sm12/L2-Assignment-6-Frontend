import MealDetailsPage from "@/components/module/meal/MealDetails";
import { getSingleMeal } from "@/services/Meal";
import React from "react";

const DynamicMealPage = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const mealId = (await params).mealId;
  // console.log(mealId);
  const mealData = await getSingleMeal(mealId);
  // console.log(mealData) 
  return <div className="min-h-screen px-6 md:px-12 lg:px-20"> 
    <MealDetailsPage data={mealData.data}/>
  </div>;
};

export default DynamicMealPage;
