import IconHome from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/home.tsx";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github.tsx";
import IconArticle from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/article.tsx";
import IconInfoCircle from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/info-circle.tsx";

const Navigation = () => {
	const menus = [
		{ name: "Home", icon: <IconHome class="w-9 h-9" />, href: "/" },
		{ name: "GitHub", icon: <IconBrandGithub class="w-9 h-9" />, href: "/github/gibbygano" },
		{ name: "Congressional Bills", icon: <IconArticle class="w-9 h-9" />, href: "/bills" },
		{ name: "About", icon: <IconInfoCircle class="w-9 h-9" />, href: "/about" },
	];

	return (
		<div class="w-fixed w-full flex-shrink flex-grow-0 px-4 sm:flex-[0_1_230px] sm:min-w-[230px]">
			<div class="sticky top-0 p-4 w-full h-full">
				<ul class="flex flex-col gap-6">
					{menus.map((menu) => (
						<li class="transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
							<a
								href={menu.href}
								class={"[data-current]:font-semibold [data-current]:underline"}
							>
								<span class="hidden lg:block">{menu.name}</span>
								<span class="lg:hidden" alt={menu.name} title={menu.name}>
									{menu.icon}
								</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Navigation;
