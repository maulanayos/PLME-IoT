import chroma from "chroma-js";
import { darken, hasBadContrast, lighten, transparentize } from "color2k";

const theme = {
  primary: "#3182CE",
  secondary: "#276749",
  accent: "#E53E3E",
  neutral: "#EDF2F7",
  base: "#F7FAFC",
  info: "#00B5D8",
  success: "#1AB562",
  warning: "#F3AE24",
  error: "#F04848",
  white: "#FFFFFF",
  black: "#000000",
};


export function generateColorSwatches(hexColor: string) {
  const color = hexColor.toLowerCase();
  const content = hasBadContrast(color, "decorative", "white")
    ? "black"
    : "white";

  const swatches = {
    50: lighten(color, 0.5),
    100: lighten(color, 0.35),
    200: lighten(color, 0.2),
    300: lighten(color, 0.1),
    400: lighten(color, 0.05),
    500: color,
    600: darken(color, 0.05),
    700: darken(color, 0.1),
    800: darken(color, 0.15),
    900: darken(color, 0.2),
    content,
    hover: transparentize(color, 0.9),
  };

  if (swatches[400] === swatches[500]) {
    swatches[400] = chroma(swatches[500]).alpha(0.8).css();
  }
  if (swatches[300] === swatches[500]) {
    swatches[300] = chroma(swatches[500]).alpha(0.6).css();
  }
  if (swatches[200] === swatches[500]) {
    swatches[200] = chroma(swatches[500]).alpha(0.4).css();
  }
  if (swatches[100] === swatches[500]) {
    swatches[100] = chroma(swatches[500]).alpha(0.2).css();
  }

  return swatches;
}

const colors = {
  primary: generateColorSwatches(theme.primary),
  secondary: generateColorSwatches(theme.secondary),
  accent: generateColorSwatches(theme.accent),
  neutral: generateColorSwatches(theme.neutral),
  base: generateColorSwatches(theme.base),
  info: generateColorSwatches(theme.info),
  success: generateColorSwatches(theme.success),
  warning: generateColorSwatches(theme.warning),
  error: generateColorSwatches(theme.error),
  white: generateColorSwatches(theme.white),
  black: generateColorSwatches(theme.black),
};

export default colors;
