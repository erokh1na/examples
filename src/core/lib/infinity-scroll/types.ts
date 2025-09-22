import type { PropsWithChildren } from "react"

export interface InfinityScrollProps extends PropsWithChildren {
  onScroll: () => void
}
