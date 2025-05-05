import { IMeal } from '@/types'
import React from 'react'

const RecentMeals = ({data}: {data: IMeal[] | []}) => {
    // console.log('meal-data', data)
  return (
    <div className='min-h-screen py-20 px-6 md:px-12 lg:px-20'>
        <div className="pb-16">
        <h1 className="text-4xl font-[700]">
          Recent 
          <br />Meals
        </h1>
      </div>
      <div>
        {data.length}
      </div>
    </div>
  )
}

export default RecentMeals