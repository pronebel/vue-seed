import { ENUM_RANK_ITEM, ENUM_REQUEST_SCOPE } from 'utils/constant'

/**
 * 计算超过多少
 * @param rank
 * @param totalNumber
 * @returns {number}
 */
let beyond = function (rank, totalNumber) {
  let tmpBy = 1 - ((rank - 1) / totalNumber)
  return parseInt(parseFloat(tmpBy) * 100) / 100
}

/**
 * 组装指标对象
 * @param number 数值
 * @param average 平均
 * @param rank 排行
 * @param totalNumber rank总人数
 * @param name 指标名称
 * @param unit 单位
 * @returns {*}
 */
let assembleIndicator = function (number, average, rank, totalNumber, {name, unit, seed, dbKey}, compareIndicatorVal) {

  let diff = null
  if (!isNaN(number) && !isNaN(compareIndicatorVal)) {
    diff = Math.round(number - compareIndicatorVal)
  }

  let roundNum = unit === '%' ? Math.round(number * 100) : Math.round(number) // 用于作大于0的判断

  return {
    seed,
    key: 'key' + Date.now(),
    name,
    number,
    roundNum,
    diff,
    unit,
    average,
    rank,
    dbKey,
    percent: roundNum > 0 ? beyond(rank, totalNumber) : 0
  }

}

/**
 * 获取团队人力的指标项
 * @param __indicator
 * @param __average
 * @param __rank
 * @returns {Array}
 */
export let getManpowerIndicator = function (indicatorRes = {}, averageRes = {}, rankRes = {}, compareRes = {}) {
  let __indicator = indicatorRes.dailyIndicator || {}
  let __average = averageRes.dailyIndicatorAverage || {}
  let __rank = rankRes.dailyIndicatorRank || {}
  let compareIndicator = compareRes.dailyIndicator|| {}

  let rankTotalNumber = __rank.rankTotalNumber

  let indicator = {
    employeeMember: __indicator.employeeMember, // 在职人力
    recommendedMember: __indicator.recommendedMember, // 增员人力
    winner: __indicator.winner, // 出单人力
    activeRate: __indicator.activeRate// 活动率
  }

  let average = {
    employeeMember: __average.employeeMember, // 在职人力
    recommendedMember: __average.recommendedMember
    , // 增员人力
    winner: __average.winner, // 出单人力
    activeRate: __average.activeRate// 活动率
  }

  let rank = {
    employeeMember: __rank.employeeMember, // 在职人力
    recommendedMember: __rank.recommendedMember, // 增员人力
    winner: __rank.winner, // 出单人力
    activeRate: __rank.activeRate // 活动率
  }

  let indicatorList = []

  indicatorList.push(assembleIndicator(indicator.employeeMember, average.employeeMember, rank.employeeMember, rankTotalNumber, ENUM_RANK_ITEM.nPayroll, compareIndicator.employeeMember))

  indicatorList.push(assembleIndicator(indicator.recommendedMember, average.recommendedMember, rank.recommendedMember, rankTotalNumber, ENUM_RANK_ITEM.nAdd, compareIndicator.recommendedMember))

  indicatorList.push(assembleIndicator(indicator.winner, average.winner, rank.winner, rankTotalNumber, ENUM_RANK_ITEM.nContributor, compareIndicator.winner))

  indicatorList.push(assembleIndicator(indicator.activeRate, average.activeRate, rank.activeRate, rankTotalNumber, ENUM_RANK_ITEM.nRate, compareIndicator.activeRate))

  return indicatorList
}

/**
 * 获取团队详情的指标项
 * @param __indicator
 * @param __average
 * @param __rank
 * @returns {Array}
 */
