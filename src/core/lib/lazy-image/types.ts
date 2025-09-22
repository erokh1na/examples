import { RefObject } from "react"

export type LazyImageProps = {
  src: string
  rootRef?: RefObject<any>
  onLoad: (value: string) => void
}
