let unavailableItems = [
  { startPx: 10, endPx: 30 },
  { startPx: 55, endPx: 65 },
  { startPx: 35, endPx: 50 },
  { startPx: 20, endPx: 40 },
  { startPx: 60, endPx: 70 },
]

const unionItem = unavailableItems.reduce(
  (acc, item) => {
    if (acc.min > item.startPx) {
      acc.min = item.startPx
    }

    if (acc.max < item.endPx) {
      acc.max = item.endPx
    }

    return acc
  },
  { min: unavailableItems[0].startPx, max: unavailableItems[0].endPx }
)

const result = {
  startPx: unionItem.min,
  endPx: unionItem.max,
}

console.log('unionItem', result)
// run node src/excercise/index.js to execute the function
