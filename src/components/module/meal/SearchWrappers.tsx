"use client";
import React, { useEffect, useState } from "react";
import MenuSection from "./MenuPage";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import { getALlMeals } from "@/services/Meal";
import { IMeal } from "@/types/meal";

const SearchWrappers = ({allMeals}:  {allMeals : IMeal[]}) => {
    // console.log('....',allMeals)
  const [searchText, setSearchText] = useState("");
  const [meals, setMeals] = useState<IMeal[]>(allMeals || []);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await getALlMeals(searchText);
      if (res.success) {
        setMeals(res.data);
      }
    };
    const delayDeBounce = setTimeout(() => {
      fetchMeals();
    }, 500);
    return () => clearTimeout(delayDeBounce);
  }, [searchText]);

  const handleClearSearchText = () => {
    setSearchText("");
  }

  return (
    <div className="w-full">
      <div className="flex relative max-w-[350px] items-center gap-2 ml-auto  mb-8 mt-4">
        <h1 className="text-lg font-[600]">Search</h1>
        <Input
          className="rounded-full"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText !== "" && (
          <CircleX onClick={handleClearSearchText} className="absolute right-[12px] size-4 hover:scale-110 transition-all text-red-300 " />
        )}
      </div>
      <MenuSection data={meals} />
    </div>
  );
};

export default SearchWrappers;
