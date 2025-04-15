"use client";
import React from "react";
import Logo from "@/assets/Logo.png";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const Navbar = () => {
  const user = 'provider';

  const menuItems = [
    {name:'Home', path: '/'},
    {name: 'Menu', path: '/menu'},
    {name: 'Dashboard', path: `/${user}/dashboard`},
    {name: 'about', path: '/about'}
  ]
  return (
    <div className="h-20 border-b flex items-center px-10 justify-between">
      <div>
        <Link href="/">
          <h1 className="text-2xl flex items-center font-[600] ">
            <Image src={Logo} height={40} width={40} alt="MealCraft Logo" />
            MealCraft
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-6 ">
        {menuItems.map((menu, index) => <Link key={index} href={menu.path}>{menu.name}</Link>)}
      </div>

      <div>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
