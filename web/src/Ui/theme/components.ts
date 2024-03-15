import { type StyleFunctionProps } from "@chakra-ui/styled-system";
import { transparentize } from "color2k";
import { generateColorSwatches } from "./colors";
import { contrastMaker } from "./utils";

// belum jalan
const Breadcrumb = {
  variants: {
    custom: {
      link: {
        color: "primary.500",
        _active: {
          color: "gray.700",
        },
        _disabled: {
          color: "gray.200",
          cursor: "not-allowed",
        },
      },
    },
  },
  defaultProps: {
    variant: "custom",
  },
};

const Switch = {
  baseStyle: {
    track: {
      borderRadius: "full",
      transition: "all 0.2s ease-in-out",
    },
    thumb: {
      borderRadius: "full",
      transition: "all 0.2s ease-in-out",
    },
  },
  variants: {
    animated: {
      track: {
        bg: "gray.300",
        transition: "0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        _checked: {
          bg: "primary.500",
        },
        _disabled: {
          bg: "gray.200",
        },
      },
      thumb: {
        bg: "white",
        transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        _checked: {
          bg: "white",
          transform: "translateX(90%)",
        },
        _unchecked: {
          transform: "translateX(0%)",
        },

        _disabled: {
          bg: "gray.300",
        },
      },
    },
  },
  defaultProps: {},
};

const Input = {
  variants: {
    custom: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        field: {
          borderRadius: "md",
          border: props.type === "file" ? "2px dashed" : "2px",
          px: props.type === "file" ? 3 : 2,
          py: props.type === "file" ? 3 : 1.5,
          // size: "sm",
          transition: "all 0.2s ease-in-out",
          borderColor: "gray.200",

          _invalid: {
            borderColor: "error.500",
          },
          _disabled: {
            opacity: 0.4,
            cursor: "not-allowed",
            _hover: {
              borderColor: "gray.300",
            },
          },
          _hover: {
            borderColor: c["400"],
          },
          _focus: {
            borderColor: c["500"],
          },
        },
      };
    },
  },
  defaultProps: {
    variant: "custom",
    colorScheme: "primary",
  },
};

const Textarea = {
  variants: {
    custom: {
      fontSize: "sm",
      borderRadius: "md",
      border: "2px",
      borderColor: "gray.200",
      transition: "all 0.2s ease-in-out",
      _invalid: {
        borderColor: "error.500",
      },
      _hover: {
        border: "2px",
        borderColor: "primary.400",
      },
      _focus: {
        borderColor: "primary.500",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        _hover: {
          borderColor: "gray.300",
        },
      },
    },
  },
  defaultProps: {
    variant: "custom",
  },
};

const Select = {
  variants: {
    custom: {
      field: {
        fontSize: "xs",
        borderRadius: "md",
        border: "2px",
        borderColor: "gray.200",
        transition: "all 0.2s ease-in-out",
        _invalid: {
          borderColor: "error.500",
        },
        _hover: {
          border: "2px",
          borderColor: "primary.400",
        },
        _focus: {
          borderColor: "primary.500",
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
          _hover: {
            borderColor: "gray.300",
          },
        },
      },
    },
  },
  defaultProps: {
    variant: "custom",
  },
};

const Text = {
  variants: {
    title: {
      fontSize: "md",
      color: "blackAlpha.900",
    },
    subtitle: {
      fontSize: "sm",
      color: "blackAlpha.800",
    },
    body: {
      fontSize: "xs",
      color: "blackAlpha.700",
    },
    caption: {
      fontSize: "xxs",
      color: "blackAlpha.600",
    },
  },
};

const Alert = {
  baseStyle: (props: StyleFunctionProps) => {
    return {
      container: {
        rounded: "md",
        bg: `${props.status}.100`,
        px: "4",
        py: "3",
      },
      title: {
        fontWeight: "bold",
        lineHeight: "5",
        marginEnd: "2",
      },
      description: {
        lineHeight: "5",
      },
      icon: {
        color: `${props.status}.500`,
        flexShrink: 0,
        marginEnd: "2",
        w: "5",
        h: "5",
      },
      spinner: {
        color: `${props.status}.500`,
        flexShrink: 0,
        marginEnd: "2",
        w: "5",
        h: "5",
      },
    };
  },
  defaultProps: {
    status: "info",
  },
};

const Tag = {
  defaultProps: {
    variant: "subtle",
    colorScheme: "primary",
  },
};

