"use client";
import { Button, Flex, PasswordInput, TextInput } from "@mantine/core";
import AuthLayout from "./auth-layout";
import AuthButton from "../common/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm, yupResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { builder } from "@/client-api/builder";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function SignUp() {
  const { push } = useRouter();

  const schema = yup.object().shape({
    fullName: yup.string().min(2, "Name should have at least 2 characters"),
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

  const myForm = useForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await builder.use().api.auth.sign_up({
        email: myForm.values.email,
        password: myForm.values.password,
        fullName: myForm.values.fullName,
      }),
    mutationKey: builder.api.auth.sign_up.get(),
    onSuccess(data) {
      console.log(data);
      // setCookieState(JSON.stringify());
      myForm.reset();
      toast.success("Account successfuly created", { autoClose: 2000 });
      push("/login");
    },
    onError(error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error);
      }
    },
  });

  return (
    <Flex gap={32} direction="column">
      {/* USER SIGNUP FORMS  */}
      <form
        className="w-full mt-10 grid gap-4"
        onSubmit={myForm.onSubmit(() => {
          mutate();
        })}
      >
        <TextInput
          {...myForm.getInputProps("fullName")}
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
          {...myForm.getInputProps("email")}
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
          {...myForm.getInputProps("password")}
          label="Password"
          placeholder="Enter your password"
          size="md"
          withAsterisk
          sx={{
            label: { marginBlockEnd: "4px" },
          }}
        />
        <AuthButton loading={isLoading} type="submit" text="Sign Up" />
      </form>

      {/* GOOGLE AND FACEBOOK AUTH  */}
      <Flex direction="column" gap={16}>
        <Button
          onClick={() => signIn("google")}
          leftIcon={
            <Image
              src={"/google.svg"}
              alt="GOOGLE"
              width={27}
              height={27}
              className="me-1"
            />
          }
          size="md"
          className="border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] text-[clamp(14px,1vw,16px)] font-semibold px-6 flex w-full justify-center items-center text-center rounded-lg"
        >
          Sign up with Google
        </Button>
        <Button
          onClick={() => signIn("facebook")}
          leftIcon={
            <Image
              src={"/fb.svg"}
              alt="FACEBOOK"
              className="me-1"
              width={27}
              height={27}
            />
          }
          size="md"
          className=" border border-[#E0E0E0] bg-white hover:bg-white text-[#4F4F4F] text-[clamp(14px,1vw,16px)] font-semibold px-6 flex w-full justify-center items-center text-center  rounded-lg"
        >
          Sign up with Facebook
        </Button>
      </Flex>

      <div className="text-center mt-8">
        <p>
          Dont have an account?{" "}
          <span className="text-[#6E5DCF]">
            <Link href={"/login"}>Sign In</Link>
          </span>{" "}
        </p>
      </div>
    </Flex>
  );
}
