import { useCallback, useEffect, useRef } from "react"
import style from "./infinity-scroll.module.scss"
import { InfinityScrollProps } from "./types"

const useInfinityScroll = ({ onScroll }) => {
  const containerRef = useRef(null)

  const throttle = useCallback((callee, timeout) => {
    let timer = null

    return (...args) => {
      if (timer) return

      timer = setTimeout(() => {
        callee(...args)

        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleScroll = () => {
      const { clientHeight, scrollHeight, scrollTop } = container

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        onScroll((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))
      }
    }

    const throttledScroll = throttle(handleScroll, 1000)

    container.addEventListener("scroll", throttledScroll)

    return () => {
      if (container) {
        container.removeEventListener("scroll", throttledScroll)
      }
    }
  }, [onScroll, throttle])

  return {
    containerRef,
  }
}

export const InfinityScroll = (props: InfinityScrollProps) => {
  const infinityScroll = useInfinityScroll({ onScroll: props.onScroll })

  return (
    <div ref={infinityScroll.containerRef} className={style["scroll-container"]}>
      {props.children}
    </div>
  )
}
