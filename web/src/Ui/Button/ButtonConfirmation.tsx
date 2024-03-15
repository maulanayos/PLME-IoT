import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";

interface Props {
  label: string;
  variant?: "ghost" | "solid" | "outline" | "link" | "unstyled";
  labelConfirm?: string;
  size?: "xs" | "sm" | "md" | "lg";
  icon?: React.ReactElement;
  isDisabled?: boolean;
  onClick: () => void;
}

export const ButtonConfirmation = ({
  label,
  variant = "solid",
  labelConfirm = "Are you sure want to delete this item?",
  size = "md",
  icon = <FaTrash />,
  isDisabled = false,
  onClick,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = () => {
    onClick();
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} isLazy placement="top-start">
      <PopoverTrigger>
        <Button
          w="fit-content"
          leftIcon={icon}
          aria-label={label}
          variant={variant}
          colorScheme="red"
          size={size}
          isDisabled={isDisabled}
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="white" fontSize="sm" w="200px" boxShadow="0 0 10px 0 rgba(0,0,0,0.1)">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="semibold">Confirm Delete</PopoverHeader>
        <PopoverBody>
          <Stack gap={4}>
            <Text>{labelConfirm}</Text>
            <Button w="fit-content" size="xs" colorScheme="red" leftIcon={<FaCheck />} onClick={handleConfirm}>
              Yes, Go Ahead
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};