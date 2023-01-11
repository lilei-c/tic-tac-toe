import { useEffect } from 'react'
import { useState } from 'react'
import { theWinner, isBoardFull, minimax } from './bot/minimax'
import './App.css'

const arrayN = (n) => Array(n).fill(null)

const Square = ({ value, onClick }) => {
  const show = (value) => ({ 1: 'X', 0: 'O' }[value])
  return (
    <button className='square' onClick={onClick}>
      {show(value)}
    </button>
  )
}

const Board = ({ squares, onClick }) => {
  return arrayN(3).map((_, i) => (
    <div key={i} className='board-row'>
      {arrayN(3).map((_, j) => (
        <Square key={j} value={squares[i][j]} onClick={() => onClick(i, j)} />
      ))}
    </div>
  ))
}

const Game = () => {
  const [isBotStep, isBotStepX] = useState(false)
  const [winner, winnerX] = useState(null)
  const [draw, drawX] = useState(false)
  const isGameOver = !!winner || draw
  const [squares, squaresX] = useState(arrayN(3).map((_) => arrayN(3)))
  const onClickBoard = (i, j) => {
    if (isGameOver) return
    if (squares[i][j] !== null) return
    squares[i][j] = 0
    squaresX([...squares])
  }

  useEffect(() => {
    console.log(isBotStep)
    if (!isGameOver && isBotStep) {
      // boot play
      const score = minimax(squares, 2)
      console.log({ score })
      const [i, j] = score[1]
      squares[i][j] = 1
      squaresX((_) => [...squares])
    }
  }, [isBotStep])

  useEffect(() => {
    console.log(squares)
    const winner = theWinner(squares)
    console.log(winner, squares)
    if (winner !== null) winnerX(winner === 1 ? 'bot' : 'human')
    else isBoardFull(squares) && drawX(true)
    isBotStepX(!isBotStep)
  }, [squares])

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={squares} onClick={onClickBoard} />
      </div>
      <div className='game-info'>
        <div>{isGameOver && 'game over'}</div>
        <div>{winner && `${winner} 胜出`}</div>
        <div>{draw && '平局'}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

const App = Game

export default App
