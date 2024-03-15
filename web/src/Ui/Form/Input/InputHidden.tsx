import { Box, Input } from "@chakra-ui/react";
import { type FC } from "react";
import { useController } from "react-hook-form";

import { type FormElementInputProps } from "./InputText";

type FormElementInputPropsHidden = Pick<FormElementInputProps, "name" | "control"> & {
  defaultValue?: unknown;
};

export const FormElementHidden: FC<FormElementInputPropsHidden> = (props) => {
  const { name, defaultValue, control } = props;

  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  const isProduction = process.env.NODE_ENV === "production";

  const isDebug = false;

  const isHide = isProduction || !isDebug;

  return (
    <Box display={isProduction ? "none" : isDebug ? "block" : "none"}>
      <Input type={isHide ? "hidden" : "text"} display={isHide ? "none" : "block"} isReadOnly {...field} />
    </Box>
  );
};
