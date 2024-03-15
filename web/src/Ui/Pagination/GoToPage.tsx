import {
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { PagingInfo } from "./types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface GoToPageProps {
  paging: PagingInfo;
}

const GoToPage = ({ paging }: GoToPageProps) => {
  const [pageInput, setPageInput] = useState(paging.page);
  const [isMobile] = useMediaQuery("(max-width: 740px)");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageInput.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <HStack
      display={isMobile ? "none" : "flex"}
      direction="row"
      alignItems="center"
    >
      <Text flexShrink="0" fontSize="sm">
        Go to page:
      </Text>
      <NumberInput
        bg="white"
        ml={2}
        w={16}
        min={1}
        max={paging.maxPage}
        onChange={(value: string) => {
          setPageInput(Number(value));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlePageChange();
          }
        }}
        size="xs"
        defaultValue={pageInput}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button colorScheme="primary" ml={2} size="xs" onClick={handlePageChange}>
        Go
      </Button>
    </HStack>
  );
};

export default GoToPage;
