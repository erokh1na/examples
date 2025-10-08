export interface SearchProps {
  query?: string
  results?: any
  onChangeQuery?: (query: string) => void
}

export interface SearchInputProps extends Pick<SearchProps, "query" | "onChangeQuery"> {
  onClear: () => void
}

export interface SearchResultsProps extends Pick<SearchProps, "query" | "results"> {
  isStaleResults?: boolean
}
