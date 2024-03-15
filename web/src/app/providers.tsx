"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { Toaster } from "sonner";
import { theme } from "~/Ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface Props {
  children?: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <>
      <CacheProvider>
        <Toaster expand={true} richColors closeButton position="top-right" />
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
