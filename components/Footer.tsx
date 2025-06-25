import { asset } from "$fresh/runtime.ts";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx";

interface FooterProps {
	path: string;
}

export default ({ path }: FooterProps) => {
	return (
		<footer class="z-20 fixed bottom-0 w-full bg-white/95 border-t border-gray-200 shadow flex items-center h-12 justify-between p-4 dark:bg-gray-700/95 dark:border-gray-600">
			<span class="text-sm text-gray-500 dark:text-gray-400 items-center">
				<a
					href="https://github.com/gibbygano/wtfiscongressdoingnow"
					target="_GHWTFC"
					referrerpolicy="no-referrer"
					class="hover:underline"
					title="Open https://github.com/gibbygano/wtfiscongressdoingnow in a New Tab"
				>
					<IconBrandGithub class="w-8 h-8" />
				</a>
			</span>
			<ul class="flex md:flex-wrap items-center md:justify-around text-sm font-medium text-gray-500 dark:text-gray-400">
				{path === "/" && (
					<>
						<li class="my-2 md:mx-2 mx-1">
							<a
								href="https://api.govinfo.gov/docs/"
								target="_GIAPI"
								referrerpolicy="no-referrer"
								title="Open https://api.govinfo.gov/docs/ in New Tab"
							>
								<img
									loading="lazy"
									width="107"
									class="rounded"
									src={asset("/images/GovInfo_logo_gray.png")}
									alt="GovInfo API"
								/>
							</a>
						</li>
						<li class="bg-white rounded my-2 mx-1 md:mx-2">
							<a
								href="https://api.congress.gov/"
								target="_CAPI"
								referrerpolicy="no-referrer"
								title="Open https://api.congress.gov/ in New Tab"
							>
								<img
									loading="lazy"
									width="250"
									class="p-2"
									src={asset("/images/congress-gov-logo.svg")}
									alt="Congress.gov API"
								/>
							</a>
						</li>
					</>
				)}
				{path === "/executive-orders" && (
					<>
						<li class="my-2 md:mx-2 mx-1">
							<a
								href="https://www.federalregister.gov/developers/documentation/api/v1"
								target="_FRAPI"
								referrerpolicy="no-referrer"
								title="Open https://www.federalregister.gov/developers/documentation/api/v1 in New Tab"
							>
								<img
									loading="lazy"
									width="220"
									class="rounded bg-white p-1"
									src={asset("/images/fr-official-mh.svg")}
									alt="Federal Register API"
								/>
							</a>
						</li>
					</>
				)}
				<li class="my-2 md:ml-2 ml-1">
					<a
						href="https://fresh.deno.dev/"
						target="_DF"
						referrerpolicy="no-referrer"
						title="Open https://fresh.deno.dev/ in New Tab"
					>
						<img
							loading="lazy"
							class="rounded"
							width="204"
							src={asset("https://fresh.deno.dev/fresh-badge.svg")}
							alt="Made with Fresh"
						/>
					</a>
				</li>
			</ul>
		</footer>
	);
};
