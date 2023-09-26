import { Button } from "@mantine/core";
import clsx from "clsx";
import React, { ComponentProps, ReactNode, Ref } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  text?: string;
  children?: ReactNode;
  className?: string;
}

export default function AuthButton({
  text,
  children,
  className,
  ...rest
}: ButtonProps) {
  const buttonRef: Ref<HTMLButtonElement> = React.createRef();
  return (
    <div>
      <Button
        {...rest}
        size="md"
        ref={buttonRef}
        className={clsx(
          " w-full  bg-[#6E5DCF] text-white rounded-lg  ",
          className
        )}
      >
        {text}
        {children}
      </Button>
    </div>
  );
}
