import PlanDetailsPage from "@/components/module/plan&package/planDetails";
import { getSingleMealsPlans } from "@/services/mealPlan";
import React from "react";

const DynamicPlan = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const mealId = (await params).planId;
  const planData = await getSingleMealsPlans(mealId);
  
  return <div>
    <PlanDetailsPage data={planData?.data}/>
  </div>;
};

export default DynamicPlan;
