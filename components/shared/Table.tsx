import { JSX } from "preact";

interface tableProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const Table = ({ children }: tableProps) => {
	return (
		<div class="overflow-x-auto mb-44 flex-1 rounded-box border border-base-content/5 bg-base-100">
			<table class="table">{children}</table>
		</div>
	);
};

export default Table;
