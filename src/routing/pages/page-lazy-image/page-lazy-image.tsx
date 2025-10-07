import { LazyImage } from "@/core/lib"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import style from "./page-lazy-image.module.scss"

export const PageLazyImage = () => {
  const [images, setImages] = useState([])
  const [loadedImages, setLoadedImages] = useState([])

  const mainRef = useRef(null)
  const cloneRef = useRef(null)

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10", {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((result) => result.map((item) => item.url))
      .then((images) => setImages(images))
  }, [])

  useEffect(() => {
    if (!mainRef.current || !cloneRef.current) return

    const handleMainScroll = () => {
      cloneRef.current.style.transform = `translateY(-${mainRef.current.scrollTop}px)`
    }

    mainRef.current.addEventListener("scroll", handleMainScroll)

    return () => {
      if (mainRef.current) {
        mainRef.current.removeEventListener("scroll", handleMainScroll)
      }
    }
  }, [])

  const handleImageLoad = (src) => {
    setLoadedImages((prev) => [...prev, src])
  }

  return (
    <div className={style.wrapper}>
      <div className={clsx(style.content, style["main-container"])} ref={mainRef}>
        <div className={style.images}>
          {images.map((image, index) => (
            <LazyImage key={index} src={image} rootRef={mainRef} onLoad={handleImageLoad} />
          ))}
        </div>
      </div>

      <div className={clsx(style.content, style["clone-container"])} ref={cloneRef}>
        <div className={style.images}>
          {images.map((image, index) => {
            const isLoaded = loadedImages.includes(image)

            return <img key={index} src={isLoaded ? image : "/images/image.jpg"} alt="" />
          })}
        </div>
      </div>
    </div>
  )
}
