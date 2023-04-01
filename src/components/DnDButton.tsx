import React from "react";

import { cn } from "@/utils/styleUtils";

interface IDnDButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const DnDButton = ({ children, disabled, ...props }: IDnDButtonProps) => {
  return (
    <div
      className={cn("flex cursor-pointer", disabled && "opacity-50 pointer-events-none")}
      {...props}
    >
      <div className="w-0 h-0 md:border-t-[23.3px] md:border-r-[33.3px] md:border-b-[23.3px] border-r-brown border-t-transparent border-b-transparent border-t-[17.5px] border-r-[25px] border-b-[17.5px]" />
      <div className="bg-brown h-[34.5px] md:h-[46.6px] px-7 py-3 flex items-center justify-center text-beige-light  whitespace-nowrap text-sm md:text-xl xl:text-2xl">
        {children}
      </div>
      <div className="w-0 h-0 md:border-t-[23.3px] md:border-l-[33.3px] md:border-b-[23.3px] border-l-brown border-t-transparent border-b-transparent border-t-[17.5px] border-l-[25px] border-b-[17.5px]" />
    </div>
  );
};

export default DnDButton;
