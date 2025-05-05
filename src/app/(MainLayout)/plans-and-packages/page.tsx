import PlanAndPackagePage from "@/components/module/plan&package";
import { getALlMealsPlans } from "@/services/mealPlan";
import React from "react";

const PlanAndPackagesPage = async () => {
  const plans = await getALlMealsPlans();
  return (
    <div className="px-6 md:px-12 lg:px-20">
      <PlanAndPackagePage data={plans?.data}/>
    </div>
  );
};

export default PlanAndPackagesPage;
