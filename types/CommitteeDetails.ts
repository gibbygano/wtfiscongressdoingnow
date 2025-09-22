import type Subcommittee from "./Subcommittee.ts";

export default interface CommitteeDetails {
	bills: {
		count: number;
		url: string;
	};
	communications: {
		count: number;
		url: string;
	};
	history: Array<{
		endDate: string;
		libraryOfCongressName: string;
		officialName: string;
		startDate: string;
		updateDate: string;
	}>;
	isCurrent: boolean;
	reports: {
		count: number;
		url: string;
	};
	subcommittees: Array<Subcommittee>;
	systemCode: string;
	type: string;
	updateDate: string;
}
