import { createDefine } from "fresh";
import { CongressionalBills } from "types";

export interface State {
	billsOffset: string;
	billsPageSize: string;
	currentBills: CongressionalBills;
	billsLoading: boolean;
	billsError: Error;
}

export const define = createDefine<State>();
