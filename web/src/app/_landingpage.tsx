"use client";

import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { MdLogin, MdLogout, MdOutlineDashboard } from "react-icons/md";
import Logo from "~/Ui/Logo";
import { loggedUser, pb } from "~/lib/pocketbase";

export const LandingPage = () => {
  return (
    <Center>
      <VStack
        w="100dvw"
        sx={{
          backgroundColor: "#ffffff",
          opacity: 1,
          backgroundImage:
            "linear-gradient(#ececec 1.9px, transparent 1.9px), linear-gradient(to right, #ececec 1.9px, #ffffff 1.9px)",
          backgroundSize: "38px 38px",
        }}
      >
        <HeroSection />
        <VStack
          roundedTop={{ base: 40, lg: 80 }}
          color="white"
          fontSize="sm"
          gap={20}
          bgGradient="linear(to-b, #1A365D, #0D1F3C)"
          py={20}
          w="full"
          h="fit-content"
          justifyContent="space-between"
        >
          <KontributorSection />
          <DidukungOlehSection />
          <FootNote />
        </VStack>
      </VStack>
    </Center>
  );
};

const HeroSection = () => {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const user = loggedUser();
    if (user?.id) {
      setHasSession(true);
    }
  }, []);

  return (
    <Stack
      h="100dvh"
      maxW="container.lg"
      p={{ base: 4, lg: 10 }}
      sx={{
        backgroundColor: "#blue.100",
        opacity: 1,
      }}
    >
      <HStack>
        <Stack p={2} w="fit-content">
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              size="sm"
              colorScheme="primary"
            />
            <MenuList w="50%">
              {hasSession ? (
                <>
                  <MenuItem
                    icon={<MdOutlineDashboard />}
                    as={NextLink}
                    href="/dashboard"
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    icon={<MdLogout />}
                    _hover={{ bg: "red.500", color: "white" }}
                    onClick={() => {
                      pb.authStore.clear()
                      window.open("/login", "_self")
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={NextLink} href="/login" icon={<MdLogin />}>
                    Login
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Stack>
        <Logo size="lg" tagSize="sm" color="primary.700" />
      </HStack>
      <Center h="full" pb={10}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} px={4}>
          <Image
            src={`/hero-image.jpeg`}
            alt="Hero Image by https://www.instagram.com/timetotin/"
            boxSize={{ base: "70%", md: "40%" }}
            objectFit={"cover"}
            blendMode={"multiply"}
          />
          <Stack gap={4}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              color="primary.700"
              fontWeight="semibold"
              lineHeight={1.2}
              as="h1"
            >
              Jelajahi kekayaan rasa
              <br />
              dan warisan pangan Indonesia,
              <br />
              hulu ke hilir.
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="blackAlpha.800"
              as="h2"
            >
              Selamat datang di Please Let Me Eat: pangkalan data
              tentang sistem pangan lokal di Indonesia. Temukan tentang ragam
              sumber, juga budaya dalam produksi, panen, pengolahan,
              penyimpanan, penyajian, hingga sejarah, ritual, serta kebijakan
              terkait pangan dari berbagai penjuru negeri.
            </Text>
            <Button
              colorScheme="primary"
              size="sm"
              w="fit-content"
              rightIcon={<ArrowForwardIcon />}
              href="/map"
              as="a"
            >
              Explore Sekarang
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Stack>
  );
};

const KontributorSection = () => {
  return (
    <VStack w="full" spacing={4} maxW="container.lg">
      <Text fontSize="lg" fontWeight="semibold">
        Inisiator
      </Text>
      <Wrap w="fit-content" justify="center" spacingX={4} spacingY={2}>
        {kontributor.map((item) => (
          <Box p={1} key={item.nama} bg="whiteAlpha.100" rounded="md">
            <Text>{item.nama}</Text>
          </Box>
        ))}
      </Wrap>
    </VStack>
  );
};

const DidukungOlehSection = () => {
  return (
    <VStack w="full" spacing={4} maxW="container.lg">
      <Text fontSize="lg" fontWeight="semibold">
        Didukung Oleh
      </Text>
      <Wrap w="fit-content" justify="center" spacing={4}>
        {didukungOleh.map((item) => (
          <Stack
            target="_blank"
            key={item.nama}
            href={item.link}
            as="a"
            bg="white"
            rounded="md"
            p={2}
            transition={"all 0.2s ease-in-out"}
            _hover={{ shadow: "lg", transform: "scale(1.05)" }}
          >
            <Image
              src={item.logo}
              alt={item.nama}
              h={{ base: 16, md: 24 }}
              maxW={40}
              objectFit="contain"
            />
          </Stack>
        ))}
      </Wrap>
    </VStack>
  );
};

const FootNote = () => {
  return (
    <VStack gap={8}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={2}
        p={2}
        bg="blue.500"
        rounded="lg"
        mx={4}
      >
        <Text textAlign={{ base: "center", md: "left" }}>
          👀 Kami mengundang Anda untuk berkontribusi melengkapi pangkalan data
          ini.
        </Text>
        <Button
          colorScheme="white"
          size="sm"
          variant="link"
          href="mailto:nusagastromap@gmail.com?subject=Gabung%20Menjadi%20Kontributor%20Nusagastromap&body=Halo%20Admin,%0D%0A%0D%0ASaya%20tertarik%20menjadi%20kontributor%20data%20di%20Nusagastromap.org"
          as="a"
        >
          Gabung
        </Button>
      </Stack>
      <Text color="whiteAlpha.700" textAlign="center">
        © 2023 Please Let Me Eat. All rights reserved.
        <br />
        Hero Image by Siew Tin
      </Text>
    </VStack>
  );
};

// Buat data kontributor nama-nama orangnya
const kontributor = [
  {
    nama: "Ahmad Arif",
  },
  {
    nama: "Said Abdullah",
  },
  {
    nama: "Puji Sumedia Hanggarwati",
  },
  {
    nama: "Mulia Nurhasan",
  },
];

const didukungOleh = [
  {
    nama: "Koalisi Rakyat untuk Kedaulatan Pangan",
    logo: `/krkp.png`,
    link: "https://kedaulatanpangan.org/",
  },
  {
    nama: "Kehati",
    logo: `/kehati.jpg`,
    link: "https://kehati.or.id/",
  },
  {
    nama: "Ekorantt",
    logo: `/ekorantt.png`,
    link: "https://ekorantt.com/",
  },
  {
    nama: "CIFOR-ICRAF",
    logo: `/CIFOR-ICRAF-logo.svg`,
    link: "https://www.cifor-icraf.org/id/",
  },
];
