import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col w-full h-16 bg-slate-200/20 items-center justify-center">
      <p className="  font-medium text-black ">
        Design and Develop by{" "}
        <Link href={"https://claviq.com"}>Achintha Pallegedara</Link>
      </p>
    </div>
  );
};

export default Footer;
