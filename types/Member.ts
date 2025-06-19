enum Role {
	NONE = -1,
	SPONSOR,
	COSPONSOR,
}
interface Member {
	role: Role;
	chamber: string;
	congress: number;
	bioGuideId: string;
	memberName: string;
	state: string;
	party: string;
}

export { type Member, Role };
