import OrderVerify from "@/components/module/order-verify";
import { verifyPayment } from "@/services/Order";
import React from "react";
interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const page = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const data = await verifyPayment(query.order_id as string);
  return (
    <div>
      <OrderVerify data={data.data}/>
    </div>
  );
};

export default page;
