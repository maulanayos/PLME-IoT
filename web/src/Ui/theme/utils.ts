import { hasBadContrast } from "color2k";

export const contrastMaker = (input: string) => {
  return hasBadContrast(input, "decorative", "white") ? "black" : "white";
};
