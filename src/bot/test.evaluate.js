import { evaluate } from './evaluate'

const val_is_1 = [
  [max, min, null],
  [null, null, null],
  [null, null, null],
]
const val_is_2 = [
  [null, min, null],
  [null, max, null],
  [null, null, null],
]
const val_is_infinity = [
  [max, min, null],
  [null, max, null],
  [null, null, max],
]
const val_is_infinity_2 = [
  [null, min, null],
  [max, max, max],
  [null, null, min],
]
const val_is_negative_infinity = [
  [null, min, null],
  [max, min, max],
  [null, min, min],
]

const datas = [
  val_is_1,
  val_is_2,
  val_is_infinity,
  val_is_infinity_2,
  val_is_negative_infinity,
]

console.time('time')
console.log(`
val_is_1,
val_is_2,
val_is_infinity,
val_is_infinity_2,
val_is_negative_infinity,
`)
console.log('--------------------------------')

datas.map(evaluate).forEach((x) => console.log(x))
console.timeEnd('time')
