import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, HStack, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text } from "@chakra-ui/react";
import { PagingInfo } from "./types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface ShowLimitProps {
  limit: number;
  limitList: number[];
  paging: PagingInfo;
}

export default function ShowLimit({ limit, limitList, paging }: ShowLimitProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLimitChange = (limit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", limit.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <HStack justifyContent="center">
      <Text fontSize="sm">Show</Text>
      <Menu isLazy>
        <MenuButton
          bg="white"
          colorScheme="primary"
          variant="outline"
          fontSize="xs"
          as={Button}
          size="xs"
          rightIcon={<ChevronDownIcon />}
        >
          {limit}
        </MenuButton>

        <MenuList>
          <MenuOptionGroup defaultValue={String(limit)}>
            {limitList.map((limit: number) => {
              return (
                <MenuItemOption
                  key={limit.toString()}
                  value={limit.toString()}
                  fontSize="xs"
                  onClick={() => handleLimitChange(limit)}
                >
                  {limit.toString()}
                </MenuItemOption>
              );
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
}
