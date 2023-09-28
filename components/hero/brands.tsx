import Image from "next/image";
import React from "react";

const brandLogo = [
  {
    id: "1",
    alt: "amazon",
    img: "/amazon.svg",
  },
  {
    id: "2",
    alt: "microsoft",
    img: "/microsoft.svg",
  },
  {
    id: "3",
    alt: "airbnb",
    img: "/airbnb.svg",
  },
  {
    id: "4",
    alt: "google",
    img: "/googlelogo.svg",
  },
];

export default function Brands() {
  return (
    <div className=" px-[clamp(24px,5vw,60px)] py-[clamp(30px,7vw,80px)]  max-w-[1440px] mx-auto">
      <div className="grid text-center gap-[clamp(20px,4vw,44px)]">
        <h2 className="text-[clamp(18px,1.5vw,24px)] font-bold">
          More than 50+ Brands Trusted World Wide
        </h2>
        <div className="flex justify-between">
          {brandLogo.map((item) => (
            <div className="w-[clamp(50px,13vw,200px)]">
              <Image
                src={item.img}
                key={item.id}
                alt={item.alt}
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
