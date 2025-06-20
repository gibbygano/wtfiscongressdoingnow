import useFetch from "./useFetch.ts";
import { CongressionalBillSummary } from "types";

const useFetchBillSummary = (
	packageId: string,
	callback: (billSummary: CongressionalBillSummary) => void,
	enable: boolean,
) => {
	return {
		...useFetch(
			`/api/bills/summary/${packageId}`,
			callback,
			enable,
		),
	};
};

export default useFetchBillSummary;