export let getGroupIndicator = function (indicatorRes = {}, averageRes = {}, rankRes = {}, compareRes = {}) {
  let __indicator = indicatorRes.dailyIndicator || {}
  let __contiRate = indicatorRes.dailyContiRate|| {}

  let __average = averageRes.dailyIndicatorAverage || {}
  let __contiRateAvg = averageRes.dailyContiRateAverage|| {}

  let __rank = rankRes.dailyIndicatorRank || {}
  let __contiRateRank = rankRes.dailyContiRateRank|| {}

  let compareIndicator = compareRes.dailyIndicator|| {}
  let compareContiRage = compareRes.dailyContiRate|| {}

  let rankTotalNumber = __rank.rankTotalNumber
  let contiRateToatalNumber = __contiRateRank.rankTotalNumber

  let indicator = {
    wonPrem: __indicator.wonPrem,// 保费
    wonContract: __indicator.wonContract,// 件数
    perAgentPrem: __indicator.perAgentPrem,// 人均保费
    perAgentContract: __indicator.perAgentContract,// 人均件数
    perContractPrem: __indicator.perContractPrem,// 件均保费
    rate13: __contiRate.rate13,// 13个月继续率
    rate13Check: __contiRate.contiRate13Denominator
  }

  let average = {
    wonPrem: __average.wonPrem,// 保费
    wonContract: __average.wonContract,// 件数
    perAgentPrem: __average.perAgentPrem,// 人均保费
    perAgentContract: __average.perAgentContract,// 人均件数
    perContractPrem: __average.perContractPrem,// 件均保费
    rate13: __contiRateAvg.rate13// 13个月继续率
  }

  let rank = {
    wonPrem: __rank.wonPrem,// 保费
    wonContract: __rank.wonContract,// 件数
    perAgentPrem: __rank.perAgentPrem,// 人均保费
    perAgentContract: __rank.perAgentContract,// 人均件数
    perContractPrem: __rank.perContractPrem,// 件均保费
    rate13: __contiRateRank.rate13,// 13个月继续率
  }

  let indicatorList = []

  indicatorList.push(assembleIndicator(indicator.wonPrem, average.wonPrem, rank.wonPrem, rankTotalNumber, ENUM_RANK_ITEM.Prem, compareIndicator.wonPrem))

  indicatorList.push(assembleIndicator(indicator.wonContract, average.wonContract, rank.wonContract, rankTotalNumber, ENUM_RANK_ITEM.Contract, compareIndicator.wonContract))

  indicatorList.push(assembleIndicator(indicator.perAgentPrem, average.perAgentPrem, rank.perAgentPrem, rankTotalNumber, ENUM_RANK_ITEM.PerAgentPrem, compareIndicator.perAgentPrem))

  indicatorList.push(assembleIndicator(indicator.perAgentContract, average.perAgentContract, rank.perAgentContract, rankTotalNumber, ENUM_RANK_ITEM.PerAgentContract, compareIndicator.perAgentContract))

  indicatorList.push(assembleIndicator(indicator.perContractPrem, average.perContractPrem, rank.perContractPrem, rankTotalNumber, ENUM_RANK_ITEM.PerContractPrem, compareIndicator.perContractPrem))

  if (indicator.rate13Check > 0) {
    indicatorList.push(assembleIndicator(indicator.rate13, average.rate13, rank.rate13, contiRateToatalNumber, ENUM_RANK_ITEM.Rate13, compareContiRage.rate13))
  }

  return indicatorList
}

/**
 * 获取个人的指标项:保费、件数、件均保费、增员人力、13个月继续率、25个月继续率
 * @param __indicator
 * @param __average
 * @param __rank
 */
