import { TooltipAnchorPosition } from "@/core/lib"
import { Button } from "antd"
import styles from "./page-tooltip-anchor-position.module.scss"

export const PageTooltipAnchorPosition = () => {
  const text = "Я — тултип, который сделали через Anchor Position"

  return (
    <div className={styles.container}>
      <p>Anchor Position — новое CSS API для позиционирования элементов относительно друг друга.</p>
      <p>Наведите курсор на якорь и проскрольте вниз, чтобы увидеть, как он адаптируется к положению вьюпорта.</p>
      <p>У него пока не очень хорошая поддержка, так что в вашем браузере может не сработать.</p>

      <div className={styles["tooltip-container"]}>
        <TooltipAnchorPosition text={text}>
          <Button>⚓︎</Button>
        </TooltipAnchorPosition>
      </div>
    </div>
  )
}
