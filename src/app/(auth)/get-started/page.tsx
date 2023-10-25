"use client";
import AuthLayout from "@/components/auth/auth-layout";
import SignUp from "@/components/auth/sign-up";
import { Box, Flex } from "@mantine/core";

export default function GetStarted() {
  return (
    <AuthLayout>
      <Flex direction="column" gap={32}>
        <Flex direction="column" gap={8}>
          <h1 className="text-[#1D1D1D)] text-[clamp(24px,2vw,32px)] font-semibold">
            Get Started
          </h1>
          <p className="text-[#828282]">
            Let’s get you started by creating an account
          </p>
        </Flex>
        <SignUp />
      </Flex>
    </AuthLayout>
  );
}
