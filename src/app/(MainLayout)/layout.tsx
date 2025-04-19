import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar/>
      <main className="min-h-screen px-6 md:px-12 lg:px-20">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
