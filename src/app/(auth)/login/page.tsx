"use client";
import AuthLayout from "@/components/auth/auth-layout";
import SignIn from "@/components/auth/sign-in";
import { Box, Flex } from "@mantine/core";
import React from "react";

export default function Login() {
  return (
    <AuthLayout>
      <Flex direction="column" gap={32}>
        <Flex direction="column" gap={8}>
          <h1 className="text-[#1D1D1D)] text-[clamp(24px,2vw,32px)] font-semibold">
            Login
          </h1>
          <p className="text-[#828282] text-[clamp(14px,1vw,16px)]">
            Welcome back!
          </p>
        </Flex>
        <SignIn />
      </Flex>
    </AuthLayout>
  );
}
