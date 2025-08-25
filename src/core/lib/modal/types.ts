import { ReactNode } from "react"

export type ModalProps = {
  isOpen: boolean
  title?: string
  content?: string | ReactNode
  footer?: ReactNode
  onClose: () => void
}
