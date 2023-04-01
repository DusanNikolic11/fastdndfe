import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="bg-cover bg-repeat min-h-screen overflow-auto bg-[url('/src/assets/images/bgCover.jpg')]">
      <Outlet />
    </div>
  );
};

export default RootLayout;
