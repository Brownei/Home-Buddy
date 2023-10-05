"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#6E5DCF]">
      <div className="max-w-[1440px] mx-auto  px-[clamp(24px,5vw,60px)]  py-[clamp(24px,6vw,64px)] ">
        <div className="flex justify-between">
          <div className="text-[#fff] grid gap-[clamp(1rem,3vw,3rem)] w-[15%]">
            <div className="flex gap-2 items-center">
              <div className="w-[clamp(24px,3vw,40px)] ">
                <Image src={"/flogo.svg"} alt="LOGO" width={40} height={40} />
              </div>
              <h2 className="text-[clamp(18px,2vw,24px)] ">
                Home<span className="font-bold ">Buddy</span>
              </h2>
            </div>
            <address>
              158 Newtown Street, 100149 Ibadan, Oyo state. Nigeria
            </address>
            <figure></figure>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
