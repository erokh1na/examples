export interface Cell {
  id: number
  value: "" | "X" | "O"
}

export interface TicTacToeState {
  cells: Cell[]
  currentMove: number
  winner: Cell["value"] | "both"
}
