import React from "react";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className="h-20 border w-full bg-slate-100/20 flex items-center  justify-start pl-10">
      <Image src="/astromainlogo.png" alt="astro logo" width={60} height={30} />
    </div>
  );
};

export default TopBar;
