"use client";
import { Button, TextInput } from "@mantine/core";
import React from "react";

export default function Newsletter() {
  return (
    <div>
      <div className="max-w-[1440px] mx-auto  px-[clamp(24px,5vw,60px)]  py-[clamp(24px,6vw,64px)] ">
        <div className="text-center  grid gap-[clamp(1rem,4vw,4rem)] ">
          <div>
            <h5 className="font-bold text-[clamp(24px,4vw,48px)]">
              Subscribe to our newsletter
            </h5>
            <h2 className="text-[clamp(18px,2vw,32px)] font-bold">
              We have properties for sale in different locations
            </h2>
          </div>
          <form
            action=""
            className="flex gap-2 w-[60%] md:flex-col md:w-full mx-auto items-center "
          >
            <TextInput
              className="w-[90%] md:w-full"
              placeholder="Enter your email address"
              size="md"
            />
            <Button
              size="md"
              className="bg-[#6E5DCF] hover:bg-[#433788]  border-2 border-[#968BD6]"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
