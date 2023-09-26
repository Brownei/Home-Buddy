"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import AuthButton from "../common/button";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <AuthLayout>
        <div className="grid gap-3">
          <h1 className="text-[#1D1D1D)] text-[clamp(24px,2vw,32px)] font-semibold">
            Get Started
          </h1>
          <p className="text-[#828282]">
            Let’s get you started by creating an account
          </p>
        </div>
        <div className="grid gap-8">
          {/* USER SIGNUP FORMS  */}
          <div className="w-full mt-10 grid gap-4">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              size="md"
              withAsterisk
              sx={{
                label: { marginBlockEnd: "4px" },
              }}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              size="md"
              withAsterisk
              sx={{
                label: { marginBlockEnd: "4px" },
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              size="md"
              withAsterisk
              sx={{
                label: { marginBlockEnd: "4px" },
              }}
            />
            <AuthButton text="Get Started" />
          </div>

          {/* GOOGLE AND FACEBOOK AUTH  */}
          <div className=" grid gap-4">
            <div className="relative flex items-center justify-center ">
              <Image
                src={"/google.svg"}
                className="absolute left-[150px] z-40"
                alt="GOOGLE"
                width={32}
                height={32}
              />
              <Button
                size="md"
                className=" border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-2"
              >
                Sign up with Google
              </Button>
            </div>
            <div className="relative flex items-center justify-center ">
              <Image
                src={"/fb.svg"}
                className="absolute left-[140px] z-40"
                alt="FACEBOOK"
                width={32}
                height={32}
              />
              <Button
                size="md"
                className=" border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-2"
              >
                Sign up with Facebook
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>
            Dont have an account?{" "}
            <span className="text-[#6E5DCF]">
              <Link href={"/login"}>Sign In</Link>
            </span>{" "}
          </p>
        </div>
      </AuthLayout>
    </>
  );
}
