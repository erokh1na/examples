import { ticTacToeReducer } from "@/core/lib"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
