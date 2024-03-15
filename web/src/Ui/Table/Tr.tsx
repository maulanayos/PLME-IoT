import { forwardRef, TableRowProps, Tr as ChakraTr } from "@chakra-ui/react";

export const Tr = forwardRef<TableRowProps, "tr">((props, ref) => (
  <ChakraTr bg="white" ref={ref} {...props} />
));
