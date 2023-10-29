import { JSX } from "preact/jsx-runtime";

type Props = {
	headerText: string;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	href?: string;
	target?: string;
	buttonText?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};



const toggleAccordionItem = (e: JSX.TargetedEvent<HTMLButtonElement>) => {
	e.preventDefault();

	document.getElementById("summary-accordion-item")?.classList.toggle("hidden");
};

const LinkButton = (
	{ href, target, children = <></> }: {
		href: string;
		target?: string;
		children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	},
) => (
	<a
		class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent 
				font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
				focus:ring-offset-2 transition-all text-md dark:focus:ring-offset-gray-800 float-right"
		href={href}
		target={target}
	>
		{children}
	</a>
);

export default ({ headerText, children, href, target, buttonText }: Props) => {
	return (
		<div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]n h-full justify-between">
			<div class="p-4 md:p-5 flex-grow">
				<h3 class="text-lg font-bold text-gray-800 dark:text-white">
					{headerText}
				</h3>
				{children}
				<div class="max-w-md mx-auto dark:text-white mt-10">
					<div class="border border-gray-200 rounded">
						<div class="border-b border-gray-200">
							<button
								onClick={toggleAccordionItem}
								class="w-full p-4 text-left focus:outline-none hover:bg-gray-100"
							>
								Summary
							</button>
						</div>
						<div id="summary-accordion-item" class="p-4 hidden">
							<p>This is the content of Accordion Item 1.</p>
						</div>
					</div>
				</div>
			</div>
			{href && (
				<div class="mt-auto p-4 md:p-5">
					<LinkButton href={href} target={target}>{buttonText}</LinkButton>
				</div>
			)}
		</div>
	);
};
