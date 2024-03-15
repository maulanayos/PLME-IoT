import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { PagingInfo } from "./types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PageNumberProps {
  startPage: number;
  endPage: number;
  currentPage: number;
  paging: PagingInfo;
}

export default function PageNumbers({ startPage, endPage, currentPage, paging }: PageNumberProps) {
  const list = paginationGenerator(startPage, endPage, currentPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <HStack justifyContent="center">
      {/* Prev Icon */}
      <IconButton
        icon={<ChevronLeftIcon />}
        size="xs"
        variant="outline"
        aria-label="previous-page"
        isDisabled={!paging?.hasPrev}
        onClick={() => handlePageChange(paging?.page - 1)}
      />

      {/* Number Icon */}
      <Box>
        <HStack>
          {list.map((page: string | number, id: number) => {
            if (typeof page === "number") {
              return (
                <Button
                  bg={currentPage === page ? "primary.500" : "white"}
                  key={`pagination-${id}`}
                  variant="pagination"
                  size="xs"
                  onClick={() => handlePageChange(page)}
                >
                  <Text color={currentPage === page ? "white" : "black"}>{page}</Text>
                </Button>
              );
            }

            return (
              <Button size="xs" key={`pagination-${id}`} variant="pagination" isDisabled>
                {page}
              </Button>
            );
          })}
        </HStack>
      </Box>

      {/* Next Icon */}
      <IconButton
        icon={<ChevronRightIcon />}
        size="xs"
        variant="outline"
        aria-label="next-page"
        isDisabled={!paging?.hasNext}
        onClick={() => handlePageChange(paging?.page + 1)}
      />
    </HStack>
  );
}

function paginationGenerator(start: number, end: number, currentPage: number) {
  const rangeArr = sequenceNumber(start, end);

  // remove last and firts list page
  rangeArr.pop();
  rangeArr.shift();

  const listPages = [];

  const isCloseStart = currentPage <= start + 3;
  const isCloseEnd = currentPage >= end - 3;

  if (end < 9) {
    listPages.push(...sequenceNumber(start, end));
    return listPages;
  }

  if (isCloseStart) {
    listPages.push(...sequenceNumber(1, 5), "...", end);
    return listPages;
  }

  if (isCloseEnd) {
    listPages.push(start, "...", ...sequenceNumber(end - 4, end));
    return listPages;
  }

  listPages.push(start, "...", ...sequenceNumber(currentPage - 1, currentPage + 1), "...", end);
  return listPages;
}

function sequenceNumber(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}
