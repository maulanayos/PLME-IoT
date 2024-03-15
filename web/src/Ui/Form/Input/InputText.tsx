import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  TextareaProps,
  type InputProps,
} from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";
import { useController, useWatch } from "react-hook-form";
import { FormControl, type BaseProps } from "../FormControl";

export interface FormElementInputProps extends BaseProps {
  type?: InputProps["type"];
  inputProps?: InputProps;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  placeholder?: string;
  [key: string]: unknown;
}

export const FormElementInput: FC<FormElementInputProps> = (props) => {
  const {
    id,
    name,
    control,
    label,
    inputProps,
    leftAddon,
    rightAddon,
    leftElement,
    rightElement,
    type = "text",
    size = "sm",
    fontSize = "sm",
    placeholder,
    isDisabled,
    isRequired,
    ...rest
  } = props;

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  const { value: valueUseController, ...restField } = field;

  const valueUseWatch = useWatch({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control} size={size} id={id} {...rest}>
      <InputGroup>
        {leftAddon && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pr={2}
            borderRightRadius="md"
          >
            {leftAddon}
          </Box>
        )}
        {leftElement && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pr={2}
            borderRightRadius="md"
          >
            {leftElement}
          </Box>
        )}
        <Input
          placeholder=" "
          value={valueUseWatch}
          type={type}
          {...restField}
          id={id}
          size={size}
          fontSize="xs"
          isDisabled={isSubmitting || isDisabled}
          {...inputProps}
        />
      <FormLabel>{label}{isRequired && <span style={{ color: "red" }}> *</span>}</FormLabel>
        {rightAddon && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pl={2}
            borderLeftRadius="md"
          >
            {rightAddon}
          </Box>
        )}
        {rightElement && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderLeftRadius="md"
          >
            {rightElement}
          </Box>
        )}
      </InputGroup>
    </FormControl>
  );
};

export interface FormElementTextAreaProps extends BaseProps {
  inputProps?: TextareaProps;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  placeholder?: string;
  [key: string]: unknown;
}

export const FormElementTextArea: FC<FormElementTextAreaProps> = (props) => {
  const {
    inputProps,
    leftAddon,
    rightAddon,
    leftElement,
    rightElement,
    id,
    name,
    control,
    label,
    size,
    placeholder,
    isRequired,
    ...rest
  } = props;

  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  const { value: valueUseController, ...restField } = field;

  const valueUseWatch = useWatch({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control} size={size} id={id} {...rest}>
      <Textarea
        // fontSize={fontSize} ini sementara dibuat xs semua yak
        fontSize="xs"
        placeholder=" "
        value={valueUseWatch}
        {...restField}
        id={id}
        isDisabled={isSubmitting}
        {...inputProps}
      />
      <FormLabel>{label}{isRequired && <span style={{ color: "red" }}> *</span>}</FormLabel>
    </FormControl>
  );
};
