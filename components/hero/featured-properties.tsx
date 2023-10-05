"use client";
import Image from "next/image";
import { Heart } from "iconsax-react";
import { Button } from "@mantine/core";

const featuredProperty = [
  {
    id: "1",
    icon: "/blueIvy.svg",
    alt: "blue ivy",
    price: "N530,000",
    title: "Blue Ivy Apartment",
    address: "12, Adeniran Street, Ikoyi, Lagos",
    bed: "3",
    baths: "2",
    park: "1",
  },
  {
    id: "2",
    icon: "/benny.svg",
    alt: "Benny Apartment",
    price: "N370,000",
    title: "Benny Apartment",
    address: "12, Adeniran Street, Ikoyi, Lagos",
    bed: "3",
    baths: "2",
    park: "1",
  },
  {
    id: "3",
    icon: "/standard.svg",
    alt: "Standard Apartment",
    price: "N650,000",
    title: "Standard Apartment",
    address: "12, Adeniran Street, Ikoyi, Lagos",
    bed: "3",
    baths: "2",
    park: "1",
  },
  {
    id: "4",
    icon: "/greenville.svg",
    alt: "Greenville Apartment",
    price: "N450,000",
    title: "Greenville Apartment",
    address: "12, Adeniran Street, Ikoyi, Lagos",
    bed: "3",
    baths: "2",
    park: "1",
  },
  {
    id: "5",
    icon: "/honey.svg",
    alt: "Honey Apartment",
    price: "N560,000",
    title: "Honey Apartment",
    address: "12, Adeniran Street, Ikoyi, Lagos",
    bed: "2",
    baths: "1",
    park: "1",
  },
  {
    id: "6",
    icon: "/glorious.svg",
    alt: "Glorious Apartment",
    price: "N728,000",
    title: "Blue Ivy Apartment",
    address: "12, Adeniran Street, Ikoyi, Lagos",
    bed: "2",
    baths: "1",
    park: "1",
  },
];
export default function FeaturedProperties() {
  return (
    <div className=" bg-[#F4F2FF] bg-no-repeat bg-cover ">
      <div className=" max-w-[1440px] mx-auto  px-[clamp(24px,5vw,60px)]  py-[clamp(24px,6vw,64px)] ">
        <div className="text-center text-[#6E5DCF] grid gap-4">
          <h5 className="font-bold text-[clamp(24px,4vw,48px)]">
            FEATURED PROPERTIES DEALS
          </h5>
          <h2 className="text-[clamp(18px,2vw,32px)] font-bold">
            We have properties for sale in different locations
          </h2>
        </div>
        <div className="flex flex-wrap  gap-5 justify-between mt-[clamp(40px,6vw,80px)]">
          {featuredProperty.map((item) => (
            <div
              key={item.id}
              className="  w-[30%] clg:w-[45%] gcsm:w-full  p-[clamp(16px,1.5vw,24px)] flex gap-7 flex-col bg-white rounded-lg  "
            >
              <div className="w-full relative">
                <div className="absolute right-2 cursor-pointer top-2 z-40">
                  <Heart size={30} color="white" className="fill-white" />
                </div>
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={1000}
                  height={1000}
                />
              </div>
              <div>
                <h4 className="text-[#6E5DCF] text-[clamp(20px,2vw,32px)] font-bold">
                  {item.price}
                </h4>
                <div className="grid gap-4 ">
                  <div>
                    <p className="text-[#272727] font-bold text-[clamp(16px,1.5vw,24px)]">
                      {item.title}
                    </p>
                    <p className="text-[#828282] text-[clamp(14px,1vw,16px)]">
                      {item.address}
                    </p>
                  </div>
                  <div className="flex text-center gap-2 text-[#797878] text-[clamp(10px,1vw,14px)]">
                    <div className="rounded-lg border min-w-[55px]  border-[#C5C5C5] p-1">
                      {item.bed} beds
                    </div>
                    <div className="rounded-lg border min-w-[55px] border-[#C5C5C5] p-1">
                      {item.baths} baths
                    </div>
                    <div className="rounded-lg border min-w-[55px] border-[#C5C5C5] p-1">
                      {item.park} park
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex  justify-center mt-[clamp(2rem,4vw,4rem)]">
          <Button className=" bg-[#6E5DCF] hover:bg-[#433788]">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}
