import { useRef } from "react"
import styles from "./tooltip-anchor-position.module.scss"
import { TooltipAnchorPositionProps } from "./types"

export const useTooltipAnchorPosition = () => {
  const tooltipRef = useRef(null)

  const mouseenter = () => tooltipRef.current.showPopover()

  return {
    tooltipRef,
    mouseenter,
  }
}

export const TooltipAnchorPosition = (props: TooltipAnchorPositionProps) => {
  const tooltipAnchorPosition = useTooltipAnchorPosition()

  return (
    <div className={styles.container}>
      <div className={styles.anchor} onMouseEnter={tooltipAnchorPosition.mouseenter}>
        {props.children}
      </div>
      <div className={styles.tooltip} popover="auto" ref={tooltipAnchorPosition.tooltipRef}>
        {props.text}
      </div>
    </div>
  )
}
