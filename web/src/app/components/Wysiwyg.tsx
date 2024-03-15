import { Box, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useController } from "react-hook-form";
import { BaseProps, FormControl } from "~/Ui/Form/FormControl";
import { Editor } from "@tinymce/tinymce-react";

interface WysiwygInputProps extends BaseProps {
  label: string;
  [key: string]: unknown;
}

const WysiwygInput: React.FC<WysiwygInputProps> = ({
  id,
  name,
  control,
  label,
  size = "sm",
  height = "270px",
  isRequired = false,
  ...rest
}: WysiwygInputProps) => {
  const editorRef = useRef<any>(null);

  const {
    field: { onChange, value },
  } = useController({
    name: name,
    control: control,
  });

  return (
    <FormControl name={name} control={control} size={size} id={id} {...rest}>
      <Box bg="blackAlpha.200" rounded="lg" pt={1}>
        <Text ml={2} fontSize="xs" my={1}>
          {label}
          {isRequired && <span style={{ color: "red" }}> *</span>}
        </Text>
        <Box zIndex={-1}>
          <Editor
            tinymceScriptSrc={"/tinymce/tinymce.min.js"}
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(data) => onChange(data)}
            value={value}
            init={{
              height: 500,
              menubar: false,
              promotion: false,
              statusbar: false,
              branding: false,
              plugins: [
                "autoresize",
                "autolink",
                "lists",
                "link",
                "image",
                "searchreplace",
                "fullscreen",
                "media",
                "table",
                "code",
                "codesample",
                "directionality",
              ],
              toolbar:
                "styles | alignleft aligncenter alignright | bold italic forecolor backcolor | bullist numlist | link image_picker table codesample direction | code fullscreen",
              // content_style:
              //             "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Box>
      </Box>
    </FormControl>
  );
};

export default WysiwygInput;
