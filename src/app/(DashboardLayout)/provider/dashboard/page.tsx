import DashboardPage from '@/components/module/provider/dashboard/DashboardPage'
import { getALLProvider } from '@/services/Provider';
import React from 'react'

const ProviderDashboardPage = async() => {
  const providers = await getALLProvider()
  return (
<div><DashboardPage providersData={providers.data}/></div>    
  )
}

export default ProviderDashboardPage