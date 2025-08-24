import { ReactNode } from "react"

export type TabsItem = {
  key: string | number;
  label: string;
  children: string | ReactNode;
}

export type TabsItems = TabsItem[];

export type TabsProps = {
  items: TabsItems;
}