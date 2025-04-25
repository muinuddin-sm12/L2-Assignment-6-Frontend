import React from 'react'

const data = [
    {
        icon: "⏸️",
        title: "Flexibility",
        description: "Life's full of surprises, and at MealCraft, we get it. Our flexible options let you pause or skip as needed, adapting your meal plan. Plus, enjoy the ease of free delivery for a smoother wellness journey."
    },
    {
        icon: "🤗",
        title: "Always here for you",
        description: "Need assistance, or just have notes and suggestions? We are here for you 24/7 via live chat. Our dedicated team is here to ensure your MealCraft experience is seamless and satisfying."
    },
    {
        icon: "🥘",
        title: "Be the Chef",
        description: "Play chef and create your ideal meal from scratch, tailoring flavors to your liking and crafting a plate that's uniquely you."
    }
]
const WhyMealCraft = () => {
  return (
    <div className='min-h-screen py-20'>
        <div className='pb-16'>
            <h1 className='text-5xl font-[700]'>Why<br/> MealCraft?</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
{data.map((d, index) => (
    <div className='p-6  rounded-xl shadow-sm' key={index}>
        <div className='flex items-center mb-3'>
            <span className='text-4xl'>{d.icon}</span>
            <h1 className='text-2xl font-[700]'>{d.title}</h1>
        </div>
        <p className='text-gray-600'>{d.description}</p>
    </div>
))}
        </div>
    </div>
  )
}

export default WhyMealCraft