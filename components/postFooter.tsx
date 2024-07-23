import Image from "next/image";

const postFooter = () => {
  return (
    <div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-full h-20 bg-black flex items-baseline justify-between px-10 pt-4">
      <div className="text-white flex space-x-5">
        <Image src={"/fb.svg"} width={12} height={12} alt="facebook" />
        <Image src={"/yt.svg"} width={25} height={25} alt="youtube" />
        <Image src={"/x.svg"} width={20} height={20} alt="x" />
        <Image src={"/insta.svg"} width={22} height={22} alt="x" />
        <Image src={"/linkdin.svg"} width={22} height={22} alt="x" />
      </div>
      <div className="text-white">
        <Image src={"/astrologo.png"} width={300} height={20} alt="logo" />
      </div>
    </div>
  );
};

export default postFooter;
