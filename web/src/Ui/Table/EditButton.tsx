import { EditIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, forwardRef } from "@chakra-ui/react";

export const EditButton = forwardRef<ButtonProps, "div">((props, ref) => {
  return (
    <Button
      fontSize="xs"
      size="xs"
      leftIcon={<EditIcon height="12px" width="12px" />}
      colorScheme="secondary"
      ref={ref}
      {...props}
    >
      Edit
    </Button>
  );
});
