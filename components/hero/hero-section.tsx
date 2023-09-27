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

export default function HeroSection() {
  return (
    <>
      <div className="  bg-[url('/herobg.svg')]  bg-no-repeat bg-contain  bg-right-top px-[clamp(24px,5vw,60px)]  max-w-[1440px] mx-auto">
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
          <div className="mt-[clamp(16px,2vw,32px)] gap-4 flex-wrap flex ">
            {filterItem.map((item) => (
              <div className="bg-gray-100 p-4 min-w-[200px] gsm:w-full  w-[25%]" key={item.id}>
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
              <Button className="w-full bg-red-200 justify-end">
                <Image
                  src={"/search.svg"}
                  alt="search"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
