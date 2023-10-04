"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import AuthButton from "../common/button";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm, yupResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { builder } from "@/client-api/builder";
import { AxiosError } from "axios";
import { cookieStorage, usePortal } from "@ibnlanre/portal";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must contain text and number characters"
    )
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export default function SignIn() {
  const [, setUserInfo] = usePortal.cookie("hb_auth", {
    value: "",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
  const { push } = useRouter();

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await builder.use().api.auth.login(loginForm.values),
    mutationKey: builder.api.auth.login.get(),
    onSuccess(data) {
      setUserInfo(JSON.stringify(data));
      cookieStorage.setItem("hb_auth", JSON.stringify(data));
      loginForm.reset();
      toast.success("Welcome", { autoClose: 2000 });
      push("/");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    },
  });

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
        {/* USER LOGIN FORM  */}
        <form
          className="w-full mt-10 grid gap-4"
          onSubmit={loginForm.onSubmit(() => {
            mutate();
          })}
        >
          <TextInput
            {...loginForm.getInputProps("email")}
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
            {...loginForm.getInputProps("password")}
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
          <AuthButton loading={isLoading} type="submit" text="Sign In" />
        </form>

        {/* FACEBOOK AND GOOGLE AUTH  */}
        <div className=" grid gap-4 mt-4">
          <div className="relative flex items-center justify-center ">
            <Button
              onClick={() => signIn("google")}
              size="md"
              className="border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] font-semibold px-6 flex w-full justify-center items-center text-center gap-4"
            >
              <span>
                <Image
                  className="me-1"
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
                <Image
                  className="me-1"
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
