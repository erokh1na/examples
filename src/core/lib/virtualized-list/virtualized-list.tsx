import { TooltipAnchorPositionProps } from "./types"
import styles from "./virtualized-list.module.scss"

export const useVirtualizedList = () => {
  return {}
}

export const VirtualizedList = (props: TooltipAnchorPositionProps) => {
  const tooltipAnchorPosition = useVirtualizedList()

  return <div className={styles.container}></div>
}
