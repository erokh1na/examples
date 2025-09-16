import type { PropsWithChildren, RefObject } from "react"

export interface DragProps extends PropsWithChildren {
  containerRef?: RefObject<any>
  handleRef?: RefObject<any>
}
