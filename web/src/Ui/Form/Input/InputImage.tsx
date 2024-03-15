import {
  Stack,
  FormLabel,
  Box,
  Center,
  Flex,
  GridItem,
  Text,
  Tooltip,
  Image,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, type FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { FormControl, type BaseProps } from "../FormControl";
import React from "react";
import { useDropzone } from "react-dropzone";
import { env } from "~/env";

interface FormElementImageProps extends BaseProps {
  placeholder?: string;
  inputLabel?: string;
  imageHeight?: string;
  [key: string]: unknown;
}

export const FormElementImage: FC<FormElementImageProps> = (props) => {
  const {
    name,
    control,
    label,
    inputLabel = "Pilih foto",
    size = "sm",
    fontSize = "sm",
    imageHeight = "300px",
    ...rest
  } = props;

  const acceptedType = {
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  };

  const [id, collectionId] = useWatch({
    control,
    name: ["id", "collectionId"],
  });

  const {
    field: { onChange, value },
  } = useController({ name, control, defaultValue: "" });

  const [file, setFile] = React.useState<FileContent | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0]);
      toBase64(acceptedFiles[0]).then((value) => {
        setFile(value);
      });
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedType,
    maxFiles: 1,
    multiple: false,
  });

  const activeBg = "gray.50";
  const borderColor = isDragActive ? "primary.500" : "gray.200";

  return (
    <FormControl
      name={name}
      control={control}
      placeholder=" "
      size={size}
      id={name}
      {...rest}
    >
      <Box
        cursor="pointer"
        h={imageHeight}
        bg={isDragActive ? activeBg : "transparent"}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s"
        borderRadius={4}
        position="relative"
        border="2px dashed"
        borderColor={borderColor}
        justifyContent="center"
        {...getRootProps()}
      >
        <Box p={4} h="full">
          {value.length === 0 && !file ? (
            <Center h="full">
              <Text fontSize={size} fontWeight="light" color="gray.500">
                {inputLabel}
              </Text>
            </Center>
          ) : (
            <>
              {/* Not Uploaded */}
              {file && <ImagePreview url={file.url} />}

              {/* Uploaded */}
              {!file && typeof value === "string" && (
                <ImagePreview
                  url={
                    value.startsWith("https://")
                      ? value
                      : `${env.NEXT_PUBLIC_PB_URL}/api/files/${collectionId}/${id}/${value}`
                  }
                />
              )}
            </>
          )}
        </Box>
        <Stack
          p={0}
          gap={0}
          position="absolute"
          bottom="7"
          w="full"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            type="button"
            size="xs"
            sx={{
              backgroundColor: "blue.500 !important",
              "&:hover": {
                bg: "blue.700 !important",
              },
            }}
            variant="solid"
            minW="36"
          >
            {value ? "Update" : "Upload"}
          </Button>
        </Stack>

        <input {...getInputProps()} />
        <FormLabel>{label}</FormLabel>
      </Box>
    </FormControl>
  );
};

interface FileContent {
  type: string;
  url: string;
}

const toBase64 = (file: File) =>
  new Promise<FileContent>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // convert the image to base64 format
    reader.onload = () =>
      resolve({
        type: "image",
        url: reader.result as string,
      } as FileContent);
  });

const ImagePreview = ({ url }: { url: string }) => {
  return (
    <>
      <Box
        bg="gray.100"
        border="1px solid"
        borderColor="gray.200"
        w="100%"
        h="100%"
        position="relative"
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
      </Box>
    </>
  );
};
