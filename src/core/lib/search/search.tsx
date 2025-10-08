import { CloseOutlined } from "@ant-design/icons"
import clsx from "clsx"
import { useDeferredValue, useEffect, useState } from "react"
import styles from "./search.module.scss"
import type { SearchInputProps, SearchResultsProps } from "./types"

const useSearch = () => {
  const DELAY = 300

  const [query, setQuery] = useState("")
  const [results, setResults] = useState({
    data: [],
    isLoading: false,
  })

  const deferredQuery = useDeferredValue(query)
  const isStaleResults = query !== deferredQuery

  function clear() {
    setResults((prev) => ({ ...prev, data: [] }))
    setQuery("")
  }

  useEffect(() => {
    setResults((prev) => ({ ...prev, isLoading: true }))

    let timer

    if (deferredQuery) {
      timer = setTimeout(() => {
        fetch(`https://api.kinopoisk.dev/v1.4/movie/search?limit=10&query=${deferredQuery}`, {
          headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        })
          .then((result) => result.json())
          .then((data) => {
            const lightData = data.docs.map((item) => ({
              id: item.id,
              name: item.name,
            }))

            setResults((prev) => ({ ...prev, data: lightData }))
          })
          .catch(() => setResults((prev) => ({ ...prev, isLoading: false })))
          .finally(() => setResults((prev) => ({ ...prev, isLoading: false })))
      }, DELAY)
    } else {
      clear()
    }

    return () => clearTimeout(timer)
  }, [deferredQuery])

  return {
    query,
    results,
    isStaleResults,
    clear,
    setQuery,
  }
}

export const Search = () => {
  const search = useSearch()

  return (
    <div className={styles.container}>
      <SearchInput query={search.query} onChangeQuery={search.setQuery} onClear={search.clear} />
      <SearchResults query={search.query} results={search.results} isStaleResults={search.isStaleResults} />
    </div>
  )
}

function SearchInput(props: SearchInputProps) {
  return (
    <label className={styles.label}>
      Искать фильм:
      <div className={styles["input-wrapper"]}>
        <input
          className={styles.input}
          value={props.query}
          onChange={(e) => props.onChangeQuery(e.target.value)}
          autoFocus
          type="text"
          placeholder="Например, «Техасская резня бензопилой»"
        />
        {props.query && <CloseOutlined onClick={props.onClear} />}
      </div>
    </label>
  )
}

function SearchResults(props: SearchResultsProps) {
  if (!props.query) return null

  if (props.results.isLoading) {
    return <p>Загрузка...</p>
  }

  if (props.results.data.length > 0) {
    return (
      <ul className={clsx(styles.results, { [styles["results-stale"]]: props.isStaleResults })}>
        {props.results.data.map((result) => (
          <li key={result.id} className={styles.result}>
            {result.name}
          </li>
        ))}
      </ul>
    )
  }

  if (!props.isStaleResults) {
    return <p>Ничего не нашли по запросу «{props.query}»</p>
  }
}