export let getPersonIndicator = function (indicatorRes = {}, averageRes = {}, rankRes = {}, compareRes = {}) {

  let __indicator = indicatorRes.dailyIndicator || {}
  let __contiRate = indicatorRes.dailyContiRate|| {}
  console.log(__contiRate)

  let __average = averageRes.dailyIndicatorAverage || {}
  let __contiRateAvg = averageRes.dailyContiRateAverage|| {}

  let __rank = rankRes.dailyIndicatorRank || {}
  let __contiRateRank = rankRes.dailyContiRateRank|| {}

  let compareIndicator = compareRes.dailyIndicator|| {}
  let compareContiRage = compareRes.dailyContiRate|| {}

  let rankTotalNumber = __rank.rankTotalNumber
  let contiRateToatalNumber = __contiRateRank.rankTotalNumber

  let indicator = {
    wonPrem: __indicator.wonPrem,// 保费
    wonContract: __indicator.wonContract,// 件数
    perContractPrem: __indicator.perContractPrem,// 件均保费
    recommendedMember: __indicator.recommendedMember,// 增员人力
    rate13: __contiRate.rate13,// 13个月继续率
    rate25: __contiRate.rate25,// 25个月继续率
    rate13Check: __contiRate.contiRate13Denominator,
    rate25Check: __contiRate.contiRate25Denominator
  }

  let average = {
    wonPrem: __average.wonPrem,// 保费
    wonContract: __average.wonContract,// 件数
    perContractPrem: __average.perContractPrem,// 件均保费
    recommendedMember: __average.recommendedMember,// 增员人力
    rate13: __contiRateAvg.rate13,// 13个月继续率
    rate25: __contiRateAvg.rate25// 25个月继续率
  }

  let rank = {
    wonPrem: __rank.wonPrem,// 保费
    wonContract: __rank.wonContract,// 件数
    perContractPrem: __rank.perContractPrem,// 件均保费
    recommendedMember: __rank.recommendedMember,// 增员人力
    rate13: __contiRateRank.rate13,// 13个月继续率
    rate25: __contiRateRank.rate25,// 25个月继续率
  }

  let indicatorList = []

  indicatorList.push(assembleIndicator(indicator.wonPrem, average.wonPrem, rank.wonPrem, rankTotalNumber, ENUM_RANK_ITEM.Prem, compareIndicator.wonPrem))

  indicatorList.push(assembleIndicator(indicator.wonContract, average.wonContract, rank.wonContract, rankTotalNumber, ENUM_RANK_ITEM.Contract, compareIndicator.wonContract))

  indicatorList.push(assembleIndicator(indicator.perContractPrem, average.perContractPrem, rank.perContractPrem, rankTotalNumber, ENUM_RANK_ITEM.PerContractPrem, compareIndicator.perContractPrem))

  indicatorList.push(assembleIndicator(indicator.recommendedMember, average.recommendedMember, rank.recommendedMember, rankTotalNumber, ENUM_RANK_ITEM.nAdd, compareIndicator.recommendedMember))
  if (indicator.rate13Check > 0) {
    indicatorList.push(assembleIndicator(indicator.rate13, average.rate13, rank.rate13, contiRateToatalNumber, ENUM_RANK_ITEM.Rate13, compareContiRage.rate13))
  }
  if (indicator.rate25Check > 0) {
    indicatorList.push(assembleIndicator(indicator.rate25, average.rate25, rank.rate25, contiRateToatalNumber, ENUM_RANK_ITEM.Rate25, compareContiRage.rate25))
  }

  return indicatorList
}

/**
 * 指标列表数据的转换
 * @param requestScope
 * @param __indicator
 * @param __average
 * @param __rank
 * @param compareIndicator
 * @returns {*}
 */
export let transformIndicatorList = function (requestScope, response = {}) {
  // res.dailyIndicator, res.dailyIndicatorAverage, res.dailyIndicatorRank

  let __indicator = response.di || {},
    __average = response.diAvg || {},
    __rank = response.diRank || {},
    compareIndicator = response.di2 || {}
  let ret
  if (requestScope === ENUM_REQUEST_SCOPE.P.value) {
    ret = getPersonIndicator(__indicator, __average, __rank, compareIndicator)
  } else if (requestScope === ENUM_REQUEST_SCOPE.TS.value || requestScope === ENUM_REQUEST_SCOPE.TM.value) {
    let gIndidator = getGroupIndicator(__indicator, __average, __rank, compareIndicator)

    let mIndicator = getManpowerIndicator(__indicator, __average, __rank, compareIndicator)

    ret = [].concat(gIndidator,mIndicator)
  } else {
    ret = []
  }
  console.log(ret)
  return ret
}

export let transformReportIndicatorList = function (requestScope, response = {}) {

  let __indicator = response.di || {},
    __average = response.diAvg || {},
    __rank = response.diRank || {},
    compareIndicator = response.di2 || {}
  let ret
  if (requestScope === ENUM_REQUEST_SCOPE.P.value) {
    ret = getPersonIndicator(__indicator, __average, __rank, compareIndicator)
  } else if (requestScope === ENUM_REQUEST_SCOPE.TS.value) {
    ret = getGroupIndicator(__indicator, __average, __rank, compareIndicator)
  } else if (requestScope === ENUM_REQUEST_SCOPE.TM.value) {
    ret = getManpowerIndicator(__indicator, __average, __rank, compareIndicator)
  } else {
    ret = []
  }
  console.log(ret)
  return ret
}

