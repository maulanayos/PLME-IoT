import { Select, type SelectProps } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { useController } from "react-hook-form";

import { type BaseProps, FormControl } from "../FormControl";

export interface SelectControlProps extends BaseProps {
  selectProps?: SelectProps;
  placeholder?: string;
  children: ReactNode;
}

export const FormElementSelect: React.FC<SelectControlProps> = (props) => {
  const { id, name, control, selectProps, children, defaultValue, size, placeholder, ...rest } = props;
  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ?? props?.selectProps?.defaultValue,
  });

  return (
    <FormControl name={name} size={size} id={id} control={control} {...rest}>
      <Select placeholder={placeholder} {...field} id={id} isDisabled={isSubmitting} size={size} {...selectProps}>
        {/* https://github.com/chakra-ui/chakra-ui/issues/5863 */}
        {/* <option selected hidden disabled value="">
          {"" || selectProps?.placeholder}
        </option> */}

        {children}
      </Select>
    </FormControl>
  );
};
