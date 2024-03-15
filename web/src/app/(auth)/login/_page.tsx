"use client";

import {
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import Logo from "~/Ui/Logo";
import { pb } from "~/lib/pocketbase";

export default function Page() {
  const router = useRouter();

  const signInWithOAuth = async (provider: string) => {
    try {
      await pb.collection("users").authWithOAuth2({
        provider,
      })

      router.push("/dashboard");
      toast.success("Login success");
    } catch (e) {
      toast.error("Login failed");
    }
  };

  return (
    <Center
      sx={{
        backgroundColor: "#f4faff",
        opacity: 1,
        backgroundImage:
          "linear-gradient(#ddeaf4 3.6px, transparent 3.6px), linear-gradient(90deg, #ddeaf4 3.6px, transparent 3.6px), linear-gradient(#ddeaf4 1.8px, transparent 1.8px), linear-gradient(90deg, #ddeaf4 1.8px, #f4faff 1.8px)",
        backgroundSize: "90px 90px, 90px 90px, 18px 18px, 18px 18px",
        backgroundPosition:
          "-3.6px -3.6px, -3.6px -3.6px, -1.8px -1.8px, -1.8px -1.8px",
      }}
      h="100dvh"
    >
      <VStack pb={40}>
        <Image
          src="https://cdn3d.iconscout.com/3d/premium/thumb/waving-hand-gesture-6580697-5526763.png"
          w={60}
          h="auto"
          alt="wave"
          mb={-10}
          zIndex={2}
          _hover={{ transform: "scale(1.1)" }}
          transition="all 0.5s ease-in-out"
        />
        <VStack
          bg="white"
          p="8"
          minW={{ base: "340px", md: "400px" }}
          rounded="xl"
          gap={8}
          shadow="lg"
        >
          <Logo size="2xl" />
          <Stack w="full">
            <HStack>
              <Divider borderColor="blue.500" />
              <Text
                as="span"
                textAlign="center"
                fontSize="sm"
                sx={{ whiteSpace: "nowrap" }}
              >
                login dengan
              </Text>
              <Divider borderColor="blue.500" />
            </HStack>

            <Button
              leftIcon={<FaGoogle />}
              w="full"
              variant="outline"
              onClick={() => signInWithOAuth("google")}
            >
              Google Account
            </Button>
          </Stack>
        </VStack>
      </VStack>
    </Center>
  );
}