const Button = {
  baseStyle: {
    rounded: "md",
    _hover: {
      transform: "scale(0.98)",
      transition: "all 0.2s ease-in-out",
    },
    _active: {
      transform: "scale(0.98)",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease-in-out",
    },
    _focus: {
      transform: "scale(0.96)",
      outline: "2px solid",
      outlineOffset: "1.6px",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      _hover: {
        transform: "none",
        boxShadow: "none",
      },
    },
  },
  variants: {
    solid: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        color: contrastMaker(c["500"]),
        backgroundColor: c["500"],
        _disabled: {
          _hover: {
            backgroundColor: c["500"],
          },
        },
        _hover: {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: c["700"],
        },
        _active: {
          backgroundColor: c["500"],
        },
        _focus: {
          outlineColor: c["500"],
          _hover: {
            backgroundColor: c["500"],
          },
        },
      };
    },
    outline: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      const hoverColor = transparentize(c["500"], 0.85);
      return {
        color: c["500"],
        backgroundColor: "transparent",
        border: "1px",
        borderColor: c["500"],
        _focus: {
          outlineColor: c["500"],
        },
        _hover: {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: hoverColor,
        },
        _active: {
          backgroundColor: hoverColor,
        },
      };
    },
    ghost: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        color: c["500"],
        backgroundColor: "transparent",
        _disabled: {
          _hover: {
            border: "transparent",
          },
        },
        _hover: { backgroundColor: transparentize(c["500"], 0.85) },
        _active: {
          backgroundColor: c["500"],
        },
        _focus: {
          color: contrastMaker(c["500"]),
          backgroundColor: c["500"],
          outlineColor: c["500"],
        },
      };
    },
    menu: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        gap: "2",
        color: contrastMaker(c["500"]),
        backgroundColor: c["500"],
        _disabled: {
          _hover: {
            color: c["500"],
          },
        },
        _hover: {
          color: contrastMaker(c["700"]),
          backgroundColor: c["700"],
        },
        _active: {
          color: "white",
          backgroundColor: c["500"],
        },
        _focus: {
          color: contrastMaker(c["500"]),
          backgroundColor: c["500"],
          outlineColor: "transparent",
          outline: c["500"],
          outlineOffset: "none",
        },
      };
    },
    link: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        color: c["500"],
        backgroundColor: "transparent",
        textDecoration: "underline",
        _disabled: {
          _hover: {
            color: c["500"],
          },
        },
        _hover: {
          transform: "none",
          color: c["700"],
          backgroundColor: "transparent",
        },
        _active: "none",
        _focus: {
          transform: "none",
          outline: "none",
          outlineOffset: "none",
        },
      };
    },

    navigation: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        color: c["500"],
        backgroundColor: "transparent",
        justifyContent: "flex-start",
        _disabled: {
          _hover: {
            border: "transparent",
          },
        },
        _hover: {
          bg: props.theme.colors.primary["600"],
        },
        _active: {
          bg: props.theme.colors.primary["500"],
        },
        _focus: {
          boxShadow: "none",
        },
      };
    },
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "primary",
  },
};

const Checkbox = {
  baseStyle: {
    control: {
      borderRadius: "md",
      // add animation  animation: checkmark var(--animation-input, 0.2s) ease-in-out;
      // background-image: linear-gradient(-45deg, transparent 65%, hsl(var(--chkbg)) 65.99%), linear-gradient(45deg, transparent 75%, hsl(var(--chkbg)) 75.99%), linear-gradient(-45deg, hsl(var(--chkbg)) 40%, transparent 40.99%), linear-gradient(45deg, hsl(var(--chkbg)) 30%, hsl(var(--chkfg)) 30.99%, hsl(var(--chkfg)) 40%, transparent 40.99%), linear-gradient(-45deg, hsl(var(--chkfg)) 50%, hsl(var(--chkbg)) 50.99%);
    },
  },
};

const Form = {
  baseStyle: {
    rounded: "md",
    _hover: {
      transform: "scale(0.98)",
      transition: "all 0.2s ease-in-out",
    },
    _active: {
      transform: "scale(0.98)",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease-in-out",
    },
    _focus: {
      transform: "scale(0.96)",
      outline: "2px solid",
      outlineOffset: "1.6px",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      _hover: {
        transform: "none",
        boxShadow: "none",
      },
    },
  },
  variants: {
    floating: (props: StyleFunctionProps) => {
      const c = mainColor(props);
      return {
        container: {
          _focusWithin: {
            label: {
              transform: "scale(0.85) translateY(-16px)",
            },
          },
          "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label, .react-date-picker + label, .chakra-react-select--has-value + label":
            {
              transform: "scale(0.85) translateY(-16px)",
            },
          label: {
            top: 0,
            left: 0,
            zIndex: 0, // atur z index kalau tabrakan
            position: "absolute",
            backgroundColor: "white",
            pointerEvents: "none",
            mx: 2,
            px: 1,
            my: 1.5,
            transformOrigin: "left top",
            color: "gray",
            fontSize: "xs",
          },
        },
      };
    },
  },
  defaultProps: {
    variant: "floating",
  },
};

const components = {
  Button,
  Breadcrumb,
  Input,
  Tag,
  Textarea,
  Text,
  Checkbox,
  Alert,
  Switch,
  Select,
  Form,
};

export default components;

const mainColor = (props: StyleFunctionProps) => {
  const c = props.colorScheme;
  const isHex = /^#[0-9A-F]{6}$/i.test(c);
  let color;
  if (isHex) {
    color = generateColorSwatches(c);
  } else {
    color = props.theme.colors[c];
  }
  return color;
};
