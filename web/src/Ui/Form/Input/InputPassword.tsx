import { Icon, IconButton, InputRightAddon, InputRightElement } from "@chakra-ui/react";
import { type FC, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FormElementInput, type FormElementInputProps } from "./InputText";

export const FormElementPassword: FC<FormElementInputProps> = (props) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const { inputProps, size, ...restProps } = props;

  const addonHeight = (size: string) => {
    const height = {
      xs: "24px",
      sm: "32px",
      md: "40px",
      lg: "48px",
    };
    if (size === "") return "32px";
    return height[size as keyof typeof height];
  };

  return (
    <FormElementInput
      size={size}
      inputProps={{
        type: show ? "text" : "password",
        autoComplete: props.inputProps?.autoComplete ? props.inputProps?.autoComplete : "off",
        ...inputProps,
      }}
      rightElement={
        <InputRightElement
          roundedRight="md"
          variant="ghost"
          as={IconButton}
          colorScheme="secondary"
          icon={<Icon as={show ? AiOutlineEye : AiOutlineEyeInvisible} />}
          aria-label="Show password"
          onClick={handleClick}
          h={addonHeight(size as string)}
          _focus={{ outline: "none"}}
        />
      }
      {...restProps}
    />
  );
};
