"use client";
import React from "react";
import { Avatar, Card } from 'antd';
import Image from "next/image";

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
  const {Meta} = Card;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {data.map((meal, index) => (
        <Card
        key={index}
        style={{ width: 300 }}
        cover={
          <div className="h-[240px] overflow-hidden">
      <Image
        src={meal?.image}
        alt={meal?.mealName || "Meal"}
        width={300}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
        }
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={meal?.mealName}
          description={meal?.description}
        />
      </Card>
      ))}
    </div>
  );
};

export default MenuSection;
