/**
function minimax(node, depth)
    if node is a terminal node or depth = 0
        return the heuristic value of node
    if the adversary is to play at node
        let α := +∞
        foreach child of node
            α := min(α, minimax(child, depth-1))
    else {we are to play at node}
        let α := -∞
        foreach child of node
            α := max(α, minimax(child, depth-1))
    return α

heuristic adj.(教学或教育)启发式的
 */
import { evaluate } from './evaluate.js'

const childs = (node) => {
  let rst = []
  for (let i in node) for (let j in node[i]) if (node[i][j] === null) rst.push([i, j])
  return rst
}

const childNode = (node, position, val) => {
  // console.log({ node, position, val })
  let rst = node.map((x) => [...x])
  rst[position[0]][position[1]] = val
  return rst
}

const isTerminalNode = (node) => Math.abs(evaluate(node)) === Infinity || !node.some((x) => x.some((m) => m === null))

const minimax = (node, depth, isMax = true) => {
  // console.log('node', node)
  if (isTerminalNode(node) || depth === 0) return [evaluate(node), null]
  if (isMax) {
    let val = -Infinity
    let nextPosition = null
    for (const child of childs(node)) {
      // console.log(node, child, childNode(node, child, 1))
      const childVal = minimax(childNode(node, child, 1), depth - 1, !isMax)[0]
      if (childVal > val) {
        val = childVal
        nextPosition = child
      }
      // console.log('max', val, nextPosition, childNode(node, nextPosition, 1))
    }
    // console.log('max', val, nextPosition)
    return [val, nextPosition]
  } else {
    let val = Infinity
    let nextPosition = null
    for (const child of childs(node)) {
      const childVal = minimax(childNode(node, child, 0), depth - 1, !isMax)[0]
      // console.log('min', childVal, child, childNode(node, child, 0))
      if (childVal < val) {
        val = childVal
        nextPosition = child
      }
    }
    // console.log('min', val, nextPosition)
    return [val, nextPosition]
  }
}

const max = 1
const min = 0

const val_is = [
  [max, min, null],
  [null, max, null],
  [null, null, min],
]

// console.log(childs(val_is))

// console.log(minimax(val_is, 4))

export { minimax }
