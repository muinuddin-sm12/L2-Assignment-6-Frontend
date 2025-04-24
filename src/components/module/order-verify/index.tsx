"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { IVerifyOrderData } from "@/types";

const OrderVerify = ({ data }: {data: IVerifyOrderData[]}) => {
  console.log(data);
  const orderData = data?.[0];
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
      <h1 className="text-xl font-medium mb-6">Order Verification</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="font-medium">Order Details</p>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-medium">Order ID:</dt>
              <dd>{orderData?.order_id}</dd>
              <dt className="font-medium">Amount:</dt>
              <dd>
                {orderData?.currency} {orderData?.amount?.toFixed(2)}
              </dd>
              <dt className="font-medium">Status:</dt>
              <dd>
                <Badge
                  variant={
                    orderData?.bank_status === "Success"
                      ? "default"
                      : "destructive"
                  }
                  className={
                    orderData?.bank_status === "Success"
                      ? "bg-green-500 text-white hover:bg-green-600" // Custom success styles
                      : ""
                  }
                >
                  {orderData?.bank_status}
                </Badge>
              </dd>
              <dt className="font-medium">Date:</dt>
              <dd>{new Date(orderData?.date_time)?.toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="font-medium">Payment Information</p>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-medium">Method:</dt>
              <dd>{orderData?.method}</dd>
              <dt className="font-medium">Transaction ID:</dt>
              <dd>{orderData?.bank_trx_id}</dd>
              <dt className="font-medium">Invoice No:</dt>
              <dd>{orderData?.invoice_no}</dd>
              <dt className="font-medium">SP Code:</dt>
              <dd>{orderData?.sp_code}</dd>
              <dt className="font-medium">SP Message:</dt>
              <dd>{orderData?.sp_message}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="font-medium">Customer Information</p>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-semibold">Name:</dt>
              <dd>{orderData?.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{orderData?.email}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{orderData?.phone_no}</dd>
              <dt className="font-semibold">Address:</dt>
              <dd>{orderData?.address}</dd>
              <dt className="font-semibold">City:</dt>
              <dd>{orderData?.city}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="font-medium">Verification Status</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              {orderData?.is_verify === 1 ? (
                <>
                  <CheckCircle className="text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-yellow-500" />
                  <span>Not Verified</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/customer/orders">
              <Button className="w-full button-primary">View Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderVerify;
