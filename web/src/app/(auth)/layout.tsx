"use client";

import { pb } from "~/lib/pocketbase";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (pb.authStore.isValid) {
      window.location.href = "/";
    }
  }, []);

  return <>{children}</>;
}
