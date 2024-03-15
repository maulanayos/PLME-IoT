import {
  Text,
  Box,
  Center,
  Grid,
  Stack,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useCallback, useMemo, type FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { FormControl, type BaseProps } from "../FormControl";
import React from "react";
import { useDropzone } from "react-dropzone";
import FileBox from "./FileBox";
import { env } from "~/env";
import { FileType } from "./const";

export interface FormElementFileProps extends BaseProps {
  placeholder?: string;
  existingfiles?: string[];
  accept?: FileType[];
  [key: string]: unknown;
}

export const FormElementFiles: FC<FormElementFileProps> = (props) => {
  const {
    name,
    control,
    label,
    size = "sm",
    fontSize = "sm",
    existingfiles = [],
    allowDocument = false,
    allowImage = false,
    accept = [FileType.IMAGE],
    allowMultiple = true,
    maxFiles = 9999,
    ...rest
  } = props;

  const acceptedType = useMemo((): {
    [key: string]: string[];
  } => {
    const fileTypesArray = [
      {
        key: "image",
        value: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      },
      {
        key: "video",
        value: ["video/mp4", "video/quicktime"],
      },
      {
        key: "pdf",
        value: ["application/pdf"],
      },
      {
        key: "excel",
        value: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ],
      },
      {
        key: "csv",
        value: ["text/csv"],
      },
    ];
    return Object.fromEntries(
      accept.flatMap((fileType) => {
        const matchingObject = fileTypesArray.find(
          (obj) => obj.key === fileType
        );
        return matchingObject
          ? matchingObject.value.map((value) => [value, []])
          : [];
      })
    );
  }, [accept]);

  const [id, collectionId] = useWatch({
    control,
    name: ["id", "collectionId"],
  });

  const {
    field: { onChange, value },
  } = useController({ name, control, defaultValue: [] });

  const {
    field: { onChange: onChangeDeleted },
  } = useController({ name: `${name}-`, control });
  const deletedValues = useWatch({
    name: `${name}-`,
    control,
  });

  const [newFile, setNewFile] = React.useState<FileContent[]>([]);
  const [existingFileLength, setExistingFilelength] = React.useState<number>(
    value.length
  );

  const removeFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const index = e.currentTarget.value;

    setNewFile((prev) => {
      const newFiles = [...prev];
      newFiles.splice(Number(index), 1);
      return newFiles;
    });

    onChange(
      [...value].filter(
        (_: string, i: number) => i !== Number(index) + existingFileLength
      )
    );
  };

  const removeExistingFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const index = e.currentTarget.value;
    setExistingFilelength((prev) => prev - 1);
    onChange([...value].filter((_: string, i: number) => i !== Number(index)));
    onChangeDeleted([...deletedValues, value[index]]);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...value, ...acceptedFiles]);
      Promise.all([...acceptedFiles].map((file) => toBase64(file))).then(
        (values) => {
          setNewFile([...newFile, ...values]);
        }
      );
    },
    [newFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedType,
    maxFiles: 10,
    multiple: true,
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
          {value.length === 0 && newFile.length === 0 ? (
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
              {/* Uploaded */}
              {value.map((url: string, index: number) => {
                if (typeof url !== "string") return null;
                return (
                  <FileBox
                    key={`file-${index}`}
                    type={urlToType(url)}
                    url={`${env.NEXT_PUBLIC_PB_URL}/api/files/${collectionId}/${id}/${url}`}
                    index={index}
                    removeFile={removeExistingFile}
                  />
                );
              })}
              {/* Not Uploaded */}
              {newFile.map(({ type, url }, index) => (
                <FileBox
                  key={`file-${index}`}
                  type={type}
                  url={url}
                  index={index}
                  removeFile={removeFile}
                />
              ))}
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
