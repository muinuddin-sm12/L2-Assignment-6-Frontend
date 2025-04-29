import ManageOrders from '@/components/module/customer/orders';
import { getCurrentUser } from '@/services/Auth';
import { getSpecificUserOrders } from '@/services/Order';
import React from 'react'

const OrdersPage = async() => {
  const currentUser = await getCurrentUser();
  // console.log(currentUser)
  const currentUserOrders = await getSpecificUserOrders(currentUser?._id)
  return (
    <div>
      <ManageOrders orders={currentUserOrders.data}/>
    </div>
  )
}

export default OrdersPage