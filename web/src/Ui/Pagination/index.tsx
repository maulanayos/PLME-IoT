"use client";

import { HStack } from "@chakra-ui/react";
import GoToPage from "./GoToPage";
import PageNumbers from "./PageNumber";
import ShowLimit from "./ShowLimit";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
export * from "./types";

const LIMIT_LIST: number[] = [10, 20, 50, 100];

export const Pagination = ({ totalData }: { totalData: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  useEffect(() => {
    // Handle if page or limit is not exist in query
    const params = new URLSearchParams(searchParams);
    if (!params.has("page")) {
      params.set("page", "1");
    }
    if (!params.has("limit")) {
      params.set("limit", "10");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  const paging = {
    totalData,
    page: parseInt(page),
    limit: parseInt(limit),
    maxPage: totalData ? Math.ceil(totalData / parseInt(limit)) : 1,
    hasPrev: parseInt(page || "1") > 1,
    hasNext:
      parseInt(page) <
      Math.ceil(totalData / parseInt(limit)),
  };

  const isSelectLimitInList = LIMIT_LIST.includes(paging.limit);

  // if (!isSelectLimitInList) {
  //   LIMIT_LIST.push(paging.limit);
  //   LIMIT_LIST.sort((a, b) => a - b);
  // }

  // if (paging.query) {
  //   if (parseInt(paging.query["page"]) > paging.maxPage) {
  //     delete paging.query?.["page"];
  //     delete paging.query?.["limit"];

  //     const query = queryTarget(paging, null, null);
  //     // router.push(`${window.location.pathname}${query}`);
  //   }
  // }

  // if (Number(page) > paging.maxPage) {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("page", paging.maxPage.toString());
  //   router.replace(`${pathname}?${params.toString()}`);
  // }

  return (
    <HStack
      w="100%"
      direction="row"
      justifyContent="space-between"
      py={6}
      px={2}
    >
      <ShowLimit limit={paging.limit} limitList={LIMIT_LIST} paging={paging} />
      <PageNumbers
        startPage={1}
        endPage={paging.maxPage}
        currentPage={paging.page}
        paging={paging}
      />
      <GoToPage paging={paging} />
    </HStack>
  );
};
