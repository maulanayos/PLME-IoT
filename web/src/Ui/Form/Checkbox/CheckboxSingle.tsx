import {
  Checkbox,
  type CheckboxProps as ChakraCheckboxProps,
} from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";
import { get, useController } from "react-hook-form";

import { type BaseProps, FormControl } from "../FormControl";

export interface CheckboxSingleProps extends BaseProps {
  /**
   * Chakra CheckboxProps
   */
  checkBoxProps?: ChakraCheckboxProps;
  children?: ReactNode;
}

export const FormElementCheckboxSingle: FC<CheckboxSingleProps> = (
  props: CheckboxSingleProps,
) => {
  const { id, name, control, label, children, checkBoxProps, size, ...rest } = props;
  const {
    field,
    fieldState: { isTouched },
    formState: { errors, isSubmitting },
  } = useController({ name, control });
  const error = get(errors, name, "");

  const isChecked = field.value;

  return (
    <FormControl name={name} control={control} id={id} size={size} {...rest}>
      <Checkbox
        {...field}
        id={id}
        size={size}
        isInvalid={!!error && isTouched}
        isChecked={isChecked}
        isDisabled={isSubmitting}
        {...checkBoxProps}
      >
        {label}
        {children}
      </Checkbox>
    </FormControl>
  );
};
