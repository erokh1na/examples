import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { VirtualizedListProps } from "./types"
import styles from "./virtualized-list.module.scss"

export const useVirtualizedList = ({ list, itemHeight }) => {
  const mainRef = useRef(null)
  const scrollRef = useRef(null)
  const visibleRef = useRef(null)

  const startIndex = 0
  const endIndex = findVisibleItemsCount()

  const [visibleItems, setVisibleItems] = useState([])

  function findScrollHeight() {
    if (!scrollRef.current) return null

    scrollRef.current.style.height = `${list.length * itemHeight}px`
  }

  function findVisibleItemsCount() {
    if (!mainRef.current) return null

    const containerHeight = mainRef.current.getBoundingClientRect().height

    return Math.ceil(containerHeight / itemHeight)
  }

  function findVisibleItems() {
    if (!mainRef.current) return null

    setVisibleItems(list.slice(startIndex, endIndex))

    const scrollToTop = mainRef.current.scrollTop

    console.log("scrollToTop: ", scrollToTop)
    console.log("visibleItems: ", visibleItems)
  }

  useEffect(() => {
    findScrollHeight()
  }, [])

  useEffect(() => {
    mainRef.current.addEventListener("scroll", findVisibleItems)

    return () => {
      if (mainRef.current) {
        mainRef.current.removeEventListener("scroll", findVisibleItems)
      }
    }
  }, [visibleItems, mainRef, scrollRef])

  return {
    mainRef,
    scrollRef,
    visibleRef,
    visibleItems,
  }
}

export const VirtualizedList = (props: VirtualizedListProps) => {
  const virtualizedList = useVirtualizedList({ list: props.list, itemHeight: props.itemHeight })

  return (
    <div className={clsx(styles["main-container"], props.listClassNames)} ref={virtualizedList.mainRef}>
      <div className={styles["scroll-container"]} ref={virtualizedList.scrollRef} />
      <div className={styles["visible-container"]} ref={virtualizedList.visibleRef}>
        <ul className={styles.list}>
          {virtualizedList.visibleItems.map((item, index) => (
            <li
              key={index}
              className={clsx(styles["list-item"], props.itemClassNames)}
              style={{ height: props.itemHeight }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
