import { JSX } from "preact/jsx-runtime";

export default () => {
	const onMobileMenuClick = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const mobileNavDivClassList = document.getElementById("navbar-solid-bg")?.classList;
		mobileNavDivClassList?.toggle("hidden");
	};

	return (
		<nav class="border-gray-200 dark:border-gray-700 sticky h-24 top-0 z-[1] bg-gradient-to-r from-red-900 via-slate-400 to-blue-900">
			<div class="max-w-screen h-24 flex p-4 bg-[url('/congress.jpg')] bg-center bg-cover mix-blend-overlay justify-center md:items-end items-center">
				<span class="md:w-[53%] justify-center md:justify-end flex">
					<a href="/">
						<span class="md:text-2xl sm:text-xl font-semibold whitespace-nowrap dark:text-white [text-shadow:_6px_6px_6px_var(--tw-shadow-color)] shadow-black">
							WTF Is Congress Doing Now?
						</span>
					</a>
				</span>
			</div>
		</nav>
	);
};
