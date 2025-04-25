"use client";

import * as React from "react";
import {
  ClipboardPlus,
  PackageCheck,
  // ClipboardList,
  Utensils,
  Users,
  Inbox,
  ChefHat,
  Package,
  LayoutDashboard,
  List,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Logo from "@/assets/Logo(01).png";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { useUser } from "@/context/UserContext";
import { NavUser } from "./nav-user";
import { IUser } from "@/types";

const data = {
  navAdmin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Manage Users",
      url: "/admin/manage-users",
      icon: Users,
    },
    {
      title: "Provider Requests",
      url: "/admin/provider-requests",
      icon: Inbox,
    },
  ],
  navProvider: [
    {
      title: "Dashboard",
      url: "/provider/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Create Meal",
      url: "/provider/create-meal",
      icon: Utensils,
    },
    {
      title: "My Meals",
      url: "/provider/my-meals",
      icon: List,
    },
    {
      title: "Create Meal Plan",
      url: "/provider/create-meal-plan",
      icon: ClipboardPlus,
    },
    {
      title: "Manage Orders",
      url: "/provider/manage-orders",
      icon: PackageCheck,
    },
    // {
    //   title: "Manage Meal Plan",
    //   url: "/provider/shop/manage-menus",
    //   icon: ClipboardList,
    // },
  ],
  navCustomer: [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Become a Provider",
      url: "/customer/become-provider",
      icon: ChefHat,
    },
    {
      title: "My Orders",
      url: "/customer/orders",
      icon: Package,
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentUserData: IUser
}
export function AppSidebar({currentUserData,  ...props }: AppSidebarProps) {
// get user role from cookies 
  const {user} = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Image src={Logo} alt="Logo" height={30} width={30} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">MealCraft</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <p>Main Nav Item</p> */}
        <NavMain
          items={
            user?.role === "admin"
              ? data.navAdmin
              : user?.role === "provider"
              ? data.navProvider
              : data.navCustomer
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser currentUserData={currentUserData}/>
      </SidebarFooter>
    </Sidebar>
  );
}
