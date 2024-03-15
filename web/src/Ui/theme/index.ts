import { extendTheme } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import colors from "./colors";
import components from "./components";
import config from "./config";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

export const theme = extendTheme(
  {
    config,
    colors,
    breakpoints,
    components,
  },
  withProse()
);
