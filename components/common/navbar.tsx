"use client";

import { Button, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const navItems = [
  {
    id: "1",
    title: "Home",
    link: "/",
  },
  {
    id: "2",
    title: "About",
    link: "/about",
  },
  {
    id: "3",
    title: "Properties",
    link: "/properties",
  },
];

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  return (
    <>
      <div className=" max-w-[1440px] mx-auto flex items-center justify-between  px-[clamp(24px,5vw,60px)] py-[clamp(24px,5vw,40px)]">
        <div className="flex gap-2 items-center">
          <div className="w-[clamp(24px,3vw,40px)] ">
            <Image src={"/navIcon.svg"} alt="LOGO" width={40} height={40} />
          </div>
          <h2 className="text-[clamp(18px,2vw,24px)] text-[#686868]">
            Home<span className="font-bold text-[#6E5DCF]">Buddy</span>
          </h2>
        </div>

        <ul className="md:hidden flex gap-[clamp(20px,3vw,44px)]">
          {navItems.map((item) => (
            <Link href={item.link}>
              <li
                className={`${
                  pathname === item.link || pathname === `${item.link}`
                    ? "text-[clamp(14px,2vw,18px)] text-[#8072CF]"
                    : "text-[clamp(14px,2vw,18px)] text-[#121212] "
                }`}
                key={item.id}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
        <div className="md:hidden flex gap-[clamp(12px,2vw,24px)]">
          <Link href={"/get-started"}>
            <Button className="bg-[#8072CF] hover:bg-[#433788] text-[clamp(14px,2vw,18px)] ">
              Get Started
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button className="text-[clamp(14px,2vw,18px)] border border-[#8072CF] hover:text-[#433788] hover:bg-white hover:border-2 hover:border-[#433788] bg-white text-[#8072CF]">
              Log in
            </Button>
          </Link>
        </div>
        <div className="hidden md:flex">
          <Drawer position="right" size={"50%"} opened={opened} onClose={close}>
            <ul className=" grid gap-4">
              {navItems.map((item) => (
                <Link href={item.link}>
                  <li
                    className={`${
                      pathname === item.link || pathname === `${item.link}`
                        ? "text-[16px] text-[#8072CF]"
                        : "text-[16px] text-[#121212] "
                    }`}
                    key={item.id}
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </Drawer>

          <Group position="center">
            {/* <Button onClick={open}>Open modal</Button> */}
            <Image
              onClick={open}
              src={"/hamburger.svg"}
              alt="MENU"
              width={24}
              height={24}
            />
          </Group>
        </div>
      </div>
    </>
  );
}
