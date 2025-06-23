import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx";
import { asset } from "$fresh/runtime.ts";

export default () => {
	return (
		<footer class="z-20 fixed bottom-0 w-full bg-white border-t border-gray-200 shadow flex items-center h-12 justify-between p-4 dark:bg-gray-800 dark:border-gray-600">
			<span class="text-sm text-gray-500 dark:text-gray-400 items-center">
				<a
					href="https://github.com/gibbygano/wtfiscongressdoingnow"
					target="_blank"
					class="hover:underline"
					title="Open https://github.com/gibbygano/wtfiscongressdoingnow in a New Tab"
				>
					<IconBrandGithub class="w-8 h-8" />
				</a>
			</span>
			<ul class="flex md:flex-wrap items-center md:justify-around text-sm font-medium text-gray-500 dark:text-gray-400">
				<li>
					<a
						href="https://fresh.deno.dev/"
						target="_blank"
						title="Open https://fresh.deno.dev/ in New Tab"
					>
						<img
							loading="lazy"
							width="160"
							height="32"
							class="scale-90 md:scale-100"
							src={asset("https://fresh.deno.dev/fresh-badge.svg")}
							alt="Made with Fresh"
						/>
					</a>
				</li>
				<li class="bg-white rounded md:my-2 mx-2 md:mx-6">
					<a
						href="https://api.congress.gov/"
						target="_blank"
						title="Open https://api.congress.gov/ in New Tab"
					>
						<img
							loading="lazy"
							class="rounded p-2 scale-90 md:scale-100"
							width="130"
							src={asset("/images/congress-gov-logo.svg")}
							alt="Congress.gov API"
						/>
					</a>
				</li>
				<li>
					<a
						href="https://api.govinfo.gov/docs/"
						target="_blank"
						title="Open https://api.govinfo.gov/docs/ in New Tab"
					>
						<img
							loading="lazy"
							class="rounded scale-90 md:scale-100"
							width="87"
							src={asset("/images/GovInfo_logo_gray.png")}
							alt="GovInfo API"
						/>
					</a>
				</li>
			</ul>
		</footer>
	);
};
