import DashboardPage from "@/components/module/admin/dashboard/DashboardPage"
import { getALlOrders } from "@/services/Order"
import { getALLProvider } from "@/services/Provider";
import { getALLUser } from "@/services/User";

const AdminDashboardPage = async() => {
  const ordersData = await getALlOrders();
  const usersData = await getALLUser();
  const providersData = await getALLProvider();
  return (
    <div><DashboardPage orders={ordersData.data} users={usersData.data} providers={providersData.data}/></div>
  )
}

export default AdminDashboardPage