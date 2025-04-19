import ManageUsers from '@/components/module/admin/manage-user';
import { getALLUser } from '@/services/User'
import React from 'react'

const ManageUserPage = async () => {
    const user = await getALLUser();
    // console.log(user);
  return (
    <div>
        <ManageUsers users={user?.data}/>
    </div>
  )
}

export default ManageUserPage