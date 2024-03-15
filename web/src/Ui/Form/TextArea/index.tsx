import { Textarea, type TextareaProps } from "@chakra-ui/react";
import { type FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { FormControl, type BaseProps } from "../FormControl";

export interface FormElementTextAreaProps extends BaseProps {
  inputProps?: TextareaProps;
  [key: string]: any;
}

export const FormElementTextArea: FC<FormElementTextAreaProps> = (props) => {
  const { id, name, control, label, inputProps, size, ...rest } = props;

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
    <FormControl
      name={name}
      control={control}
      label={label}
      size={size}
      id={id}
      {...rest}
    >
      <Textarea
        value={valueUseWatch}
        {...restField}
        id={id}
        isDisabled={isSubmitting}
        {...inputProps}
      />
    </FormControl>
  );
};
