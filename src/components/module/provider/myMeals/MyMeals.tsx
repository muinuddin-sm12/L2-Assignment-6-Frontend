"use client";
import { MTable } from "@/components/ui/core/MTable";
import { getSpecificProviderMeals } from "@/services/Meal";
import { IMeal, IProvier } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MyMealsProps {
  data: IProvier;
}
const MyMeals = ({ data }: MyMealsProps) => {
  const [meals, setMeals] = useState<IMeal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSpecificProviderMeals(data?._id);
        // console.log("use effect", res);
        if (res.success) {
          setMeals(res?.data);
        } else {
          console.error("Failed to fetch meals", res.message);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchData();
  }, [data]);
  // console.log(data._id)

  const columns: ColumnDef<IMeal>[] = [
    {
      accessorKey: "image",
      header: () => <div>Meal Photo</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.image || ""}
            alt={row?.original?.mealName || "image"}
            width={40}
            height={40}
            className="w-30 h-20 object-cover rounded-lg"
          />
          <span className="truncate">{row.original.mealName}</span>
        </div>
      ),
    },
    {
      accessorKey: "mealName",
      header: () => <div>Meal Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.mealName}</span>
        </div>
      ),
    },
    {
      accessorKey: "_id",
      header: () => <div>Meal Id</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original._id}</span>
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
    // {
    //   accessorKey: "isActive",
    //   header: () => <div>Action</div>,
    //   cell: ({ row }) => (
    //     <button
    //       disabled={row.original.role === "admin"}
    //       //   className={`disabled: ${row.original.role === 'admin}`}
    //       title={
    //         row.original.role === "admin"
    //           ? "You can't block an admin"
    //           : row.original.isActive
    //           ? "Unblock user"
    //           : "Block user"
    //       }
    //     //   onClick={() => handleBlock(row.original)}
    //     >
    //       {row.original.isActive ? (
    //         <LockKeyhole className="w-5 h-5 text-red-500" />
    //       ) : (
    //         <LockKeyholeOpen onClick={() => handleBlock(row.original)} className="w-5 cursor-pointer h-5 text-green-500" />
    //       )}
    //     </button>
    //   ),
    // },
  ];
  return (
    <div>
      <MTable data={meals} columns={columns} />
    </div>
  );
};

export default MyMeals;
