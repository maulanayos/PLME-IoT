import type { Metadata } from "next";
import PageClient from "./_page";
import { subtitle } from "~/app/shared-metadata";

export const metadata: Metadata = {
  title: subtitle("Login"),
};

export default function Page() {
  return (
    <>
      <PageClient />
    </>
  );
}
