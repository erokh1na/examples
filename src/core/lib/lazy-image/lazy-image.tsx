import { useEffect, useRef } from "react"
import { LazyImageProps } from "./types"

export const useLazyImage = ({ root, src, onLoad }) => {
  const ref = useRef(null)

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
    if (!ref.current) return

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref.current])

  return {
    ref,
  }
}

export const LazyImage = (props: LazyImageProps) => {
  const lazyImage = useLazyImage({
    root: props.rootRef.current,
    src: props.src,
    onLoad: props.onLoad,
  })

  return <img src="/images/image.jpg" alt="" ref={lazyImage.ref} />
}
