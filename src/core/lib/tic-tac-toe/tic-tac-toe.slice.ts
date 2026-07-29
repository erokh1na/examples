import { RootState } from "@/core/store"
import { createSlice } from "@reduxjs/toolkit"
import { Cell, TicTacToeState } from "./types"

const initialState: TicTacToeState = {
  cells: Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    value: "",
  })),
  currentMove: 0,
  winner: "",
}

function calculateWinner(cells: TicTacToeState["cells"]): Cell["value"] {
  const winnerPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of winnerPositions) {
    const valueA = cells[a].value
    if (valueA && valueA === cells[b].value && valueA === cells[c].value) {
      return valueA as "X" | "O"
    }
  }
  return ""
}

export const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    move: (state, action) => {
      const cellIndex = state.cells.findIndex((cell) => cell.id === action.payload)

      if (state.cells[cellIndex].value || state.winner) return

      const isX = state.currentMove % 2 === 0

      state.cells[cellIndex].value = isX ? "X" : "O"
      state.currentMove = state.currentMove + 1
      state.winner = calculateWinner(state.cells)

      if (!state.winner && state.cells.every((cell) => cell.value)) {
        state.winner = "both"
      }
    },
    reset: () => initialState,
  },
})

export const selectCells = (state: RootState) => state.ticTacToe.cells
export const selectWinner = (state: RootState) => state.ticTacToe.winner

export const { move, reset } = ticTacToeSlice.actions

export default ticTacToeSlice.reducer
