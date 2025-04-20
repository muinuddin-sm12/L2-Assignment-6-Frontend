/* eslint-disable @typescript-eslint/no-explicit-any */
import ManagaOrders from "@/components/module/provider/manageOrders";
import { getCurrentUser } from "@/services/Auth";
import { getSpecificProviderOrders } from "@/services/Order";
import { getALLProvider } from "@/services/Provider";

const ManageOrderPage = async () => {
  const currentUser = await getCurrentUser();
  const allProviders = await getALLProvider();
  const currentProvider = allProviders?.data?.find(
    (p: any) => p.userId._id === currentUser._id
  );
  const providerOrders = await getSpecificProviderOrders(currentProvider._id);
  return (
    <div>
      <ManagaOrders orders = {providerOrders.data}/>
    </div>
  );
};

export default ManageOrderPage;
