"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";

import React, { useState } from "react";

interface Props {
  noPadding?: boolean;
  children: React.ReactNode;
}

/* ganti lebar sidebar disini (px) */
const wSmall = 64;
const wLarge = 200;

export const Navbar: React.FC<Props> = ({ noPadding = false, children }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")[0];
  const [navSize, setNavSize] = useState<"small" | "large">("small");
  const [displayValue, setDisplayValue] = useState<"block" | "none">("none");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullscreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <Box w="100vw" h="100vh" position="relative">
      {children}
    </Box>
  );
};
