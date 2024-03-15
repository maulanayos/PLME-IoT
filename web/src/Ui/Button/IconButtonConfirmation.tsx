import { IconButton, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

interface Props {
  label: string;
  variant?: "ghost" | "solid" | "outline" | "link" | "unstyled";
  labelConfirm?: string;
  size?: "xs" | "sm" | "md" | "lg";
  icon?: React.ReactElement;
  iconConfirm?: React.ReactElement;
  isDisabled?: boolean;
  onClick: () => void;
}

export const IconButtonConfirmation = ({
  label,
  variant = "solid",
  labelConfirm = "Are you sure?",
  size = "md",
  icon = <FaTrash />,
  iconConfirm = <FaCheck />,
  isDisabled = false,
  onClick,
  ...props
}: Props) => {
  const [confirm, setConfirm] = useState(false);
  let timer: NodeJS.Timeout;

  const handleConfirm = () => {
    if (!confirm) {
      setConfirm(true);
      timer = setTimeout(() => {
        setConfirm(false);
      }, 3000);
    } else {
      onClick();
      setConfirm(false);
      clearTimeout(timer);
    }
  };

  return (
    <Tooltip
      label={confirm ? labelConfirm : label}
      hasArrow
      isDisabled={isDisabled}
      fontSize="12px"
    >
      <IconButton
        icon={confirm ? iconConfirm : icon}
        aria-label={confirm ? labelConfirm : label}
        variant={confirm ? "solid" : variant}
        colorScheme={confirm ? "red" : "orange"}
        onClick={handleConfirm}
        size={size}
        isDisabled={isDisabled}
        {...props}
      />
    </Tooltip>
  );
};
