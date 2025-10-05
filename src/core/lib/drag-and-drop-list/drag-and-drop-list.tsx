import { HolderOutlined } from "@ant-design/icons"
import { useRef, useState } from "react"
import styles from "./drag-and-drop-list.module.scss"
import { DragAndDropListProps } from "./types"

export const usedragAndDropList = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems)

  const draggedItemIndex = useRef(null)
  const targetItemIndex = useRef(null)

  const dragOver = (e) => {
    e.preventDefault()
  }

  const dragStart = (e) => {
    draggedItemIndex.current = e.target.dataset.index

    e.dataTransfer.effectAllowed = "move"
  }

  const dragEnter = (e) => {
    targetItemIndex.current = e.target.dataset.index
  }

  const drop = (e) => {
    e.preventDefault()

    const copyItems = [...items]
    const draggedItemContent = copyItems[draggedItemIndex.current]

    copyItems.splice(draggedItemIndex.current, 1)
    copyItems.splice(targetItemIndex.current, 0, draggedItemContent)

    draggedItemIndex.current = null
    targetItemIndex.current = null

    setItems(copyItems)
  }

  return {
    items,
    dragOver,
    dragStart,
    dragEnter,
    drop,
  }
}

export const DragAndDropList = (props: DragAndDropListProps) => {
  const dragAndDropList = usedragAndDropList({ initialItems: props.items })

  return (
    <ul className={styles.list} onDragOver={dragAndDropList.dragOver} onDrop={dragAndDropList.drop}>
      {dragAndDropList.items.map((item, index) => (
        <li
          draggable
          key={item.id}
          className={styles.item}
          data-index={index}
          onDragStart={dragAndDropList.dragStart}
          onDragEnter={dragAndDropList.dragEnter}
        >
          {item.text}
          <HolderOutlined />
        </li>
      ))}
    </ul>
  )
}
