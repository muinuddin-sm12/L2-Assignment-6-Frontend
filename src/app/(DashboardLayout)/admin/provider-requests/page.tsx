import ProviderRequests from '@/components/module/admin/provider-requests'
import { getALLProvider } from '@/services/Provider'
import React from 'react'

const PorviderRequestPage = async() => {
    const data = await getALLProvider();
    const requests = data.data.filter((r) => r.userId.role === 'customer');
  return (
    <div>
        <ProviderRequests providers={requests}/>
    </div>
  ) 
}

export default PorviderRequestPage