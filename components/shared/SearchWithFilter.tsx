import { Badge, TextInput } from "components/shared";
import { debounce, map } from "es-toolkit/compat";
import { useEffect } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import type { Filters } from "types";

interface SearchWithFilterProps {
	label: string;
	isLoading: boolean;
	id: string;
	filters: Filters;
	toggleFilter: (enabled: boolean, filterType: string) => void;
	callback: (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => void;
}

const SearchWithFilter = (
	{ label, isLoading, id, filters, toggleFilter, callback }: SearchWithFilterProps,
) => {
	const callbackDebounced = debounce<JSX.KeyboardEventHandler<HTMLInputElement>>(
		(e) => callback(e),
		300,
		{ trailing: true },
	);

	useEffect(() => {
		callbackDebounced.cancel();
	});

	const onFilterCheckChange = (e: JSX.TargetedInputEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		toggleFilter(target.checked, target.name);
	};

	return (
		<div class="md:inline-flex">
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
				<div class="bg-white rounded-br rounded-bl p-3">
					<p>Filters:</p>
					<menu class="inline-flex">
						{map(filters, ({ filterValue, visibleToUi, label, enabled }, key) =>
							visibleToUi && (
								<li>
									{`${label}: ${filterValue}`}
									<input
										name={key}
										class="ml-2"
										checked={enabled}
										onChange={onFilterCheckChange}
										type="checkbox"
									/>
								</li>
							))}
					</menu>
				</div>
			</div>
		</div>
	);
};

export { SearchWithFilter };
