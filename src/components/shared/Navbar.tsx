"use client";
import React, { useState } from "react";
import Logo from "@/assets/Logo.png";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import { logOut } from "@/services/Auth";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { protectedRoutes } from "@/constant";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {user, setIsLoading} = useUser()
  const menuItems = [
    {name:'Plans & Packages', path: '/meal-plan'},
    {name: 'Menu', path: '/find-meals'},
    {name: 'Blog', path: '/blog'}
  ]
  const handleLogOut = () => {
    logOut();
    toast.warning("Logout Successfully!")
    setIsLoading(true);
    router.refresh();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
    router.push('/')
  };
  return (
    <div className="h-20 px-6 md:px-12 lg:px-20 flex items-center justify-between ">
      <div>
        <Link href="/">
          <h1 className="text-2xl flex items-center font-[600] ">
            <Image src={Logo} height={40} width={40} alt="MealCraft Logo" />
            MealCraft
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-10">
      <div className="flex items-center gap-6 ">
        {menuItems.map((menu, index) => <Link key={index} href={menu.path}>{menu.name}</Link>)}
      </div>

      {user?.email ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=muin" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>My Shop</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
      </div>
    </div>
  );
};

export default Navbar;
