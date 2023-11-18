import { ComponentChildren, createContext } from "preact";

type GroupProps = {
	children: ComponentChildren;
	open?: boolean;
	last?: boolean;
	first?: boolean;
};

export const Context = createContext<{ isOpen?: boolean; isLast?: boolean; isFirst?: boolean }>({
	isOpen: false,
	isLast: false,
	isFirst: false,
});

const Group = ({ children, open, last, first }: GroupProps) => {
	return (
		<Context.Provider value={{ isOpen: open, isLast: last, isFirst: first }}>
			{children}
		</Context.Provider>
	);
};

export default Group;
