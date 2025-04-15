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
import Logo from "@/assets/Logo.png";
import Image from "next/image";
import { NavMain } from "./nav-main";

const data = {
  navAdmin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "User",
      url: "/admin/user",
      icon: SquareTerminal,
      items: [
        {
          title: "Manage Users",
          url: "admin/user/manage-user",
        },
        {
          title: "Provider Requests",
          url: "admin/user/provider-requests",
        },
      ],
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
      title: "Create Meals",
      url: "/provider/create-meals",
      icon: SquareTerminal,
    },
    {
      title: "Manage Orders",
      url: "/provider/orders",
      icon: SquareTerminal,
    },
    {
      title: "Manage Menus",
      url: "/provider/shop/manage-menus",
      icon: Bot,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
// get user role from cookies 
  const user = "provider";
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
            user === "admin"
              ? data.navAdmin
              : user === "provider"
              ? data.navProvider
              : data.navCustomer
          }
        />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser /> */}
        <p>User Nav Items</p>
      </SidebarFooter>
    </Sidebar>
  );
}
