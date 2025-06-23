import { JSX, RefObject } from "preact";

import clsx from "clsx";

interface ModalButtonProps {
	dialogRef: RefObject<HTMLDialogElement>;
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	className: string | null;
}

const ModalButton = ({ dialogRef, children, className = null }: ModalButtonProps) => {
	const showDialog = () => dialogRef.current?.showModal();

	return (
		<button
			class={clsx({
				"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded":
					!className,
				className,
			})}
			onClick={showDialog}
			type="button"
		>
			{children}
		</button>
	);
};

export { ModalButton };
