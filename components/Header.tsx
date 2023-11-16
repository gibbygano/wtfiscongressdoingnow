export default () => {
	return (
		<header class="border-gray-200 dark:border-gray-700 sticky h-24 top-0 z-[5] bg-gradient-to-r from-red-900 via-slate-400 to-blue-900">
			<div class="max-w-screen grid grid-cols-5 h-24 flex p-4 bg-[url('/images/congress.jpg')] bg-right bg-cover mix-blend-overlay justify-center items-end">
				<a href="/" class="md:col-start-4 md:col-end-5 col-start-3 col-end-4">
					<span class="md:text-2xl sm:text-xl font-semibold whitespace-nowrap dark:text-white [text-shadow:_6px_6px_6px_var(--tw-shadow-color)] shadow-black">
						WTF Is Congress Doing Now?
					</span>
				</a>
			</div>
		</header>
	);
};
