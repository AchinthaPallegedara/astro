import React from "react";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="h-20 border w-full bg-slate-100/20 flex items-center  justify-start pl-10">
      <Link href={"/"}>
        <Image
          src="/astromainlogo.png"
          alt="astro logo"
          width={60}
          height={30}
        />
      </Link>
    </div>
  );
};

export default TopBar;
