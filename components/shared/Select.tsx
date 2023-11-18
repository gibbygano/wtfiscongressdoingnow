import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";

type Props = {
	children: ComponentChildren;
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
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                       focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600
                       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
					   max-w-[75px] ml-2"
			>
				{children}
			</select>
		</label>
	);
};
