import { Tabs } from "@/core/lib"
import styles from "./page-tabs.module.scss"

export const PageTabs = () => {
  const items = [
    {
      key: 1,
      label: "Tab 1",
      children: <p>Tab 1 content</p>,
    },
    {
      key: 2,
      label: "Tab 2",
      children: <p>Tab 2 content</p>,
    },
    {
      key: 3,
      label: "Tab 3",
      children: <p>Tab 3 content</p>,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Tabs items={items} />
      </div>
    </div>
  )
}
