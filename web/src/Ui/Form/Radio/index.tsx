import {
  RadioGroup,
  type RadioGroupProps,
  Stack,
  type StackProps,
} from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";
import { useController } from "react-hook-form";

import { type BaseProps, FormControl } from "../FormControl";

export interface RadioGroupControlProps extends BaseProps {
  /**
   * Chakra RadioGroupProps
   */
  radioGroupProps?: RadioGroupProps;

  /**
   * Chakra StackProps
   */
  stackProps?: StackProps;

  /**
   * The Radio components to be rendered in this group (required)
   */
  children: ReactNode;
}

export const FormElementRadioGroupControl: FC<RadioGroupControlProps> = (
  props: RadioGroupControlProps,
) => {
  const {
    name,
    control,
    label,
    radioGroupProps,
    stackProps,
    children,
    size,
    ...rest
  } = props;
  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl name={name} control={control} label={label} size={size} {...rest}>
      <RadioGroup {...field} isDisabled={isSubmitting} size={size} {...radioGroupProps} >
        <Stack direction="row" {...stackProps}>
          {children}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};
