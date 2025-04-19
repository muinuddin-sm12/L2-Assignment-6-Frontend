import MenuSection from '@/components/module/meal/MenuPage'
import { getALlMeals } from '@/services/Meal'
import React from 'react'

const MenuPage = async() => {
    const mealData = await getALlMeals();
  return (
    <div>
        <h1 className='text-6xl font-[900] pt-20 pb-24 '>Smart meals, happy you! 😋</h1>
        <MenuSection data={mealData.data}/>
    </div>
  )
}

export default MenuPage