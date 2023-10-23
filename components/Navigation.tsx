const Navigation = () => {
  const menus = [
    { name: "Home", href: "/" },
    { name: "GitHub", href: "/github/gibbygano" },
    { name: "17 Transit View", href: "/septa/17" },
  ];

  return (
    <div class="w-fixed w-full flex-shrink flex-grow-0 px-4 sm:flex-[0_1_230px] sm:min-w-[230px]">
      <div class="sticky top-0 p-4 w-full h-full">
        <ul class="flex flex-col gap-6">
          {menus.map((menu) => (
            <li>
              <a
                href={menu.href}
                class={"text-gray-500 hover:text-gray-700 py-1 border-gray-500 [data-current]:font-bold [data-current]:border-b-2"}
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
