import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="px-6 md:px-12 lg:px-20">
      <Navbar/>
      </div>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
