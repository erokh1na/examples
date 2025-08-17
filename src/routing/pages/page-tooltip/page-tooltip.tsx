import { TooltipBase } from "@/core/lib"
import { Button } from "antd"
import styles from "./page-tooltip.module.scss"

export const PageTooltip = () => {
  const text =
    "Пуночка которая снежный подорожник и арктический воробей. Почему она? Очень смешное название очень круглая птичка. Такой птички нам нравится хотя мы не то чтобы сильно по птицам. Нам в них разобраться сложно и мы думаем птицами интересуется отдельная группа людей к которой мы так и не смогли примкнуть но что-то знать все же таки стараемся."

  return (
    <>
      <div className={styles.container}>
        <TooltipBase text={text}>
          <Button>👇</Button>
        </TooltipBase>

        <div className={styles["horizontal-container"]}>
          <TooltipBase text={text}>
            <Button>👉</Button>
          </TooltipBase>

          <TooltipBase text={text}>
            <Button>👈</Button>
          </TooltipBase>
        </div>

        <TooltipBase text={text}>
          <Button>👆</Button>
        </TooltipBase>
      </div>
    </>
  )
}
