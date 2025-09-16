import { useCallback, useEffect, useRef } from "react"
import type { DragProps } from "./types"

export const useDrag = ({ containerRef, handleRef }) => {
  const draggableRef = useRef(null)

  const cursorOffset = useRef({ left: 0, top: 0 })
  const containerBorders = useRef({ left: 0, right: 0, top: 0, bottom: 0 })

  const isDraggable = useRef(false)

  const start = useCallback((e) => {
    isDraggable.current = true

    draggableRef.current.style.position = "absolute"
    draggableRef.current.style.zIndex = "1000"

    const containerRect = containerRef.current.getBoundingClientRect()
    const draggableRect = draggableRef.current.getBoundingClientRect()

    cursorOffset.current = {
      left: e.clientX - draggableRect.left,
      top: e.clientY - draggableRect.top,
    }

    containerBorders.current = {
      left: containerRect.left,
      right: containerRect.right - draggableRect.width,
      top: containerRect.top,
      bottom: containerRect.bottom - draggableRect.height,
    }

    document.addEventListener("mousemove", move)
    document.addEventListener("mouseup", end)
  }, [])

  const move = (e) => {
    let x = e.clientX - cursorOffset.current.left
    let y = e.clientY - cursorOffset.current.top

    x = Math.max(containerBorders.current.left, Math.min(x, containerBorders.current.right))
    y = Math.max(containerBorders.current.top, Math.min(y, containerBorders.current.bottom))

    if (isDraggable.current) {
      draggableRef.current.style.left = `${x}px`
      draggableRef.current.style.top = `${y}px`
    }
  }

  const end = () => {
    isDraggable.current = false

    document.removeEventListener("mousemove", move)
    document.removeEventListener("mouseup", end)
  }

  useEffect(() => {
    const handle = handleRef?.current || draggableRef.current

    handle.addEventListener("mousedown", start)

    return () => {
      if (handle) {
        handle.removeEventListener("mousedown", start)
      }
    }
  }, [start, handleRef])

  return {
    draggableRef,
  }
}

export const Drag = (props: DragProps) => {
  const drag = useDrag({ containerRef: props.containerRef, handleRef: props.handleRef })

  return <div ref={drag.draggableRef}>{props.children}</div>
}
