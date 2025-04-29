import OrderVerify from "@/components/module/order-verify";
import { verifyPayment } from "@/services/Order";
import React from "react";
interface OrderVerifyProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}
const OrderVerifyPage = async ({ searchParams }: OrderVerifyProps) => {
  const query = await searchParams;
  const data = await verifyPayment(query.order_id as string);
  return (
    <div>
      <OrderVerify data={data.data} />
    </div>
  );
};

export default OrderVerifyPage;
