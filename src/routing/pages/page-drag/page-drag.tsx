import { Drag } from "@/core/lib/drag"
import { MenuOutlined } from "@ant-design/icons"
import clsx from "clsx"
import { useRef } from "react"
import styles from "./page-drag.module.scss"

export const PageDrag = () => {
  const mainContainerRef = useRef(null)
  const innerContainerRef = useRef(null)
  const handleRef = useRef(null)

  return (
    <div className={styles.root} ref={mainContainerRef}>
      <div className={styles.wrapper}>
        <Drag containerRef={mainContainerRef}>
          <div className={clsx(styles.box, styles.pink)}>Меня можно перетаскивать по всему полю</div>
        </Drag>
      </div>

      <div className={clsx(styles.wrapper, styles["inner-root"])} ref={innerContainerRef}>
        <Drag containerRef={innerContainerRef}>
          <div className={clsx(styles.box, styles.blue)}>Меня — только в пределах моего контейнера</div>
        </Drag>
      </div>

      <div className={styles.wrapper}>
        <Drag containerRef={mainContainerRef} handleRef={handleRef}>
          <div className={clsx(styles.box, styles.green)}>
            <MenuOutlined className={styles.icon} ref={handleRef} />
            Меня — только за иконку
          </div>
        </Drag>
      </div>
    </div>
  )
}
