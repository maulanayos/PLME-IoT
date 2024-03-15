import { Box, HStack, Icon, Text, Tooltip } from "@chakra-ui/react";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { MdOutlineRemoveCircleOutline, MdOutlineTrendingDown } from "react-icons/md";
import { z } from "zod";

const consumedType = z.string();
type ConsumedType = z.infer<typeof consumedType>;

export const CustomBadge = ({
  data,
  type,
  variant = "simple",
}: {
  data: ConsumedType;
  type: "consume" | "existences";
  variant?: "simple" | "text";
}) => {
  type BadgeConfig = {
    [key in ConsumedType]: {
      bg: string;
      colorIcon: string;
      textColor?: string;
      title: string;
      icon: React.ElementType;
    };
  };

  const badgeConfig: BadgeConfig = {
    yes: {
      bg: "green.50",
      colorIcon: "green.500",
      textColor: "green.600",
      icon: HiOutlineBadgeCheck,
      title: `Masih ${type === "consume" ? "Dikonsumsi" : "Ditemukan"}`,
    },
    no: {
      bg: "gray.50",
      textColor: "gray.600",
      colorIcon: "gray.500",
      icon: MdOutlineRemoveCircleOutline,
      title: `Sudah Tidak ${type === "consume" ? "Dikonsumsi" : "Ditemukan"}`,
    },
    less: {
      bg: "orange.50",
      colorIcon: "orange.500",
      textColor: "orange.600",
      icon: MdOutlineTrendingDown,
      title: `Sudah Berkurang ${
        type === "consume" ? "Dikonsumsi" : "Ditemukan"
      }`,
    },
  };
  const { bg, colorIcon, icon, textColor, title } = badgeConfig[data];

  return (
    <>
      {variant === "simple" ? (
        <Tooltip label={title} placement="top" openDelay={300}>
          <Box mb={-1}>
            <Icon as={icon} color={colorIcon} boxSize={4} />
          </Box>
        </Tooltip>
      ) : (
        <HStack bg={bg} p={1} rounded="md">
          <Icon as={icon} color={colorIcon} boxSize={4} />
          <Text fontSize="xs" color={textColor}>
            {title}
          </Text>
        </HStack>
      )}
    </>
  );
};
