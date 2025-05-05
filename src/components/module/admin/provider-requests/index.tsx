"use client";
import RequestConfirmationModal from "@/components/ui/core/MModal/RequestConfirmationModal";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MTable } from "@/components/ui/core/MTable";
import { updateAUser } from "@/services/User";
import { IProvier, IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

type TProviderProps = {
  providers: IProvier[];
};

const ProviderRequests = ({ providers }: TProviderProps) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleRequest = (data: IProvier) => {
      setSelectedId(data?.userId?._id);
      setModalOpen(true);
    };
    const handleRequestConfirm = async () => {
      try {
        if (selectedId) {
          const data:Partial<IUser> = {
            role: 'provider',
          };
          const res = await updateAUser(data, selectedId);
          // console.log(res);
          if (res.success) {
            toast.success("Request accepted");
            setModalOpen(false);
          } else {
            toast.error(res.message);
          }
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };
//   console.log(users)
  const columns: ColumnDef<IProvier>[] = [
    {
      accessorKey: "name",
      header: () => <div>Provider Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.logo || "https://ui-avatars.com/api/?name=&background=ccc&color=fff"}
            alt={row.original.providerName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.providerName}</span>
        </div>
      ),
    },
    {
      accessorKey: "userId",
      header: () => <div>UserID</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.userId._id}</span>
        </div>
      ),
    },
    // {
    //   accessorKey: "role",
    //   header: () => <div>User Role</div>,
    //   cell: ({ row }) => (
    //     <div>
    //       {row?.original?.role === "admin" ? (
    //         <div className="flex items-center gap-1">
    //           <span>
    //             <Crown className="size-4 text-yellow-400" />
    //           </span>{" "}
    //           {row?.original?.role.charAt(0).toUpperCase() +
    //             row?.original?.role.slice(1)}
    //         </div>
    //       ) : row?.original?.role === "provider" ? (
    //         <div className="flex items-center gap-1">
    //           <span>
    //             <Store className="size-4 text-green-400" />
    //           </span>{" "}
    //           {row?.original?.role.charAt(0).toUpperCase() +
    //             row?.original?.role.slice(1)}
    //         </div>
    //       ) : (
    //         <div>
    //           {row?.original?.role.charAt(0).toUpperCase() +
    //             row?.original?.role.slice(1)}
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "_id",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          title="make provider"
          //   onClick={() => handleBlock(row.original)}
        >
          <CircleCheckBig onClick={() => handleRequest(row.original)} className="w-5 h-5"/>
        </button>
      ),
    },
  ];
  return (
    <div>
      <MTable data={providers} columns={columns} />
      <RequestConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleRequestConfirm}
      />
    </div>
  );
};

export default ProviderRequests;
