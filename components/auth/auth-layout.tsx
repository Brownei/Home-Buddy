"use client";
import Image from "next/image";

interface AuthLayoutProp {
  children: any;
}

export default function AuthLayout({ children }: AuthLayoutProp) {
  return (
    <div className="bg-[url('/authbgcolor.svg')] h-screen w-screen bg-no-repeat bg-cover  px-16 py-10">
      <div className="flex gap-3 items-center text-white">
        <div className="w-[20px] ">
          <Image src={"/homebuddy.svg"} alt="LOGO" width={40} height={40} />
        </div>
        <h2 className="text-[24px]">
          Home<span className="font-bold">Buddy</span>
        </h2>
      </div>
      <div className=" flex   mt-[clamp(16px,1.5vw,20px)] ">
        <div className="bg-red h-full w-[50%]"></div>
        <div className="bg-white w-[40%] rounded-2xl px-10 py-[clamp(24px,2vw,32px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
