export type Direction = "prev" | "next"
export type InputStateKeys = keyof InputState

export interface SelectedDates {
  first: Date | null
  last: Date | null
}

export interface InputState {
  value: string
  placeholder: string
}
