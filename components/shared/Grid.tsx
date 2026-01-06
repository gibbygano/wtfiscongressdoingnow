import { JSX } from "preact";

interface CardGridProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  id: string;
}

const Grid = ({ children, id }: CardGridProps) => {
  return (
    <div class="mb-44 flex-1">
      <div
        class="masonry lg:grid-cols-3 2xl:grid-cols-4 3xl:ml-96 3xl:mr-96 md:grid-cols-2 sm:grid-cols-1 md:text-sm lg:text-base text-xs gap-5 px-7 md:pt-16 pt-10"
        id={id}
      >
        {children}
      </div>
    </div>
  );
};

export { Grid };
