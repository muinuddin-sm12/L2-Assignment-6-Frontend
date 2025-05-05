import logo from "@/assets/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="pt-6 bg-gray-50 rounded-t-3xl md:pt-16 border-t mt-12 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4 px-6 md:px-12 lg:px-20 pb-4 md:pb-12">
        <h1 className="text-xl flex items-center font-[600] ">
          <Image src={logo} height={32} width={32} alt="MealCraft Logo" />
          MealCraft
        </h1>
        <div>
          <p className="font-medium text-gray-600 mb-1">Overview</p>
          <div className="text-sm flex flex-col">
            <Link href={"/about-us"} className="hover:text-[#F4511E]">
              About Us
            </Link>
            <Link href={"/"} className="hover:text-[#F4511E]">
              Contact Us
            </Link>
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-600 mb-1">Others</p>
          <div className="text-sm flex flex-col">
            <Link href={"/about-us"} className="hover:text-[#F4511E]">
              Privacy Policy
            </Link>
            <Link href={"/"} className="hover:text-[#F4511E]">
              Disclaimer
            </Link>
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-600 mb-1">Connect with us</p>
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#4CAF50]" />
              <span>+880 123456 8426</span>
            </div>
            <div className="flex items-center gap-2">
              <IoMdMail className="text-[#4CAF50]" />
              <span>contactus@mealcraft.bd</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12 w-full text-sm bg-black text-gray-500 flex items-center px-6 md:px-12 lg:px-20">
        <p>Copyright &copy; MealCraft 2025. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
