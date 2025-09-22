import { useEffect, useRef } from "react"
import { LazyImageProps } from "./types"

export const useLazyImage = ({ target, root, src, onLoad }) => {
  const options = {
    root: root,
    rootMargin: "60px",
  }

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target

        target.src = src
        onLoad(src)

        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)

  useEffect(() => {
    if (!target) return

    observer.observe(target)

    return () => observer.disconnect()
  }, [target])
}

export const LazyImage = (props: LazyImageProps) => {
  const lazyImageRef = useRef(null)

  useLazyImage({
    target: lazyImageRef.current,
    root: props.rootRef.current,
    src: props.src,
    onLoad: props.onLoad,
  })

  return <img src="/images/image.jpg" alt="" ref={lazyImageRef} />
}
