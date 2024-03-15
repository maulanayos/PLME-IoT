"use client";

import {
  Flex,
  forwardRef,
  TableColumnHeaderProps,
  Text,
  Th as ChakraTh,
  Spacer,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface TableColumnHeaderPropsSortable extends TableColumnHeaderProps {
  id: string;
}

export const ThSort = forwardRef<TableColumnHeaderPropsSortable, "th">(
  (props, ref) => {
    const { id, ...rest } = props;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "";

    const handlePageChange = () => {
      const params = new URLSearchParams(searchParams);
      if (currentSort === id) {
        params.set("sort", `-${id}`);
      } else {
        params.set("sort", id);
      }
      router.replace(`${pathname}?${params.toString()}`);
    };

    return (
      <ChakraTh
        py={2}
        fontSize="xs"
        fontWeight="normal"
        textTransform="uppercase"
        border="1px"
        borderColor="gray.200"
        onClick={() => handlePageChange()} cursor="pointer" role='group'
        ref={ref}
        {...props}
      >
        <Flex  >
          {props.children}
          <Spacer />
          {currentSort !== id && currentSort !== `-${id}` && <Text display="none" _groupHover={{display: 'block'}}>↑</Text>}
          {currentSort === id && <Text>↑</Text>}
          {currentSort === `-${id}` && <Text>↓</Text>}
        </Flex>
      </ChakraTh>
    );
  }
);

export const Th = forwardRef<TableColumnHeaderProps, "th">((props, ref) => (
  <ChakraTh
    py={2}
    fontSize="xs"
    fontWeight="normal"
    textTransform="uppercase"
    border="1px"
    borderColor="gray.200"
    ref={ref}
    {...props}
  />
));

export const ThLeft = forwardRef<TableColumnHeaderProps, "th">((props, ref) => (
  <ChakraTh
    fontSize="xs"
    fontWeight="normal"
    textTransform="uppercase"
    border="1px"
    borderColor="gray.200"
    ref={ref}
    {...props}
  />
));

export const ThRight = forwardRef<TableColumnHeaderProps, "th">(
  (props, ref) => (
    <ChakraTh
      px={3}
      textTransform="capitalize"
      borderTop="1px"
      borderTopColor="gray.200"
      borderBottom="1px"
      borderBottomColor="gray.200"
      borderRight="1px"
      borderRightColor="gray.200"
      ref={ref}
      {...props}
    />
  )
);
