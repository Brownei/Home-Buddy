"use client";
import Image from "next/image";

interface AuthLayoutProp {
  children: any;
}

export default function AuthLayout({ children }: AuthLayoutProp) {
  return (
    <div className=" bg-[url('/authbgcolor.svg')]  bg-no-repeat bg-cover ">
      <div className="min-h-screen  max-w-[1440px] mx-auto  px-[clamp(24px,5vw,60px)] pt-10">
        <div className="flex gap-3 items-center text-white">
          <div className="w-[clamp(28px,3vw,40px)] ">
            <Image src={"/homebuddy.svg"} alt="LOGO" width={40} height={40} />
          </div>
          <h2 className="text-[clamp(20px,2vw,24px)]">
            Home<span className="font-bold">Buddy</span>
          </h2>
        </div>
        <div className=" flex gap-28 clg:justify-center    mt-[clamp(16px,1.5vw,20px)] ">
          <div className="bg-red h-full w-[40%] clg:hidden"></div>
          <div className="bg-white w-[700px] clg:w-full rounded-2xl px-[clamp(20px,4vw,48px)] py-[clamp(24px,2vw,32px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
