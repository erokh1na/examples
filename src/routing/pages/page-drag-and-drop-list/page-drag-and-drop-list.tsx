import { DragAndDropList } from "@/core/lib/drag-and-drop-list"
import styles from "./page-drag-and-drop-list.module.scss"

export const PageDragAndDropList = () => {
  const items = [
    {
      id: 1,
      text: "Первое",
    },
    {
      id: 2,
      text: "Второе",
    },
    {
      id: 3,
      text: "Третье",
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <DragAndDropList items={items} />
      </div>
    </div>
  )
}
