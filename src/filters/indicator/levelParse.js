import { ENUM_RANK_ITEM, ENUM_REQUEST_SCOPE } from 'utils/constant'
import { numberWithUnit } from '../bizs/filter'
import { calPercentInSum } from './utils'
/**
 * 计算两个数字的和占比
 * @param num1
 * @param num2
 * @returns {*}
 */
let calPrecent = function (num1, num2) {
  if (isNaN(num1)) {
    num1 = 0
  } else {
    num1 = parseFloat(num1)
  }
  if (isNaN(num2)) {
    num2 = 0
  } else {
    num2 = parseFloat(num2)
  }
  let total = num1 + num2

  if (total === 0) {
    return [0, 0]
  } else {
    let per1 = num1 / total
    let per2 = num2 / total
    return [
      (per1 * 100 + '%'), (per2 * 100 + '%')
    ]
  }
}

/**
 * 职级的数据转换
 * @param dataIndicator
 * @param avg
 * @param indicatorItem
 * @returns {*}
 */
export let levelParse = function (dataIndicator = {}, avg = {}, indicatorItem) {

  let unit = indicatorItem.unit

  let retObj = {
    unit,
    salesman: {
      number: 0,
      avg: 0
    },
    chief: {
      number: 0,
      avg: 0
    }
  }

  let curIndiSeed = indicatorItem.seed

  let unitNum = 1//

  if (curIndiSeed === ENUM_RANK_ITEM.nPayroll.seed) {
    retObj.salesman.number = dataIndicator.employeeMember - dataIndicator.managerEmployee

    retObj.salesman.avg = avg.employeeMember - avg.managerEmployee
    retObj.chief.number = dataIndicator.managerEmployee
    retObj.chief.avg = avg.managerEmployee

  } else if (curIndiSeed === ENUM_RANK_ITEM.nContributor.seed) {
    retObj.salesman.number = dataIndicator.winner - dataIndicator.managerWinner
    retObj.salesman.avg = avg.winner - avg.managerWinner
    retObj.chief.number = dataIndicator.managerWinner
    retObj.chief.avg = avg.managerWinner
  } else if (curIndiSeed === ENUM_RANK_ITEM.nRate.seed) {
    unitNum = 100
    retObj.salesman.number = dataIndicator.agentActiveRate
    retObj.salesman.avg = avg.agentActiveRate
    retObj.chief.number = dataIndicator.managerActiveRate
    retObj.chief.avg = avg.managerActiveRate
  } else {
    retObj = null
  }

  if (retObj) {
    let percentSalesman = calPercentInSum(retObj.salesman.number * unitNum, retObj.salesman.avg * unitNum)
    retObj.salesman.numPercent = (percentSalesman.percent1 * 100) + '%'
    retObj.salesman.avgPercent = (percentSalesman.percent2 * 100) + '%'

    let percentChief = calPercentInSum(retObj.chief.number * unitNum, retObj.chief.avg * unitNum)
    retObj.chief.numPercent = (percentChief.percent1 * 100) + '%'
    retObj.chief.avgPercent = (percentChief.percent2 * 100) + '%'
    return retObj
  } else {
    return null
  }

}
