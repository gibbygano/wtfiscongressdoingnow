import IconHome from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/home.tsx";
import IconArticle from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/article.tsx";
import IconInfoCircle from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/info-circle.tsx";

const Navigation = () => {
	const menus = [
		{ name: "Home", icon: <IconHome class="w-7 h-7" />, href: "/" },
		{ name: "Congressional Bills", icon: <IconArticle class="w-7 h-7" />, href: "/bills" },
		{ name: "About", icon: <IconInfoCircle class="w-7 h-7" />, href: "/about" },
	];

	return (
		<div class="w-fixed w-full flex-shrink flex-grow-0 pl-1 sm:flex-[0_1_230px] sm:min-w-[230px] bg-slate-100 col-span-1 lg:col-span-2">
			<nav class="sticky top-0 pt-3 w-full h-full">
				<ul class="flex flex-col gap-5 ml-4 md:ml-10">
					{menus.map((menu) => (
						<li class="transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl">
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
			</nav>
		</div>
	);
};

export default Navigation;
