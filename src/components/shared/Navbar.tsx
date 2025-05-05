"use client";
import React, { useState } from "react";
import Logo from "@/assets/Logo.png";
import Link from "next/link";
import { LogOut, Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import { logOut } from "@/services/Auth";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { protectedRoutes } from "@/constant";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  
  console.log(user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Plans & Packages", path: "/plans-and-packages" },
    { name: "Menu", path: "/find-meals" },
    { name: "Blog", path: "/blog" },
  ];

  const handleLogOut = () => {
    logOut();
    toast.warning("Logout Successfully!");
    setIsLoading(true);
    router.refresh();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
    router.push("/");
  };

  return (
    <div className="h-20 px-4 md:px-12 lg:px-20 flex items-center justify-between border-b">
      <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
        <Image src={Logo} height={40} width={40} alt="MealCraft Logo" />
        MealCraft
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {menuItems.map((menu, index) => (
          <Link key={index} href={menu.path} className="hover:text-[#F4511E]">
            {menu.name}
          </Link>
        ))}

        {user?.email ? (
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="bg-[#F4511E] text-white cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOut className="text-white" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button className="rounded-full" variant="outline">
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-0 w-full bg-white border-t shadow-md md:hidden z-50"
          >
            <div className="flex flex-col p-4 gap-4">
              {menuItems.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {menu.name}
                </Link>
              ))}

              {user?.email ? (
                <>
                  <Link
                    href={`/${user?.role}/dashboard`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-white bg-[#F4511E] px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="rounded-full w-full" variant="outline">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
