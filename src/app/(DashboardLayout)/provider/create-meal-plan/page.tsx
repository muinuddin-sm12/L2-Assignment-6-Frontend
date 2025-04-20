import CreateMealPlanForm from '@/components/module/provider/createMealPlan/CreateMealPlanForm'
import { getCurrentUser } from '@/services/Auth'
import { getALLProvider } from '@/services/Provider';
import React from 'react'

const CreateMealPlanPage = async() => {
  const currentUser = await getCurrentUser();
  const allProviders = await getALLProvider()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentProvider = allProviders?.data?.find((p: { userId: { _id: any; }; })=> p.userId._id === currentUser._id)
  return (
    <div className='flex justify-center'>
        <CreateMealPlanForm providerData={currentProvider}/>
    </div>
  )
}

export default CreateMealPlanPage;