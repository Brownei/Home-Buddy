"use client";

import Image from "next/image";
import Link from "next/link";

const footerIcon = [
  {
    id: 1,
    src: "/instagram.svg",
    alt: "IG",
    link: "http//:www.instagram.com",
  },
  {
    id: 2,
    src: "/linkedin.svg",
    alt: "LINKEDIN",
    link: "http//:www.linkedin.com",
  },
  {
    id: 3,
    src: "/fb2.svg",
    alt: "FB",
    link: "http//:www.facebook.com",
  },
  {
    id: 4,
    src: "/twitter.svg",
    alt: "TWITTER",
    link: "http//:www.twitter.com",
  },
];

const footerHeader = [
  {
    id: 1,
    header: "About Us",
    text: ["Find a home", "Properties", "Reviews", "Agents"],
  },
  {
    id: 1,
    header: "About Us",
    text: ["Property Insurance", "FAQs", "Blogs", "Contact Us"],
  },
  {
    id: 2,
    header: "Legal",
    text: ["Privacy Policy", "Copyright"],
  },
];

const footerAboutUs = [
  {
    id: 1,
    text: "Find a home",
    link: "#",
  },
  {
    id: 2,
    text: "Properties",
    link: "#",
  },
  {
    id: 3,
    text: "Reviews",
    link: "#",
  },
  {
    id: 4,
    text: "Agents",
    link: "#",
  },
];
const footerHelp = [
  {
    id: 1,
    text: "Property Insurance",
    link: "#",
  },
  {
    id: 2,
    text: "FAQs",
    link: "#",
  },
  {
    id: 3,
    text: "Contact Us",
    link: "#",
  },
  {
    id: 4,
    text: "Blogs",
    link: "#",
  },
];
const footerLegal = [
  {
    id: 1,
    text: "Privacy Policy",
    link: "#",
  },
  {
    id: 2,
    text: "Copyrights",
    link: "#",
  },
  {
    id: 3,
    text: "Contact Us",
    link: "#",
  },
  {
    id: 4,
    text: "Blogs",
    link: "#",
  },
];

export default function Footer() {
  return (
    <div className="bg-[#6E5DCF]">
      <div className="max-w-[1440px] mx-auto  px-[clamp(24px,5vw,60px)]  py-[clamp(24px,6vw,64px)] ">
        <div className="flex csm:flex-col csm:items-center csm:text-center justify-between gap-y-10 gap-x-10 flex-wrap ">
          <div className="w-1/2">
            <div className="text-[#fff] grid gap-[clamp(1rem,3vw,3rem)] w-[15%] csm:w-full">
              <div className="flex gap-2 items-center">
                <div className="w-[clamp(24px,3vw,40px)] ">
                  <Image src={"/flogo.svg"} alt="LOGO" width={40} height={40} />
                </div>
                <h2 className="text-[clamp(18px,2vw,24px)] ">
                  Home<span className="font-bold ">Buddy</span>
                </h2>
              </div>
              <address className="not-italic">
                158 Newtown Street, 100149 Ibadan, Oyo state. Nigeria
              </address>
              <div className="flex items-center gap-3">
                {footerIcon.map((item) => (
                  <figure>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={24}
                      height={24}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="text-white flex flex-row-reverse gap-6 flex-1  justify-between"> */}
          <ul className="grid gap-4 text-white ">
            <h3 className="font-semibold text-[clamp(16px)] ">About Us</h3>
            {footerAboutUs.map((item) => (
              <Link href={item.link}>
                <li>{item.text}</li>
              </Link>
            ))}
          </ul>
          <ul className="grid gap-4 text-white">
            <h3 className="font-semibold text-[clamp(16px)]">Help</h3>
            {footerHelp.map((item) => (
              <Link href={item.link}>
                <li>{item.text}</li>
              </Link>
            ))}
          </ul>
          <ul className="grid gap-4 text-white">
            <h3 className="font-semibold text-[clamp(16px)]">Legal</h3>
            {footerLegal.map((item) => (
              <Link href={item.link}>
                <li>{item.text}</li>
              </Link>
            ))}
          </ul>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
