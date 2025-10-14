import { ComponentChildren, HTMLAttributes, VNode } from "preact";

interface collapseProps extends HTMLAttributes<HTMLDivElement> {
  joinName: string;
  collapseTitle: ComponentChildren;
  children: ComponentChildren;
}

interface accordionProps extends HTMLAttributes<HTMLDivElement> {
  children: VNode<collapseProps> | VNode<collapseProps>[];
}

export type { accordionProps, collapseProps };
