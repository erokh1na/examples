import { InfinityScroll } from "@/core/lib"
import { useEffect, useState } from "react"
import style from "./page-infinity-scroll.module.scss"

export const PageInfinityScroll = () => {
  const LIMIT = 5
  const DEFAULT_DATA = {
    images: [],
    currentPage: 1,
    isLoading: false,
  }

  const [fetchData, setFetchData] = useState(DEFAULT_DATA)

  const handleImageLoad = (e) => {
    const image = e.target

    image.src = image.dataset.src
  }

  useEffect(() => {
    if (fetchData.isLoading) return

    setFetchData((prev) => ({ ...prev, isLoading: true }))

    fetch(`https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&page=${fetchData.currentPage}`, {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((result) =>
        setFetchData((prev) => ({
          ...prev,
          images: [...prev.images, ...result],
          isLoading: false,
        })),
      )
  }, [fetchData.currentPage])

  return (
    <div className={style.wrapper}>
      <InfinityScroll onScroll={setFetchData}>
        <div className={style.images}>
          {fetchData.images.map((image, index) => (
            <img onLoad={handleImageLoad} key={index} data-src={image.url} src="/images/image.jpg" alt="" />
          ))}
        </div>
        {fetchData.isLoading && <p className={style.loading}>Загрузка...</p>}
      </InfinityScroll>
    </div>
  )
}
