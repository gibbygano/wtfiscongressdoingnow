import IconBrandGithub from "fresh-icons/brand-github.tsx";

export default () => {
	return (
		<footer class="z-[5] w-full bg-white border-t border-gray-200 shadow flex items-center justify-between p-2 dark:bg-gray-800 dark:border-gray-600
					   2xl:p-4">
			<span class="text-sm text-gray-500 dark:text-gray-400 items-center">
				<a
					href="https://github.com/gibbygano/wtfiscongressdoingnow"
					target="_blank"
					title="Open https://github.com/gibbygano/wtfiscongressdoingnow in a New Tab"
				>
					<IconBrandGithub class="w-8 h-8" />
				</a>
			</span>
			<ul class="flex items-center md:justify-around mt-1 text-sm font-medium text-gray-500 dark:text-gray-400
					   md:flex-wrap">
				<li>
					<a
						href="https://fresh.deno.dev/"
						target="_blank"
						title="Open https://fresh.deno.dev/ in New Tab"
					>
						<img
							width="160"
							height="32"
							class="scale-90 2xl:scale-100"
							src="https://fresh.deno.dev/fresh-badge.svg"
							alt="Made with Fresh"
						>
						</img>
					</a>
				</li>
				<li class="bg-white rounded mx-2 2xl:(my-2,mx-6)">
					<a
						href="https://api.congress.gov/"
						target="_blank"
						title="Open https://api.congress.gov/ in New Tab"
					>
						<img
							class="rounded p-2 scale-90 2xl:scale-100"
							width="130"
							src="/images/congress-gov-logo.svg"
							alt="Congress.gov API"
						>
						</img>
					</a>
				</li>
				<li>
					<a
						href="https://api.govinfo.gov/docs/"
						target="_blank"
						title="Open https://api.govinfo.gov/docs/ in New Tab"
					>
						<img
							class="rounded scale-90 2xl:scale-100"
							width="87"
							src="/images/GovInfo_logo_gray.png"
							alt="GovInfo API"
						>
						</img>
					</a>
				</li>
			</ul>
		</footer>
	);
};
