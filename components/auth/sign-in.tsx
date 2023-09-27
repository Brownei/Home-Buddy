"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import AuthButton from "../common/button";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <div className="grid gap-3">
          <h1 className="text-[#1D1D1D)] text-[clamp(24px,2vw,32px)] font-semibold">
            Login
          </h1>
          <p className="text-[#828282] text-[clamp(14px,1vw,16px)]">
            Welcome back!
          </p>
        </div>
        {/* <div className="grid gap-8"> */}
        {/* USER LOGIN FORM  */}
        <div className="w-full mt-10 grid gap-4">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            size="md"
            withAsterisk
            sx={{
              label: {
                marginBlockEnd: "4px",
                fontSize: "clamp(14px,1vw,16px)",
              },
              input: {
                "&::placeholder": {
                  fontSize: "clamp(14px,1vw,16px)",
                },
              },
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size="md"
            withAsterisk
            sx={{
              label: {
                marginBlockEnd: "4px",
                fontSize: "clamp(14px,1vw,16px)",
              },
              input: {
                "&::placeholder": {
                  fontSize: "clamp(14px,1vw,16px)",
                },
              },
            }}
          />
          <AuthButton text="Get Started" />
        </div>

        {/* FACEBOOK AND GOOGLE AUTH  */}
        <div className=" grid gap-4">
          <div className="relative flex items-center justify-center ">
            <Button
              onClick={() => signIn("google")}
              size="md"
              className="border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-4"
            >
              <span>
                <Image
                  src={"/google.svg"}
                  alt="GOOGLE"
                  width={27}
                  height={27}
                />
              </span>
              Sign up with Google
            </Button>
          </div>
          <div className="relative flex items-center justify-center ">
            <Button
              onClick={() => signIn("facebook")}
              size="md"
              className=" border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-4"
            >
              <span>
                <Image src={"/fb.svg"} alt="FACEBOOK" width={27} height={27} />
              </span>
              Sign up with Facebook
            </Button>
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
