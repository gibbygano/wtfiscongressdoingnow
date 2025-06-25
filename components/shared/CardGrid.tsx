import { JSX } from "preact";

interface CardGridProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	id: string;
}

const CardGrid = ({ children, id }: CardGridProps) => {
	return (
		<div class="pb-16 flex-1">
			<div
				class="lg:columns-3 2xl:columns-4 3xl:ml-96 3xl:mr-96 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 md:pt-16 pt-10"
				id={id}
			>
				{children}
			</div>
		</div>
	);
};

export { CardGrid };

