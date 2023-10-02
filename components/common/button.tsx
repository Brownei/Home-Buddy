import { Button, Loader } from "@mantine/core";
import clsx from "clsx";
import React, { ComponentProps, ReactNode, Ref } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  text?: string;
  children?: ReactNode;
  className?: string;
  loading: boolean;
}

export default function AuthButton({
  text,
  children,
  className,
  loading,
  ...rest
}: ButtonProps) {
  const buttonRef: Ref<HTMLButtonElement> = React.createRef();
  return (
    <div>
      <Button
        {...rest}
        size="md"
        ref={buttonRef}
        type="submit"
        className={clsx(
          " w-full  bg-[#6E5DCF] hover:bg-[#433788] text-white rounded-lg  text-[clamp(14px,1vw,16px)] ",
          className
        )}
      >
        {text}
        {children}
        {loading ? (
          <Loader className="ms-2" size="sm" color="white" type="submit" />
        ) : null}
      </Button>
    </div>
  );
}
