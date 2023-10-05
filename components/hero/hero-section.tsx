"use client";
import { Button, Select } from "@mantine/core";
import Image from "next/image";
import React from "react";

const filterItem = [
  {
    id: "1",
    title: "Location",
    command: "Select your city",
  },
  {
    id: "2",
    title: "Property Type",
    command: "Property Type",
  },
  {
    id: "3",
    title: "Price Range",
    command: "Select price",
  },
];

const heroStat = [
  {
    id: "1",
    figure: "150",
    text: "Award Winning",
  },
  {
    id: "2",
    figure: "250",
    symbol: "+",
    text: "Happy Customers",
  },
  {
    id: "3",
    figure: "500",
    symbol: "+",
    text: "Property Ready",
  },
];
export default function HeroSection() {
  return (
    <>
      <div className="  bg-[url('/herobg.svg')] min-h-max bg-no-repeat bg-contain md:bg-cover  bg-right-top px-[clamp(24px,5vw,60px)] py-[clamp(,1.3vw,20px)]  max-w-[1440px] mx-auto">
        {/* <div className=""> */}
        <div className="w-[60%] clg:w-[80%] gsm:w-full  ">
          {/* hero heading  */}
          <div className="grid gap-6 mt-4">
            <h1 className="text-[clamp(24px,5vw,60px)] text-[#243B67] font-bold">
              Discover Your Perfect{" "}
              <span className="text-[#6E5DCF]">Apartment</span> With Ease
            </h1>
            <p className="text-[clamp(14px,2vw,24px)]">
              We provide a complete service of sale and rental services of
              diverse range of properties that match your lifestyle and
              aspirations.
            </p>
          </div>
          {/* hero filter section  */}
          <div className="mt-[clamp(16px,2vw,32px)] gap-4 flex-wrap flex ">
            {filterItem.map((item) => (
              <div
                className="bg-gray-100 p-4 min-w-[200px] gsm:w-full  w-[25%]"
                key={item.id}
              >
                <Select
                  label={item.title}
                  placeholder={item.id}
                  data={[
                    { value: "react", label: "React" },
                    { value: "ng", label: "Angular" },
                    { value: "svelte", label: "Svelte" },
                    { value: "vue", label: "Vue" },
                  ]}
                  sx={{
                    label: {
                      marginBlockEnd: "16px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </div>
            ))}
            <div className="bg-red !w-[100px] gsm:!w-full flex items-end  p-4 ">
              <Button className="w-full bg-[#8072CF] hover:bg-[#433788]  justify-end">
                <Image
                  src={"/search.svg"}
                  alt="search"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
          {/* hero stat  */}
          <div className="flex gap-[clamp(1rem,4vw,4rem)]  mt-8 md:bg-white md:max-w-max gsm:max-w-full gsm:justify-between rounded-2xl px-4 py-3 ">
            {heroStat.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-center  items-center"
              >
                <h2 className="text-[clamp(22px,2vw,32px)] font-bold">
                  {item.figure}
                  <span className="text-[#6E5DCF]">{item.symbol}</span>
                </h2>
                <p className="text-[clamp(14px,1vw,16px)] text-[#8D8D8D] text-center">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
