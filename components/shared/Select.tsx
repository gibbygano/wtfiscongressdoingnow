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
				class="bg-gray-50 border-gray-300 text-gray-900 rounded-full m-2
                       dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white p-3 appearance-none [text-align-last:center]"
			>
				{children}
			</select>
		</label>
	);
};
