/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BlockingConfirmationModal from "@/components/ui/core/MModal/BlockingConfirmationModal";
import { MTable } from "@/components/ui/core/MTable";
import { updateAUser } from "@/services/User";
import { IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Crown, Store, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

type TUserProps = {
  users: IUser[];
};

const ManageUsers = ({ users }: TUserProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectName] = useState<string | null>(null);

  const handleBlock = (data: IUser) => {
    setSelectedId(data?._id);
    setModalOpen(true);
    setSelectName(data?.name);
  };
  const handleBlockConfirm = async () => {
    try {
      if (selectedId) {
        const data = {
          isActive: true,
        };
        const res = await updateAUser(data, selectedId);
        // console.log(res);
        if (res.success) {
          toast.success("User is Blocked");
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: () => <div>User Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.image}
            alt={row?.original?.name || 'image'}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div>User Role</div>,
      cell: ({ row }) => (
        <div>
          {row?.original?.role === "admin" ? (
            <div className="flex items-center gap-1">
              <span>
                <Crown className="size-4 text-yellow-400" />
              </span>{" "}
              {row?.original?.role.charAt(0).toUpperCase() +
                row?.original?.role.slice(1)}
            </div>
          ) : row?.original?.role === "provider" ? (
            <div className="flex items-center gap-1">
              <span>
                <Store className="size-4 text-green-400" />
              </span>{" "}
              {row?.original?.role.charAt(0).toUpperCase() +
                row?.original?.role.slice(1)}
            </div>
          ) : (
            <div>
              {row?.original?.role.charAt(0).toUpperCase() +
                row?.original?.role.slice(1)}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          disabled={row.original.role === "admin"}
          //   className={`disabled: ${row.original.role === 'admin}`}
          title={
            row.original.role === "admin"
              ? "You can't block an admin"
              : row.original.isActive
              ? "Unblock user"
              : "Block user"
          }
        //   onClick={() => handleBlock(row.original)}
        >
          {row.original.isActive ? (
            <LockKeyhole className="w-5 h-5 text-red-500" />
          ) : (
            <LockKeyholeOpen onClick={() => handleBlock(row.original)} className="w-5 cursor-pointer h-5 text-green-500" />
          )}
        </button>
      ),
    },
  ];
  return (
    <div>
      <MTable data={users} columns={columns} />
      <BlockingConfirmationModal
        name={selectedName}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleBlockConfirm}
      />
    </div>
  );
};

export default ManageUsers;
