import {
  Box,
  type FlexProps,
  FormControl as ChakraFormControl,
  type FormControlProps,
  FormErrorMessage,
  type FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  type FormLabelProps,
  ResponsiveValue,
  type TextProps,
} from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";
import { type Control, get, useController } from "react-hook-form";

export type ChakraFormControlProps = Omit<FormControlProps, "label">;

export interface BaseReactHookFormProps {
  name: string;
  control: Control<any, any>;
  label?: ReactNode;
  labelProps?: FormLabelProps;
  helperText?: ReactNode;
  helperTextProps?: TextProps;
  displayHelperText?: string;
  slim?: boolean;
  errorMessageProps?: FormErrorMessageProps;
  errorMessageContainerProps?: FlexProps;
}

export interface BaseProps extends ChakraFormControlProps, BaseReactHookFormProps {}

export const FormControl: FC<BaseProps> = (props: BaseProps) => {
  const {
    children,
    id,
    name,
    control,
    label,
    labelProps = {
      textColor: "blackAlpha.700",
    },
    helperText,
    helperTextProps = {
      textColor: "blackAlpha.600",
      fontSize: "11px",
    },
    slim,
    errorMessageProps = {
      _invalid: {
        borderColor: "error.200",
      },
    },
    errorMessageContainerProps = {
      textColor: "error.200",
    },
    size,
    displayHelperText,
    ...rest
  } = props;

  const {
    formState: { errors },
  } = useController({ name, control });
  const error = get(errors, name, "") as any;
  const hasError = Boolean(error?.message);

  return (
    <ChakraFormControl isInvalid={hasError} {...rest}>
      {label && typeof label === "string" ? (
        <FormLabel htmlFor={id} fontSize={size} {...labelProps}>
          {label}
        </FormLabel>
      ) : (
        label
      )}
      {children}

      {!slim && (
        <Box display={displayHelperText} minH="4" mt="1" alignItems="end" {...errorMessageContainerProps}>
          <FormErrorMessage my="0" fontSize="10px" lineHeight="10px" {...errorMessageProps}>
            {error.message}
          </FormErrorMessage>
          {!error.message && helperText && typeof helperText === "string" ? (
            <FormHelperText my="0" {...helperTextProps}>
              {helperText}
            </FormHelperText>
          ) : (
            <></>
          )}
        </Box>
      )}
    </ChakraFormControl>
  );
};

const setHelperSize = (size: ResponsiveValue<string> | undefined) => {
  if (!size) return "10px";

  switch (size) {
    case "xs":
      return "xs";
    case "sm":
      return "xs";
    case "md":
      return "sm";
    case "lg":
      return "sm";
    default:
      return "xs";
  }
};
