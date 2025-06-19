import { Role } from "types";

interface BadgeProps {
	role: Role;
}

const Badge = ({ role }: BadgeProps) => {
	switch (role) {
		case Role.SPONSOR:
			return (
				<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
					{role.toLocaleString()}
				</span>
			);
		default:
			return (
				<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
					{role.toLocaleString()}
				</span>
			);
	}
};

export { Badge };
