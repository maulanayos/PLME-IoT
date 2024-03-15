import { forwardRef, TableCellProps, Td as ChakraTd } from "@chakra-ui/react";

export const Td = forwardRef<TableCellProps, "td">((props, ref) => (
  <ChakraTd
    py={2}
    fontSize={"xs"}
    color="blackAlpha.800"
    border="1px"
    borderColor="gray.200"
    ref={ref}
    {...props}
  />
));

export const TdLeft = forwardRef<TableCellProps, "td">((props, ref) => (
  <Td borderLeft="1px" borderLeftColor="gray.200" ref={ref} {...props} />
));

export const TdRight = forwardRef<TableCellProps, "td">((props, ref) => (
  <Td
    isNumeric
    borderRight="1px"
    borderRightColor="gray.200"
    ref={ref}
    {...props}
  />
));
