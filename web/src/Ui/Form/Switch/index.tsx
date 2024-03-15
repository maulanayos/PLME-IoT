import { Flex, Switch, type SwitchProps } from "@chakra-ui/react";
import { type FC } from "react";
import { get, useController } from "react-hook-form";

import { type BaseProps, FormControl } from "../FormControl";

export interface SwitchControlProps extends BaseProps {
  /**
   * Chakra SwitchProps
   */
  switchProps?: SwitchProps;
}

export const FormElementSwitchControl: FC<SwitchControlProps> = (
  props: SwitchControlProps,
) => {
  const { id, name, control, label, switchProps, size, colorScheme, ...rest } = props;
  const {
    field,
    fieldState: { isTouched },
    formState: { isSubmitting, errors },
  } = useController({
    name,
    control,
  });
  const error = get(errors, name, "");

  return (
    <FormControl
      name={name}
      control={control}
      label={label}
      as={Flex}
      alignItems="center"
      id={id}
      size={size}
      colorScheme={colorScheme}
      {...rest}
    >
      <Switch
        {...field}
        id={id}
        size={size}
        isInvalid={!!error && isTouched}
        isChecked={field.value}
        isDisabled={isSubmitting}
        colorScheme={colorScheme}
        {...switchProps}
      />
    </FormControl>
  );
};
