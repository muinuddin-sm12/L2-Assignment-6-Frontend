/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import AcceptOrderModal from "@/components/ui/core/MModal/provider/AcceptOrderModal";
import CancelOrderModal from "@/components/ui/core/MModal/provider/CancelOrderModal";
import DeliverOrderModal from "@/components/ui/core/MModal/provider/DeliverOrderModal";
import { MTable } from "@/components/ui/core/MTable";
import { updateOrderStatus } from "@/services/Order";
import { IOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Repeat, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TOrderProps = {
  orders: IOrder[];
};
const ManagaOrders = ({ orders }: TOrderProps) => {
  // console.log("......", orders);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isDeliverModalOpen, setDeliverModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAcceptOrder = (data: IOrder) => {
    setSelectedId(data._id);
    setConfirmModalOpen(true);
  };
  const handleCancelOrder = (data: IOrder) => {
    setSelectedId(data._id);
    setCancelModalOpen(true);
  };
  const handleDeliverOrder = (data: IOrder) => {
    setSelectedId(data._id);
    setDeliverModalOpen(true);
  };
  const handleOrderConfirm = async () => {
    try {
      if (selectedId) {
        const data = {
          orderStatus: "accepted",
        };
        const res = await updateOrderStatus(selectedId, data);
        // console.log(res);
        if (res.success) {
          toast.success("Order accepted");
          setConfirmModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };
  const handleDeliverConfirm = async () => {
    try {
      if (selectedId) {
        const data = {
          orderStatus: "delivered",
        };
        const res = await updateOrderStatus(selectedId, data);
        // console.log(res);
        if (res.success) {
          toast.success("Order delivered");
          setConfirmModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };
  const handleOrderCancel = async () => {
    try {
      if (selectedId) {
        const data = {
          orderStatus: "cancelled",
        };
        const res = await updateOrderStatus(selectedId, data);
        // console.log(res);
        if (res.success) {
          toast.success("Order accepted");
          setCancelModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "_id",
      header: () => <div>Order ID</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original._id}</span>
        </div>
      ),
    },
    {
      accessorKey: "mealPlanId",
      header: () => <div>Meal Plan ID</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.mealPlanId}</span>
        </div>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: () => <div>Payment Status</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.paymentStatus}</span>
        </div>
      ),
    },
    {
      accessorKey: "orderStatus",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {row?.original?.orderStatus === "paid" ? (
            <div className="flex items-center gap-1">
              <Button
                onClick={() => handleAcceptOrder(row?.original)}
                className="flex items-center gap-2"
              >
                <CircleCheck />
                <span>accept order</span>
              </Button>
              <Button
                onClick={() => handleCancelOrder(row?.original)}
                className="flex bg-red-500 font-medium hover:bg-red-600 items-center gap-2"
              >
                <X />
              </Button>
            </div>
          ) : row.original.orderStatus === "cancelled" ? (
            <div>
              <span className="text-red-600 font-medium">
                {row.original.orderStatus}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{row.original.orderStatus}</span>
              {row.original.orderStatus !== "delivered" && (
                <Button
                  onClick={() => handleDeliverOrder(row?.original)}
                  className="text-white bg-[#4CAF50] hover:bg-[#4bce4f]"
                >
                  <Repeat />
                </Button>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="px-5 pb-5">
      <MTable data={orders} columns={columns} />
      <AcceptOrderModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleOrderConfirm}
      />
      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onOpenChange={setCancelModalOpen}
        onConfirm={handleOrderCancel}
      />
      <DeliverOrderModal
        isOpen={isDeliverModalOpen}
        onOpenChange={setDeliverModalOpen}
        onConfirm={handleDeliverConfirm}
      />
    </div>
  );
};

export default ManagaOrders;
