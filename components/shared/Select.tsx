import { JSX } from "preact/jsx-runtime";

type Props = {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	label: string;
	inputId: string;
	value: string;
	onChange: JSX.GenericEventHandler<HTMLSelectElement>;
};

export default ({ children, label, inputId, value, onChange }: Props) => {
	return (
		<label
			for={inputId}
			class="text-sm font-medium text-gray-900 dark:text-black m-auto"
		>
			{label}:
			<select
				id={inputId}
				value={value}
				onChange={onChange}
				class="transition ease-in-out bg-gray-50 border-gray-300 text-gray-900 rounded-full ml-2 appearance-none
                       dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white max-w-[75px]"
			>
				{children}
			</select>
		</label>
	);
};
