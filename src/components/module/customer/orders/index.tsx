"use client"
import { Button } from '@/components/ui/button';
import { MTable } from '@/components/ui/core/MTable';
import { IOrder } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, Repeat, X } from 'lucide-react';
import React from 'react'
type TOrderProps = {
    orders: IOrder[];
  };
const ManageOrders = ({orders}: TOrderProps) => {
    // console.log(orders);

    const columns: ColumnDef<TOrderProps>[] = [
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
          accessorKey: "orderStatus",
          header: () => <div>Delivery Status</div>,
          cell: ({ row }) => (
            <div className="flex items-center space-x-3">
                {row.original.orderStatus}
              </div>
          ),
        },
      ];
  return (
    <div>
        <MTable data={orders} columns={columns} />
    </div>
  )
}

export default ManageOrders