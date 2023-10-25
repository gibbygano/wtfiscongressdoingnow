import { Link } from "lunchbox";

const Navigation = () => {
	const menus = [
		{ name: "Home", href: "/" },
		{ name: "GitHub", href: "/github/gibbygano" },
		{ name: "Congressional Bills", href: "/bills" },
		{ name: "About", href: "/about" },
	];

	return (
		<div class="w-fixed w-full flex-shrink flex-grow-0 px-4 sm:flex-[0_1_230px] sm:min-w-[230px]">
			<div class="sticky top-0 p-4 w-full h-full">
				<ul class="flex flex-col gap-6">
					{menus.map((menu) => (
						<li class="transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
							<a
								href={menu.href}
								class={"[data-current]:font-semibold [data-current]:border-b-2"}
							>
								{menu.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Navigation;
