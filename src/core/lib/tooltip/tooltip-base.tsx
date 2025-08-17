import clsx from "clsx"
import { useLayoutEffect, useRef, useState } from "react"
import styles from "./tooltip-base.module.scss"

export const useTooltipBase = () => {
  const PADDING = 10

  const [visible, setVisible] = useState(false)

  const tooltipRef = useRef(null)
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    if (visible) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      let top = -tooltipRect.height - PADDING
      let left = -tooltipRect.width / 2 + containerRect.width / 2

      const setTooltipPosition = (top, left) => {
        tooltipRef.current.style.top = `${top}px`
        tooltipRef.current.style.left = `${left}px`
      }

      const getRects = () => {
        return [tooltipRef.current.getBoundingClientRect(), containerRef.current.getBoundingClientRect()]
      }

      // перестраиваемся по вертикали
      if (containerRect.top < tooltipRect.height + PADDING) {
        top = containerRect.height + PADDING

        setTooltipPosition(top, left)
      }

      getRects()

      // перестраиваемся вправо, если слева зарез
      if (containerRect.left - tooltipRect.width / 2 < 0) {
        left = containerRect.width + PADDING
        top = containerRect.height / 2 - tooltipRect.height / 2

        setTooltipPosition(top, left)
      }

      getRects()

      // перестраиваемся влево, если справа зарез
      if (containerRect.right + tooltipRect.width / 2 > window.innerWidth) {
        left = -tooltipRect.width - PADDING
        top = containerRect.height / 2 - tooltipRect.height / 2

        setTooltipPosition(top, left)
      }

      setTooltipPosition(top, left)
    }
  }, [visible])

  const show = () => setVisible(true)
  const hide = () => setVisible(false)

  return {
    visible,
    tooltipRef,
    containerRef,
    show,
    hide,
  }
}

export const TooltipBase = ({ text, children }) => {
  const tooltip = useTooltipBase()

  return (
    <div className={styles.container} ref={tooltip.containerRef}>
      {tooltip.visible && (
        <div className={clsx(styles.tooltip)} ref={tooltip.tooltipRef}>
          {text}
        </div>
      )}
      <div className={styles.anchor} onMouseOver={tooltip.show} onMouseOut={tooltip.hide}>
        {children}
      </div>
    </div>
  )
}
