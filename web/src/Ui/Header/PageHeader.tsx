import { Box, Button, Heading, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import type { ReactNode } from "react";
import { MdArrowBackIosNew } from "react-icons/md";

interface HeadingProps {
  title: string;
  subtitle?: string;
  submitForm?: ReactNode;
  useBorderBottom?: boolean;
  backLink?: boolean; // Add a backLink prop to control the back button visibility
}

export const PageHeader = ({ title, subtitle, submitForm, useBorderBottom, backLink }: HeadingProps) => {
  const router = useRouter(); // Initialize the router

  return (
    <Stack borderBottom={useBorderBottom ? "2px" : "0px"} borderBottomColor="gray.300" py="4">
      {backLink && ( // Conditional rendering based on backLink prop
        <Box pb="2">
          <Button
            leftIcon={<Icon as={MdArrowBackIosNew} h={3} w={3} />}
            size="xs"
            variant="outline"
            onClick={() => router.back()} // Use the router to navigate back
          >
            Back
          </Button>
        </Box>
      )}
      <Box position="relative">
        <Heading fontSize="xl" as="h2" textColor="primary.500" fontWeight="bold">
          {title}
        </Heading>
      </Box>

      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <Text
          fontSize="sm"
          textColor="blackAlpha.700"
          sx={{
            textWrap: "balance",
          }}
        >
          {subtitle}
        </Text>

        <Spacer />
        {submitForm}
      </Stack>
    </Stack>
  );
};
