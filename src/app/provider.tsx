"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function CustomProvider({ children }: ProviderProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
