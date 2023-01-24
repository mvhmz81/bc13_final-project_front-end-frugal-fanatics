/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

const MobileLandPageNavbar = ({ setSidebarOpen }) => {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between border-b border-[#373C51] bg-[#1A1E2C] px-4 py-1.5">
        <div>
          <Image src="logo.svg" alt="Your Company" height="32" width="157" />
        </div>
        <div>
          <button
            type="button"
            className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileLandPageNavbar;