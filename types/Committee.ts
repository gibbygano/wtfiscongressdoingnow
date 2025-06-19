import type Subcommittee from "./Subcommittee.ts";

export default interface Committee {
	chamber: string;
	committeeTypeCode: string;
	name: string;
	subcommittees: Array<Subcommittee>;
}
