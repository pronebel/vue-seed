export let calPercentInSum = function (num1, num2) {

  if (isNaN(num1) || isNaN(num2)) {
    return {
      percent1: 0,
      percent2: 0
    }
  }
  let rNum1 = Math.round(num1)
  let rNum2 = Math.round(num2)
  if (rNum1 <= 0 || rNum2 <= 0) {
    return {
      percent1: rNum1 > 0 ? 1 : 0,
      percent2: rNum2 > 0 ? 1 : 0
    }
  } else {
    let total = rNum1 + rNum2

    return {
      percent1: rNum1 / total,
      percent2: rNum2 / total
    }
  }
}

export let calPercent = function (num, total) {
  if (isNaN(num) || num <= 0 || isNaN(total) || total <= 0) {
    return 0
  } else {
    num = Math.round(num)
    total = Math.round(total)
    return num / total
  }
}
