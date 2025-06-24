import { JSX } from "preact";
import { useRef } from "preact/hooks";
import { ModalButton } from "../Modal/ModalButton.tsx";

interface ModalProps {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	buttonChildren: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	buttonClass?: string | null;
}

const Modal = ({ children, buttonChildren, buttonClass = null }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const closeDialog = () => dialogRef.current?.close();

	return (
		<>
			<dialog
				class="w-full h-1/3 lg:w-1/2 lg:h-1/2 m-auto shadow-2xl/100 shadow-[#355262]"
				ref={dialogRef}
			>
				<div class="flex justify-end">
					<button
						class="bg-transparent m-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1.5 border border-blue-500 hover:border-transparent rounded"
						onClick={closeDialog}
						type="button"
						autofocus
					>
						x
					</button>
				</div>
				<div>
					{children}
				</div>
			</dialog>
			<ModalButton className={buttonClass} dialogRef={dialogRef}>
				{buttonChildren}
			</ModalButton>
		</>
	);
};

export { Modal };
