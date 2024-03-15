import {
  Text,
  Box,
  Center,
  Grid,
  Stack,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useCallback, type FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { FormControl, type BaseProps } from "../FormControl";
import React from "react";
import { useDropzone } from "react-dropzone";
import FileBox from "./FileBox";
import { env } from "~/env";

interface FormElementFileProps extends BaseProps {
  placeholder?: string;
  [key: string]: unknown;
}

export const FormElementFile: FC<FormElementFileProps> = (props) => {
  const {
    name,
    control,
    label,
    size = "sm",
    fontSize = "sm",
    allowDocument = false,
    allowImage = false,
    ...rest
  } = props;

  const acceptedType: {
    [key: string]: string[];
  } = {};
  if (allowImage) {
    acceptedType["image/*"] = [".png", ".jpg", ".jpeg", ".webp"];
  }
  if (allowDocument) {
    acceptedType["application/*"] = [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".zip",
      ".rar",
    ];
    acceptedType["text/*"] = [".txt", ".csv"];
  }

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
        minH="80px"
        bg={isDragActive ? activeBg : "transparent"}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s"
        borderRadius={4}
        position="relative"
        border="2px dashed"
        borderColor={borderColor}
        {...getRootProps()}
      >
        <Stack p={4} minH="80px" h="full" justifyContent="center">
          {value.length === 0 && !file ? (
            <Center h="full">
              <Text fontSize={size} fontWeight="light" color="gray.500">
                Belum ada file dipilih
              </Text>
            </Center>
          ) : (
            <Grid
              templateColumns="repeat(auto-fill, minmax(5rem, 1fr))"
              gap={{ base: 2, md: 4 }}
            >
              {/* Not Uploaded */}
              {file && <FileBox type={file?.type} url={file.url} />}

              {/* Uploaded */}
              {!file && typeof value === "string" && (
                <FileBox
                  type={urlToType(value)}
                  url={`${env.NEXT_PUBLIC_PB_URL}/api/files/${collectionId}/${id}/${value}`}
                />
              )}
            </Grid>
          )}
        </Stack>

        <input {...getInputProps()} />
        <FormLabel>{label}</FormLabel>
      </Box>
    </FormControl>
  );
};

const getExtension = (filename: string) => {
  const parts = filename.split(".");
  return parts.at(-1);
};

const urlToType = (url: string) => {
  const extension = getExtension(url);
  if (
    extension === "png" ||
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "webp"
  ) {
    return "image";
  }
  return "document";
};

interface FileContent {
  type: string;
  url: string;
}

const toBase64 = (file: File) =>
  new Promise<FileContent>((resolve) => {
    const type = urlToType(file.name);
    if (type === "document") {
      resolve({ type: "document", url: file.name } as FileContent);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file); // convert the image to base64 format
      reader.onload = () =>
        resolve({
          type: "image",
          url: reader.result as string,
        } as FileContent);
    }
  });
