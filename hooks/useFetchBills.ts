import { CongressionalBills } from "types";
import useFetch from "./useFetch.ts";

const useFetchBills = (
  startDate: string,
  pageSize: number,
  offset: string,
  callback: (bills: CongressionalBills) => void,
) => {
  return {
    ...useFetch(
      `/api/bills/${startDate}?${new URLSearchParams({
        pageSize: pageSize.toString(),
        offset: offset,
      })}`,
      callback,
    ),
  };
};

export default useFetchBills;
