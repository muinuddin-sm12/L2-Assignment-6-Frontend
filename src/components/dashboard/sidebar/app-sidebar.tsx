"use client";

import * as React from "react";
import {
  Bot,
  //   Frame,
  //   LifeBuoy,
  //   Map,
  //   PieChart,
  //   Send,
  //   Settings,
  SquareTerminal,
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
// import { NavUser } from "./nav-user";
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
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Users",
      url: "/admin/manage-users",
      icon: SquareTerminal,
    },
    {
      title: "Provider Requests",
      url: "/admin/provider-requests",
      icon: SquareTerminal,
    },
  ],
  navProvider: [
    {
      title: "Dashboard",
      url: "/provider/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Create Meal",
      url: "/provider/create-meal",
      icon: SquareTerminal,
    },
    {
      title: "Create Meal Plan",
      url: "/provider/create-meal-plan",
      icon: SquareTerminal,
    },
    {
      title: "Manage Orders",
      url: "/provider/orders",
      icon: SquareTerminal,
    },
    {
      title: "Manage Meal Plan",
      url: "/provider/shop/manage-menus",
      icon: SquareTerminal,
    },
  ],
  navCustomer: [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Become a Provider",
      url: "/customer/become-provider",
      icon: Bot,
    },
    {
      title: "My Orders",
      url: "/user/order",
      icon: Bot,
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentUserData: IUser
}
export function AppSidebar({currentUserData,  ...props }: AppSidebarProps) {
// get user role from cookies 
  const {user, setIsLoading} = useUser();
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
                  <h2 className="font-bold text-xl">NextMart</h2>
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
