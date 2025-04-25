import MyMeals from '@/components/module/provider/myMeals/MyMeals';
import { getCurrentUser } from '@/services/Auth';
// import { getSpecificProviderMeals } from '@/services/Meal';
import { getALLProvider } from '@/services/Provider';
import React from 'react'

const page = async() => {
    const user = await getCurrentUser();
    const providers = await getALLProvider();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentProvider = providers.data.find((p: any) => p?.userId?._id === user?._id) 
    // const currentProviderMeals = await getSpecificProviderMeals(currentProvider?._id)
  return (
    <div>
        <MyMeals data={currentProvider}/>
    </div>
  )
}

export default page