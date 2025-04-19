"use client";
import React from "react";

const MenuSection = ({data}) => {
  // const [meals, setMeals] = useState([]); //<ICategory[] | []>
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [meal] = await Promise.all([getALlMeals()]);
  //     console.log(meal.data);
  //     setMeals(meal?.data);
  //   };
  //   fetchData();
  // }, []);
  // console.log(data)
  return (
    <div className="grid grid-cols-3 mx-auto w-full min-h-screen">
      {data.map((meal, index) => (
        <p key={index}>{meal?.mealName}</p>
      ))}
    </div>
  );
};

export default MenuSection;
