import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export const TableSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", q);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <InputGroup w="full">
      <Input
        size="sm"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search..."
      />
      <InputRightElement w="fit-content" mt={-1}>
        <IconButton
          variant="ghost"
          size="sm"
          icon={<SearchIcon />}
          onClick={handleSearch}
          aria-label="Search"
          _focus={{ outline: "none" }}
          _active={{ bg: "none" }}
        />
      </InputRightElement>
    </InputGroup>
  );
};
