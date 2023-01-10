/**
 * max 1
 * min 0
 *
 * val 策略: 所有 max 可能的次数 - min 可能的次数
 */
const max = 1
const min = 0

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

const datas = [val_is_1, val_is_2, val_is_infinity, val_is_infinity_2, val_is_negative_infinity]

const sumMM = (arr) => {
  let rst = {}
  arr.forEach((m) => {
    rst[m] = rst[m] + 1 || 1
  })
  return rst
}
const score = (m) => {
  if (m[max] === 3) return Infinity
  else if (m[min] === 3) return -Infinity
  else if (m[max] && !m[min]) return 1
  else if (m[min] && !m[max]) return -1
  return 0
}
const sum = (arr) => arr.reduce((a, b) => a + b, 0)
const colToRow = (arr) =>
  Array(arr.length)
    .fill(null)
    .map((_, i) =>
      Array(arr.length)
        .fill(null)
        .map((_, j) => arr[j][i])
    )
const evaluate = (state) => {
  let rst = 0
  // 遍历行
  rst += sum(state.map(sumMM).map(score))
  // 遍历列
  rst += sum(colToRow(state).map(sumMM).map(score))
  // 对角线
  rst += sum(
    [
      [state[0][0], state[1][1], state[2][2]],
      [state[2][0], state[1][1], state[0][2]],
    ]
      .map(sumMM)
      .map(score)
  )
  return rst
}
const log = (x) => console.log(x)

console.time('time')
console.log(`
val_is_1,
val_is_2,
val_is_infinity,
val_is_infinity_2,
val_is_negative_infinity,
`)
console.log('--------------------------------')
// Array(100)
//   .fill(null)
//   .forEach((m) => datas.map(evaluate))
datas.map(evaluate).forEach(log)
console.timeEnd('time')

export { evaluate }
