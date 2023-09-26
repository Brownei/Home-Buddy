"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import AuthButton from "../common/button";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <div className="grid gap-3">
          <h1 className="text-[#1D1D1D)] text-[clamp(24px,2vw,32px)] font-semibold">
            Login
          </h1>
          <p className="text-[#828282]">Welcome back!</p>
        </div>
        <div className="grid gap-8">
          {/* USER LOGIN FORM  */}
          <div className="w-full mt-10 grid gap-4">
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

          {/* FACEBOOK AND GOOGLE AUTH  */}
          <div className=" grid gap-4">
            <div className=" flex items-center justify-center ">
              <Button
                size="md"
                className="border border-[#E0E0E0] bg-white hover:bg-[#f5f5f5] text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center "
              >
                <Image
                  src={"/google.svg"}
                  alt="GOOGLE"
                  width={32}
                  height={32}
                />
                <p className="ms-2">Sign up with Google</p>
              </Button>
            </div>
            <div className=" flex items-center justify-center ">
              <Button
                size="md"
                className=" border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-2"
              >
                <Image src={"/fb.svg"} alt="FACEBOOK" width={32} height={32} />
                <p className="ms-2">Sign up with Facebook</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>
            Dont have an account?{" "}
            <span className="text-[#6E5DCF]">
              {" "}
              <Link href={"/get-started"}>Sign Up</Link>
            </span>{" "}
          </p>
        </div>
      </AuthLayout>
    </>
  );
}
