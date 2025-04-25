import BannerSection from "@/components/module/homepage/BannerSection";
import WhyMealCraft from "@/components/module/homepage/WhyMealCraft";
import React from "react";

const HomePage = () => {
  return (
    <div  className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "https://magazine.caser.es/wp-content/uploads/2020/06/Ni%C3%B1os-coman-verduras-825x483.jpg" }}>
      <BannerSection/>
      <WhyMealCraft/>
    </div>
  );
};

export default HomePage;
