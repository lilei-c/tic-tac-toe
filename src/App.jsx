import { useEffect } from 'react'
import { useState } from 'react'
import { minimax } from './bot/minimax'
import './App.css'

const arrayN = n => Array(n).fill(null)

const Square = ({ value, onClick }) => {
  const show = value => ({ 1: 'X', 0: 'O' })[value]
  return <button className='square' onClick={onClick}>{show(value)}</button>
}

const Board = ({ squares, onClick }) => {
  return arrayN(3).map((_, i) => <div key={i} className="board-row">
    {arrayN(3).map((_, j) => <Square key={j} value={squares[i][j]} onClick={() => onClick(i, j)}
    />)}
  </div>)
}

const Game = () => {
  const [isBotStep, setisBotStep] = useState(false)
  const [winner, winnerX] = useState(null)
  const isGameOver = !!winner
  const [squares, setSquares] = useState(arrayN(3).map(_ => arrayN(3)))
  const onClickBoard = (i, j) => {
    squares[i][j] = 0
    setSquares([...squares])
    setisBotStep(true)
  }

  useEffect(() => {
    console.log(isBotStep)
    if (isBotStep) {
      // boot play
      const score = minimax(squares, 2)
      const [i, j] = score[1]
      squares[i][j] = 1
      setSquares(_ => [...squares])
      setisBotStep(x => x = false)
      if (Math.abs(score[0]) === Infinity) {
        console.log('end')
        winnerX(score[0] === Infinity ? 'bot' : 'human')
      }
    }
  }, [isBotStep])

  return <div className="game">
    <div className="game-board">
      <Board squares={squares} onClick={onClickBoard} />
    </div>
    <div className="game-info">
      <div>{isGameOver && 'isGameOver'}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
}

const App = Game

export default App
