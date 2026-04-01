import type { BillsCollectionSearchResults } from "types";
import useFetch from "./useFetch.ts";

const useFetchBillsSearchResults = (
  search: string | null,
  offsetMark: string,
  pageSize: number,
  callback: (responseObject: BillsCollectionSearchResults) => void,
  enable: boolean,
) => {
  return {
    ...useFetch(
      `/api/bills/search/collection:BILLS and ${search}?${new URLSearchParams({
        offsetMark: offsetMark,
        pageSize: pageSize.toString(),
      })}`,
      callback,
      enable,
    ),
  };
};

export { useFetchBillsSearchResults };
