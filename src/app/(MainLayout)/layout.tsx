import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar/>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
