"use client";

import { Button, Center, Container, Text, VStack } from "@chakra-ui/react";
import Logo from "../Ui/Logo";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container
      as="section"
      minW="100dvw"
      minH="100dvh"
      sx={{
        backgroundColor: "#fff1ed",
        opacity: 1,
        backgroundImage:
          "linear-gradient(#dbb2a4 1.1px, transparent 1.1px), linear-gradient(to right, #dbb2a4 1.1px, #fff1ed 1.1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <Center h="80vh">
        <VStack textAlign={"center"} spacing={4}>
          <Text
            fontSize="8xl"
            color="red.500"
            fontWeight="bold"
            letterSpacing={-14}
          >
            5😔😔!
          </Text>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="red.500"
            as="mark"
          >
            Maaf, terjadi kesalahan internal.
          </Text>
          <Text fontSize="xl" color="gray.600">
            Silakan coba lagi nanti.
          </Text>
          <Button
            colorScheme="red"
            mt={4}
            onClick={() => reset()}
            sx={{
              backgroundColor: "red.500 !important",
              "&:hover": {
                bg: "red.700 !important",
              },
            }}
          >
            Kembali ke Halaman Utama
          </Button>
          <VStack position="fixed" bottom="8">
            <Text
              userSelect="none"
              color="blackAlpha.600"
              fontSize={["xs", "sm"]}
            >
              Copyright © 2023
            </Text>
            <Logo size="md" />
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
}
