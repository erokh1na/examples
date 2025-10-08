import { Search } from "@/core/lib"
import styles from "./page-search.module.scss"

export const PageSearch = () => {
  return (
    <div className={styles.container}>
      <Search />
    </div>
  )
}
