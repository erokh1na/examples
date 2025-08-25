import { CloseOutlined } from "@ant-design/icons"
import { useState } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.scss"
import type { ModalProps } from "./types"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close,
  }
}

export const Modal = (props: ModalProps) => {
  return (
    props.isOpen &&
    createPortal(
      <div className={styles.root}>
        <div className={styles.mask} onClick={props.onClose} />
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3 className={styles.title}>{props.title}</h3>
            <CloseOutlined onClick={props.onClose} />
          </div>
          <div className={styles.content}>{props.content}</div>
          <div className={styles.footer}>{props.footer}</div>
        </div>
      </div>,
      document.body,
    )
  )
}
