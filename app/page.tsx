import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="flex flex-col w-full h-[100vh] z-10 text-6xl font-semibold text-center">
        <h1 className="font-bold text-9xl mt-10">Astro</h1>
        <h3>Post Generater</h3>
        <div className="flex space-x-20 mx-auto mt-14">
          <Link href={"/type1"}>
            <Card className="w-[400px] h-[400px] hover:ring-2 hover:ring-black transition-all">
              <Image src={"/temp1.svg"} alt="temp1" width={400} height={400} />
            </Card>
          </Link>
          <Link href={"/type2"}>
            <Card className="w-[400px] h-[400px]  hover:ring-2 hover:ring-black transition-all">
              <Image src={"/temp2.svg"} alt="temp2" width={400} height={400} />
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
