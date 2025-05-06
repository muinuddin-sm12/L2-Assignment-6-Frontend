import BannerSection from "@/components/module/homepage/BannerSection";
import GetInTouch from "@/components/module/homepage/GetInTouch";
import GoalSection from "@/components/module/homepage/GoalSection";
import RecentMeals from "@/components/module/homepage/RecentMeals";
import WhyMealCraft from "@/components/module/homepage/WhyMealCraft";
import { getALlMeals } from "@/services/Meal";
import React from "react";

const HomePage = async() => {
  const mealsData = await getALlMeals('');

  return (
    <div>
      <BannerSection/>
      <RecentMeals data={mealsData?.data}/>
      <WhyMealCraft/>
      <GoalSection/>
      <GetInTouch/>
    </div>
  );
};

export default HomePage;
