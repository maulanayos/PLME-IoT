import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  GridItem,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";

interface FileBoxProps {
  index?: number;
  type: string;
  url: string;
  removeFile?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FileBox = ({ index = 0, type, url, removeFile }: FileBoxProps) => {
  const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem h="5.5rem" w="5.5rem">
      {type === "image" ? (
        <>
          <Box
            bg="gray.100"
            border="1px solid"
            borderColor="gray.200"
            w="100%"
            h="100%"
            position="relative"
            onClick={(e) => openModal(e)}
            borderRadius="md"
            _hover={{ cursor: "pointer", shadow: "lg" }}
            transition="0.3s"
          >
            <Image
              w="100%"
              h="100%"
              src={url}
              alt="file"
              borderRadius="md"
              fit="cover"
            />
            {removeFile && (
              <CloseButton index={index} removeFile={removeFile} />
            )}
          </Box>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent bg="white">
              {/* <ModalHeader pb="2" /> */}
              <ModalCloseButton colorScheme="blue" right={1} top={1} />
              <ModalBody py="8" px="7">
                <Image
                  w="100%"
                  h="100%"
                  src={url}
                  alt="file"
                  pointerEvents="none"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <Tooltip hasArrow label={getFileName(url)}>
            <Center
              cursor={removeFile ? "default" : "pointer"}
              borderRadius="md"
              display="flex"
              bg="gray.200"
              p={4}
              justifyContent="center"
              alignItems="center"
              h="100%"
              w="100%"
              position="relative"
              _hover={{ cursor: "pointer", shadow: "lg" }}
              transition="0.3s"
              onClick={(e) => openModal(e)}
            >
              {removeFile && (
                <CloseButton index={index} removeFile={removeFile} />
              )}
              <Stack
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="base" fontWeight={700}>
                  {getExtension(url)}
                </Text>
              </Stack>
            </Center>
          </Tooltip>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent bg="white">
              <ModalCloseButton colorScheme="blue" right={1} top={1} />
              <ModalBody py="8" px="7">
                <iframe
                  src={`${url}#navpanes=0`}
                  width="100%"
                  height="600px"
                ></iframe>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </GridItem>
  );
};

interface CloseButtonProps {
  index: number;
  removeFile: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CloseButton = ({ index, removeFile }: CloseButtonProps) => (
  <IconButton
    icon={<CloseIcon />}
    bgColor="blackAlpha.400"
    color="whiteAlpha.900"
    value={index}
    size="xs"
    position="absolute"
    top={1}
    right={1}
    aria-label="remove file"
    onClick={removeFile}
  />
);

export default FileBox;

const getExtension = (filename: string) => {
  const parts = filename.split(".");
  return parts[parts.length - 1];
};

const getFileName = (filePath: string) => {
  const parts = filePath.split("/");
  return parts[parts.length - 1];
};
