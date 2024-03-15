import {
  SimpleGrid,
  type SimpleGridProps as ChakraSimpleGridProps,
  Stack,
  type StackProps as ChakraStackProps,
} from "@chakra-ui/react";
import {
  Children,
  cloneElement,
  type FC,
  isValidElement,
  type ReactNode,
  useState,
} from "react";
import { useController } from "react-hook-form";

import { type BaseProps, FormControl } from "../FormControl";

/**
 * This component wraps CheckboxControl to build groups of checkboxes.
 * If you need a standalone checkbox please use CheckboxSingleControl
 * @property stackProps Chakra StackProps
 */
export interface CheckboxContainerProps extends BaseProps {
  /**
   * Chakra SimpleGridProps
   */
  simpleGridProps?: ChakraSimpleGridProps;

  /**
   * Chakra StackProps
   */
  stackProps?: ChakraStackProps;

  /**
   * If true, the checkbox will be aligned on the left side
   * @default false
   */
  leftAlign?: boolean;

  /**
   * The CheckboxControl components to be rendered in this stack (required)
   */
  children: ReactNode;
}

export const FormElementCheckboxContainer: FC<CheckboxContainerProps> = (
  props: CheckboxContainerProps,
) => {
  const {
    name,
    label,
    control,
    children,
    simpleGridProps,
    stackProps,
    leftAlign,
    size,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState(field.value || []);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        checkboxValue: value,
        setCheckboxValue: setValue,
        control,
      } as any);
    }
    return child;
  });

  const StackOrSimpleGrids = simpleGridProps ? SimpleGrid : Stack;

  return (
    <FormControl name={name} label={label} size={size} control={control} {...rest}>
      <StackOrSimpleGrids
        paddingLeft={leftAlign ? 0 : 3}
        marginTop={1}
        spacing={1}
        {...simpleGridProps}
        {...stackProps}
      >
        {childrenWithProps}
      </StackOrSimpleGrids>
    </FormControl>
  );
};
