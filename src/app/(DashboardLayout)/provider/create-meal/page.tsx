import CreateMealForm from '@/components/module/provider/createMeal/CreateMealForm'
import { getCurrentUser } from '@/services/Auth';
import { getALLProvider } from '@/services/Provider';
import React from 'react'

const CreateMealPage = async() => {
  const user = await getCurrentUser();
  const providers = await getALLProvider();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentProvider = providers.data.find((p: any) => p?.userId?._id === user?._id) 
  return (
    <div className='flex justify-center'>
        <CreateMealForm providerData={currentProvider}/>
    </div>
  )
}

export default CreateMealPage