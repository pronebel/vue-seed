import { ENUM_RANK_ITEM, ENUM_REQUEST_SCOPE } from 'utils/constant'
import { numberWithUnit } from '../bizs/filter'

import { calPercentInSum } from './utils'

/**
 * 健康险的产品指标数据转换
 * @param dataIndicator
 * @param avg
 * @param indicatorItem
 * @returns {{healthNum: *, seedNum: *, avgNum: *, unit, pie: {percent: number, desc: *}, healthPercent: string, avgPercent: string}}
 */
export let healthParse = function (dataIndicator = {}, avg = {}, indicatorItem) {
  let healthNum, seedNum, avgNum
  let unit = indicatorItem.unit

  let curIndiSeed = indicatorItem.seed
  let dbKey = indicatorItem.dbKey

  if (curIndiSeed === ENUM_RANK_ITEM.Prem.seed) {
    healthNum = dataIndicator.healthPrem
    avgNum = avg.healthPrem
    seedNum = dataIndicator[dbKey]
  } else if (curIndiSeed === ENUM_RANK_ITEM.Contract.seed) {
    healthNum = dataIndicator.healthContract
    avgNum = avg.healthContract
    seedNum = dataIndicator[dbKey]
  } else if (curIndiSeed === ENUM_RANK_ITEM.PerAgentPrem.seed) {
    healthNum = dataIndicator.perAgentHealthPrem
    avgNum = avg.perAgentHealthPrem
    seedNum = dataIndicator[dbKey]
  } else if (curIndiSeed === ENUM_RANK_ITEM.PerAgentContract.seed) {
    healthNum = dataIndicator.perAgentHealthContract
    avgNum = avg.perAgentHealthContract
    seedNum = dataIndicator[dbKey]
  } else if (curIndiSeed === ENUM_RANK_ITEM.PerContractPrem.seed) {
    healthNum = dataIndicator.perContractHealthPrem

    avgNum = avg.perContractHealthPrem
    seedNum = dataIndicator[dbKey]
  }

  let desc = numberWithUnit(healthNum, unit)
  let percent
  if (isNaN(healthNum) || healthNum <= 0) {// healthNum <=0 当作0处理
    percent = 0
  } else {
    percent = healthNum / seedNum
  }
  let pie = {percent, desc}

  let percentObj = calPercentInSum(avgNum, healthNum)
  let avgPercent = percentObj.percent1
  let healthPercent = percentObj.percent2

  return {
    healthNum,
    seedNum,
    avgNum,
    unit,
    pie,
    healthPercent: (healthPercent * 100) + '%',
    avgPercent: (avgPercent * 100) + '%'
  }

}

/**
 * private:产品信息转换为通用形式
 * @param productItem
 * @param indicatorItem
 * @returns {*}
 */
let productTransform = function (productItem, indicatorItem) {

  let unit = indicatorItem.unit
  let curIndiSeed = indicatorItem.seed

  let retObj = {
    unit,
    productName: productItem.productName,
    productType: productItem.productType
  }

  if (curIndiSeed === ENUM_RANK_ITEM.Prem.seed) {

    retObj['number'] = productItem.wonPrem
    retObj['avg'] = productItem.wonPremAvg
    return retObj

  } else if (curIndiSeed === ENUM_RANK_ITEM.Contract.seed) {
    retObj['number'] = productItem.wonContract
    retObj['avg'] = productItem.wonContractAvg
    return retObj

  } else if (curIndiSeed === ENUM_RANK_ITEM.PerAgentPrem.seed) {

    retObj['number'] = productItem.perAgentPrem
    retObj['avg'] = productItem.perAgentPremAvg
    return retObj

  } else if (curIndiSeed === ENUM_RANK_ITEM.PerAgentContract.seed) {

    retObj['number'] = productItem.perAgentContract
    retObj['avg'] = productItem.perAgentContractAvg
    return retObj

  } else if (curIndiSeed === ENUM_RANK_ITEM.PerContractPrem.seed) {
    retObj['number'] = productItem.perContractPrem
    retObj['avg'] = productItem.perContractPremAvg
    return retObj
  } else {
    return null
  }
}
/**
 * 健康县产品信息转换
 * @param productlist
 * @param indicator
 * @returns {Array}
 */
export let productParse = function (productlist, indicator) {
  let productArr = []

  productlist.sort(function (a, b) {
    let dbKey = indicator.dbKey
    return b[dbKey] - a[dbKey]
  })

  for (let i = 0; i < productlist.length; i++) {
    let transItem = productTransform(productlist[i], indicator)
    if (transItem) {
      productArr.push(transItem)
    }
  }

  return productArr
}
