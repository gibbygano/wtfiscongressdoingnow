import { debounce } from "es-toolkit/compat";
import { KeyboardEventHandler, TargetedKeyboardEvent } from "preact";
import { useEffect } from "preact/hooks";
import { TextInput } from "./TextInput.tsx";

interface SearchProps {
	label: string;
	isLoading: boolean;
	id: string;
	callback: (e: TargetedKeyboardEvent<HTMLInputElement>) => void;
}

const Search = ({ label, isLoading, id, callback }: SearchProps) => {
	const callbackDebounced = debounce<KeyboardEventHandler<HTMLInputElement>>(
		(e) => callback(e),
		300,
		{ trailing: true },
	);

	useEffect(() => {
		callbackDebounced.cancel();
	});

	return (
		<div class="md:flex">
			<div class="md:fixed sm:sticky md:ml-7 md:z-10 lg:columns-3 w-full 2xl:columns-4 3xl:ml-[412px] 3xl:mr-[412px] md:columns-2 md:gap-x-20 lg:gap-x-12 2xl:gap-x-10 3xl:gap-x-[295px]">
				<TextInput
					className="border-b-[1px] border-r-[1px] border-l-[1px] md:rounded-br-lg md:rounded-bl-lg"
					id={id}
					label={label}
					showLoading={isLoading}
					type="search"
					onSearch={callback}
					onKeyUp={callbackDebounced}
				/>
			</div>
		</div>
	);
};

export { Search };
