import { ENUM_REQUEST_SCOPE, ENUM_RANK_ITEM } from 'utils/constant'

/**
 * 排行相关的数据转换
 * @param list
 * @param indicator
 * @returns {[*,*,*]}
 */
export let rankTransform = function (list, indicator) {

  let emptyCup = {
    agentName: '虚位以待',
    number: 'N/A',
    unit: ''
  }

  if (list && list.length > 0) {
    let retArr = []

    for (let i = 0; i < list.length; i++) {
      let __item = list[i]
      let number = __item[indicator.dbKey]
      if (number > 0) {
        // 数值为正,才为排行
        retArr.push({
          agentName: __item.agentName,
          number: number,
          unit: indicator.unit
        })
      }

    }
    if (retArr.length === 1) {
      retArr.push(emptyCup)
      retArr.push(emptyCup)
    } else if (retArr.length === 2) {
      retArr.push(emptyCup)
    } else if (retArr.length === 0) {
      retArr = [emptyCup, emptyCup, emptyCup]
    }

    return retArr
  } else {
    return [emptyCup, emptyCup, emptyCup]
  }
}

/**
 * 组装默认奖杯数据
 * @param list
 * @param projectName
 * @param unit
 * @returns {*}
 */
let getCupData = function (list, projectName, unit) {

  if (list && list.length > 0) {

    return {
      projectName: projectName,
      list: list,
      unit: unit
    }
  } else {

    return {
      projectName: projectName,
      list: [{
        agentName: '虚位以待',
        num: 'N/A'
      }],
      unit: ''
    }

  }
}

/**
 * 冠军数据排行
 * @param championData
 * @param requestScope
 * @returns {Array}
 */
export let championTransform = function (championData, requestScope) {
  let indiArr = []
  let __data = championData

    indiArr.push(getCupData(__data.prem, '保费冠军', '元'))
    indiArr.push(getCupData(__data.contract, '件数冠军', '件'))


  return indiArr
}
