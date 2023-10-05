"use client";

import { MantineProvider } from "@mantine/core";
import { PiCaretDownBold } from "react-icons/pi";

interface MantineProps {
  children: React.ReactNode;
}

export default function MantineProv({ children }: MantineProps) {
  return (
    <>
      <MantineProvider
        theme={{
          components: {
            Select: {
              defaultProps: {
                rightSection: <PiCaretDownBold size={14} color="#9fa6ac" />,
              },
              classNames: {
                rightSection: "pointer-events-none",
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </>
  );
}
