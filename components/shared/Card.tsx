import { JSX } from "preact";

type Props = {
  headerText: string;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  bodyChildren?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (() => JSX.Element)
    | undefined;
  actionChildren?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (() => JSX.Element)
    | undefined;
};

export default ({
  headerText,
  children,
  bodyChildren,
  actionChildren,
}: Props) => (
  <div class="flex flex-col card card-border bg-white border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]n shadow-xl break-inside-avoid mb-5 bottom-0">
    <div class="card-body">
      <div class="prose leading-6">
        <h3 class="text-lg card-title font-semibold text-gray-800 dark:text-white">
          {headerText}
        </h3>
        {children}
      </div>
      <div class="py-4">{bodyChildren}</div>
      <div class="card-actions justify-end">{actionChildren}</div>
    </div>
  </div>
);
