import { CongressionalBillSummary } from "types";
import useFetch from "./useFetch.ts";

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
