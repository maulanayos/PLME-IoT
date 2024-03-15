import { Center, Text, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = ({h = "50vh"}) => (
  <Center gap={4} h={h}>
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="sm" />
    <Text>Loading..</Text>
  </Center>
);
