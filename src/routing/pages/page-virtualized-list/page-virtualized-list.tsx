import { VirtualizedList } from "@/core/lib"
import styles from "./page-virtualized-list.module.scss"

export const PageVirtualizedList = () => {
  const list = Array.from({ length: 10 }, (_, i) => i + 1)

  return <VirtualizedList list={list} itemHeight={"100px"} listClassNames={styles.list} itemClassNames={styles.item} />
}
