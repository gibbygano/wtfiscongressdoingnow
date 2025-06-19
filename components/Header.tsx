import { asset } from "$fresh/runtime.ts";

export default () => {
	return (
		<header class="border-gray-200 dark:border-gray-700 sticky h-[110px] top-0 z-[1] bg-linear-to-r from-[#B31942] via-[#FFFFFF] to-[#0A3161]">
			<div
				style={`background-image: url(${asset("/images/congress.jpg")});`}
				class="max-w-screen grid grid-cols-5 h-[110px] p-4 bg-[center_bottom_-25.5rem] 2xl:bg-[center_bottom_-21rem] 3xl:bg-[center_bottom_70rem] bg-cover mix-blend-screen justify-center items-end"
			>
				<a href="/" class="md:col-start-4 md:col-end-5 col-start-3 col-end-4">
					<span class="md:text-2xl sm:text-xl font-semibold whitespace-nowrap dark:text-white [text-shadow:_3px_3px_7px_var(--tw-shadow-color)] shadow-neutral-600">
						WTF Is Congress Doing Now?
					</span>
				</a>
			</div>
		</header>
	);
};
