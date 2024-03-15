import { useController } from "react-hook-form";
import { FormControl, type BaseProps } from "../FormControl";
import { Select } from "chakra-react-select";
import { FormLabel, InputProps } from "@chakra-ui/react";

type Size = "sm" | "md" | "lg";

interface FormElementSelect extends BaseProps {
  options: {
    value: string;
    label: string;
    [key: string]: unknown;
  }[];
  placeholder?: string;
  inputProps?: InputProps;
  changeCallback?: (value: string) => void;
}

export const FormElementSelectSingle: React.FC<FormElementSelect> = ({
  id,
  label,
  name,
  control,
  placeholder,
  inputProps,
  options,
  changeCallback = () => {},
  size = "xs",
  isRequired,
  ...rest
}) => {
  const {
    field: { onChange: onChangeController, value },
  } = useController({
    name: name,
    control: control,
  });

  const selectedOption = options.find((option) => option.value === value);

  return (
    <FormControl name={name} control={control} size={size} id={id} {...rest}>
      <Select
        classNamePrefix="chakra-react-select"
        options={options}
        placeholder=" "
        size={size as Size}
        value={selectedOption}
        onChange={(data) => {
          onChangeController(data?.value);
          if (data) {
            changeCallback?.(data?.value);
          }
        }}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            bg: "white",
          }),
        }}
      />
      <FormLabel>{label}{isRequired && <span style={{ color: "red" }}> *</span>}</FormLabel>
    </FormControl>
  );
};

interface FormElementSelectMultiple extends BaseProps {
  options: {
    value: string;
    label: string;
    [key: string]: unknown;
  }[];
  placeholder?: string;
  inputProps?: InputProps;
}

export const FormElementSelectMultiple: React.FC<FormElementSelectMultiple> = ({
  id,
  label,
  name,
  control,
  placeholder,
  inputProps,
  options,
  size = "sm",
  isRequired,
  ...rest
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const selectedOptions = options.filter((option) => value?.includes(option.value));

  return (
    <FormControl name={name} control={control} size={size} id={id} {...rest}>
      <Select
        classNamePrefix="chakra-react-select"
        options={options}
        placeholder=" "
        size={size as Size}
        value={selectedOptions}
        onChange={(data) => onChange(data ? data.map((item) => item.value) : [])}
        isMulti={true}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            bg: "white",
          }),
        }}
      />
      <FormLabel>{label}{isRequired && <span style={{ color: "red" }}> *</span>}</FormLabel>
    </FormControl>
  );
};
