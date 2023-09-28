"use client";
import Image from "next/image";

const chooseItem = [
  {
    id: "1",
    icon: "/budget.svg",
    alt: "budget",
    header: "Budget Friendly",
    text: "We provides a complete service for the sale, purchase or rental of real estate.",
  },
  {
    id: "3",
    icon: "/insurance.svg",
    alt: "insurance",
    header: "Propery Insurance",
    text: "We provides a complete service for the sale, purchase or rental of real estate.",
  },
  {
    id: "3",
    icon: "/commission.svg",
    alt: "commission",
    header: "Lowest Commission",
    text: "We provides a complete service for the sale, purchase or rental of real estate.",
  },
];
export default function Choose() {
  return (
    <div className=" bg-[url('/choosebg.svg')]  bg-no-repeat bg-cover ">
      <div className=" max-w-[1440px] mx-auto  px-[clamp(24px,5vw,60px)]  py-[clamp(24px,6vw,64px)] ">
        <div className="text-center text-white grid gap-4">
          <h5 className="font-bold">WHY CHOOSE US?</h5>
          <h2 className="text-[clamp(18px,1.5vw,24px)] font-bold">
            More than 50+ Brands Trusted World Wide
          </h2>
        </div>
        <div className="flex flex-wrap  gap-5 justify-between mt-[clamp(40px,6vw,80px)]">
          {chooseItem.map((item) => (
            <div
              key={item.id}
              className="text-center  w-[30%] clg:w-[45%] csm:w-full px-[clamp(10px,1vw,16px)] flex flex-col bg-white rounded-lg  items-center"
            >
              <Image src={item.icon} alt={item.alt} width={100} height={100} />
              <div className="grid gap-2 mb-6">
                <h4 className="text-[#6E5DCF] text-[clamp(18px,1.5vw,24px)] font-semibold">
                  {item.header}
                </h4>
                <p className="text-[#828282] text-[clamp(14px,1vw,16px)]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
