import { createPortal } from "preact/compat";
import { JSX } from "preact/jsx-runtime";
import Card from "./Card.tsx";

interface Props {
    title: string;
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
    onClose: JSX.KeyboardEventHandler<HTMLDivElement>;
}

export default ({ children, onClose }: Props) => {
    return (
        createPortal(
            <div
                tabIndex={-1}
                class="p-5 bg-slate-600 backdrop-filter-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3"
                onKeyDown={onClose}
            >
                {children}
            </div>,
            document.body,
        )
    );
};
