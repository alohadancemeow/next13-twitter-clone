"use client";

import React from "react";
import Sidebar from "./Sidebar";
import FollowBar from "./FollowBar";
import { User } from "@prisma/client";

type Props = {
  children: React.ReactNode;
  currentUser?: User | null;
};

const Layout: React.FC<Props> = ({ children, currentUser }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full max-w-6xl mx-auto xl:px-30">
        <div className="grid h-full grid-cols-4">
          <Sidebar currentUser={currentUser} />
          <div
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
          "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
