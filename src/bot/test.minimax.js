import { max, min } from './const'
import { minimax } from './minimax'

const val_is = [
  [min, null, max],
  [null, max, null],
  [min, min, null],
]

console.log(minimax(val_is, 2))
