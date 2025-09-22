import { Badge } from "components/shared";
import { Role } from "types";

interface MemberRoleBadgeProps {
	role: Role;
}

const MemberRoleBadge = ({ role }: MemberRoleBadgeProps) => {
	switch (role) {
		case Role.SPONSOR:
			return (
				<Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
					{role}
				</Badge>
			);
		default:
			return (
				<Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
					{role}
				</Badge>
			);
	}
};

export { MemberRoleBadge };
