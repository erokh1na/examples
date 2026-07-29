import { Button } from "antd"
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"
import styles from "./tic-tac-toe.module.scss"
import { move, reset, selectCells, selectWinner } from "./tic-tac-toe.slice"

export const TicTacToe = () => {
  const cells = useSelector(selectCells)
  const winner = useSelector(selectWinner)
  const dispatch = useDispatch()

  return (
    <div className={styles.board}>
      <div className={styles.cells}>
        {cells.map((cell) => (
          <div className={styles.cell} key={cell.id} onClick={() => !winner && dispatch(move(cell.id))}>
            <div
              className={clsx({ [styles["cell_x"]]: cell.value === "X" }, { [styles["cell_o"]]: cell.value === "O" })}
            />
          </div>
        ))}
        {winner && <p className={styles.winner}>{`${winner} win!`}</p>}
      </div>

      <Button className={styles.button} onClick={() => dispatch(reset())}>
        Reset
      </Button>
    </div>
  )
}
