import clsx from "clsx"
import { useState } from "react"
import styles from "./tabs.module.scss"
import type { TabsItem, TabsItems, TabsProps } from "./types"

const useTabs = (items: TabsItems) => {
  const [active, setActive] = useState<TabsItem["key"]>(items[0].key)

  const content = items.find((item: TabsItem) => item.key === active).children

  const change = (key: TabsItem["key"]) => setActive(key)

  return {
    active,
    content,
    change,
  }
}

export const Tabs = ({ items }: TabsProps) => {
  const tabs = useTabs(items)

  return (
    <div className={styles.tabs}>
      <div className={styles.buttons}>
        {items.map((item) => (
          <button
            className={clsx(styles.button, { [styles["button-active"]]: tabs.active === item.key })}
            key={item.key}
            onClick={() => tabs.change(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>{tabs.content}</div>
    </div>
  )
}
