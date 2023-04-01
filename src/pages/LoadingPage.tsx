import React from "react";

import Loader from "@/components/Loader";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default LoadingPage;
