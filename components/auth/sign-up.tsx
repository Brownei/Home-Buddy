"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import AuthButton from "../common/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUp() {
  async function signupWithGoogle() {
    const response = await signIn("google");
    if (response?.ok) {
      window.location.assign("/admin");
    }
  }

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
                label: { marginBlockEnd: "4px" },
              }}
            />
            <AuthButton text="Sign Up" />
          </div>

          {/* GOOGLE AND FACEBOOK AUTH  */}
          <div className=" grid gap-4">
            <div className="relative flex items-center justify-center ">
              <Button
                onClick={() => signIn("google")}
                size="md"
                className="border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-4"
              >
                <span className="me-1">
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
                <span className="me-1">
                  <Image
                    src={"/fb.svg"}
                    alt="FACEBOOK"
                    width={27}
                    height={27}
                  />
                </span>
                Sign up with Facebook
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>
            Have an account?{" "}
            <span className="text-[#6E5DCF]">
              <Link href={"/login"}>Sign In</Link>
            </span>{" "}
          </p>
        </div>
      </AuthLayout>
    </>
  );
}
