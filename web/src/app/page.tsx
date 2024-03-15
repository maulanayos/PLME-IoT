import type { Metadata } from "next";
import { LandingPage } from "./_landingpage";
import { subtitle } from "./shared-metadata";

export const metadata: Metadata = {
  title: subtitle("Home"),
};

export default function Page() {
  return (
    <>
      <LandingPage />
    </>
  );
}