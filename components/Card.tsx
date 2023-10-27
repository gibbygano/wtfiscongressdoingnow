import { stringify } from "$std/dotenv/mod.ts";
import { JSX } from "preact/jsx-runtime";

type Props = {
	headerText: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	href?: string;
	target?: string;
	buttonText?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

const LinkButton = (
	{ href, target, children = <></> }: {
		href: string;
		target?: string;
		children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	},
) => (
	<a
		href={href}
		target={target}
		class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	>
		{children}
		<svg
			class="w-3.5 h-3.5 ml-2"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 10"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M1 5h12m0 0L9 1m4 4L9 9"
			/>
		</svg>
	</a>
);

export default ({ headerText, children, href, target, buttonText }: Props) => {
	return (
		<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<a href="#">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{headerText}
				</h5>
			</a>
			<div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
				{children}
			</div>
			{href && <LinkButton href={href} target={target}>{buttonText}</LinkButton>}
		</div>
	);
};
