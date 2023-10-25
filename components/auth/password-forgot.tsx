"use client";
import React from "react";
import AuthLayout from "./auth-layout";
import Link from "next/link";
import AuthButton from "../common/button";
import { TextInput } from "@mantine/core";
import { builder } from "@/client-api/builder";
import { cookieStorage } from "@ibnlanre/portal";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email is required"),
});

export default function ForgetPassword() {
  const { push } = useRouter();

   const forgotForm = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await builder.use().api.auth.forgot_password(forgotForm.values),
    mutationKey: builder.api.auth.login.get(),
    onSuccess(data) {
      forgotForm.reset();
      cookieStorage.setItem("userEmail", forgotForm.values.email);
      push("/verify");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    },
  });

  return (
    <AuthLayout>
      <div className="grid gap-3">
        <h1 className="text-[#1D1D1D)] text-[clamp(24px,2vw,32px)] font-semibold">
          Login
        </h1>
        <p className="text-[#828282] text-[clamp(14px,1vw,16px)]">
          Welcome back!
        </p>
      </div>
      {/* USER LOGIN FORM  */}
      <form
        className="w-full mt-10 grid gap-4"
        onSubmit={forgotForm.onSubmit(() => {
          mutate();
        })}
      >
        <TextInput
          {...forgotForm.getInputProps("email")}
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

        <AuthButton loading={isLoading} type="submit" text="Reset Password" />
      </form>

      <div className="text-center mt-8">
        <p>
          Go back to{" "}
          <span className="text-[#6E5DCF]">
            {" "}
            <Link href={"/get-started"}>Sign In</Link>
          </span>{" "}
        </p>
      </div>
    </AuthLayout>
  );
}
