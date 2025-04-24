import PlanAndPackagePage from "@/components/module/plan&package";
import { getALlMealsPlans } from "@/services/mealPlan";
import React from "react";

const PlanAndPackage = async () => {
  const plans = await getALlMealsPlans();
  console.log(plans)
  return (
    <div>
      <PlanAndPackagePage data={plans?.data}/>
    </div>
  );
};

export default PlanAndPackage;
