import DashboardPage from '@/components/module/provider/dashboard/DashboardPage'
import { getCurrentUser } from '@/services/Auth';
import { getSpecificProviderOrders } from '@/services/Order';
import { getALLProvider } from '@/services/Provider';
import { IProvier } from '@/types';
import React from 'react'

const ProviderDashboardPage = async() => {
  const providers = await getALLProvider()
  const user = await getCurrentUser();
  const currentProviderId = providers?.data?.find((p:IProvier) => p.userId._id === user._id)
  const providerOrders = await getSpecificProviderOrders(currentProviderId._id)
  return (
<div><DashboardPage providersData={providers.data} providerOrders={providerOrders.data}/></div>    
  )
}

export default ProviderDashboardPage