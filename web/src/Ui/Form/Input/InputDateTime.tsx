import { FC } from "react";
import { FormElementInput, type FormElementInputProps } from "./InputText";

export const FormElementDate: FC<FormElementInputProps> = (props) => {
  const { inputProps, size, ...restProps } = props;

  return (
    <FormElementInput
      size={size}
      type="date"
      inputProps={{
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
          e.currentTarget.showPicker();
        },
      }}
      {...restProps}
    />
  );
};

export const FormElementDateTime: FC<FormElementInputProps> = (props) => {
  const { inputProps, size, ...restProps } = props;

  return (
    <FormElementInput
      size={size}
      type="datetime-local"
      inputProps={{
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
          e.currentTarget.showPicker();
        },
      }}
      {...restProps}
    />
  );
};

export const FormElementTime: FC<FormElementInputProps> = (props) => {
  const { inputProps, size, ...restProps } = props;

  return (
    <FormElementInput
      size={size}
      type="time"
      inputProps={{
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
          e.currentTarget.showPicker();
        },
      }}
      {...restProps}
    />
  );
};

export const FormElementMonth: FC<FormElementInputProps> = (props) => {
  const { inputProps, size, max, ...restProps } = props;

  return (
    <FormElementInput
      size={size}
      type="month"
      max={max}
      inputProps={{
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
          e.currentTarget.showPicker();
        },
      }}
      {...restProps}
    />
  );
};


