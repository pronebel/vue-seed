import { getJobLevelNameByVal } from 'utils/constant'
import fecha from 'fecha'
import { numberWithUnit } from '../bizs/filter'

/**
 *  按下一级查看的数据解析
 */

import { ENUM_RANK_ITEM } from 'utils/constant'

let calNumWithUnit = (num, unit) => {

  return numberWithUnit(num, unit)
}

function assembleList (datalist, levelName, perfItems = []) {

  let header = ['', levelName]

  perfItems.forEach(function (item) {
    header.push(item.name)
  })

  let list = []

  if (datalist && datalist.length > 0) {
    let sortPref = perfItems[0]
    let sortKey = sortPref.dbKey
    datalist.sort(function (a, b) {
      return b[sortKey] - a[sortKey]
    })

    for (let i = 0; i < datalist.length; i++) {
      let item = datalist[i]
      let itemArr = [item.nodeName]
      perfItems.forEach(function (perf) {

        let curKey = perf.dbKey
        let curVal = item[curKey]
        itemArr.push(calNumWithUnit(curVal, perf.unit))
      })
      list.push(itemArr)
    }
  }
  return {
    header,
    list
  }
}

/**
 * 组装下一级数据项
 * @param datalist
 * @param levelName
 * @param propItems:Array[{name,unit,key}],其中  unit如果为filter.xxx，则在计算单位的时候，需要进行filter的xxx解析
 * @returns {{header: [string,*], list: Array}}
 */
function assebleListByProp (datalist, levelName, propItems = []) {
  let header = ['', levelName]

  propItems.forEach(function (item) {
    header.push(item.name)
  })

  let list = []
  if (datalist && datalist.length > 0) {

    let sortPref = propItems[0]
    let sortKey = sortPref.prop
    let hasValList = [], noValList = []
    for (let i = 0; i < datalist.length; i++) {
      let __item = datalist[i]
      if (__item[sortKey]) {
        hasValList.push(__item)
      } else {
        noValList.push(__item)
      }
    }

    hasValList.sort(function (a, b) {
      let bVal = b[sortKey]
      let aVal = a[sortKey]
      return (bVal - aVal)
    })
    datalist = hasValList.concat(noValList)
    for (let i = 0; i < datalist.length; i++) {
      let item = datalist[i]
      let itemArr = [item.nodeName]
      propItems.forEach(function (proItem) {
        let strUnit = proItem.unit
        let propVal = item[proItem.prop]
        if (strUnit.indexOf('filter.') > -1) {
          let filterStrArr = strUnit.split('.')
          let filterKey = filterStrArr[1]

          if (filterKey === 'jobLevel') {
            itemArr.push(getJobLevelNameByVal(propVal))
          } else if (filterKey === 'time') {
            itemArr.push(fecha.format(new Date(propVal), 'YYYY-MM-DD'))
          } else {
            itemArr.push(propVal)
          }
        } else {
          itemArr.push(calNumWithUnit(propVal, proItem.unit))
        }
      })
      list.push(itemArr)
    }
  }
  return {
    header,
    list
  }
}

/**
 * 团队详情页面的数据解析
 * @param levelName
 * @param perfItem: RankItem的示例
 * @param dataTeam
 * @param dataPerson
 * @returns {Array}
 */
export let parseInGroupDetail = function (levelName, perfItem, data, isGroupAbove) {

  // 营业区以上
  if (isGroupAbove) {
    return assembleList(data, levelName, [perfItem])
  } else {
    // 营业组
    let perfName = perfItem.name
    /**
     * 人均保费 => 保费
     */
    if (perfName == ENUM_RANK_ITEM.PerAgentPrem.name) {
      return assembleList(data, levelName, [ENUM_RANK_ITEM.Prem])
    }

    /**
     * 人均件数 =>  件数
     */
    if (perfName == ENUM_RANK_ITEM.PerAgentContract.name) {
      return assembleList(data, levelName, [ENUM_RANK_ITEM.Contract])
    }

    /**
     * 其他为当前的指标项
     */
    return assembleList(data, levelName, [perfItem])
  }

}

/**
 * 团队人力详情页面的数据解析
 * @param levelName
 * @param perfItem
 * @param dataTeam
 * @param dataPerson
 * @returns {*}
 */
export let parseInManpowerDetail = function (levelName, perfItem, data, isGroupAbove) {


  /**
   * 营业区以上
   */
  if (isGroupAbove) {

    return assembleList(data, levelName, [perfItem])
  } else {
    let perfName = perfItem.name

    /**
     * 在职人力
     */
    if (perfName == ENUM_RANK_ITEM.nPayroll.name) {
      return assebleListByProp(data, levelName, [{
        name: '入职时间',
        prop: 'enterCompanyDate',
        unit: 'filter.time'
      }, {
        name: '职级',
        prop: 'agentGradeLevel',
        unit: 'filter.jobLevel'
      }])
    }

    /**
     * 出单人力
     */
    if (perfName == ENUM_RANK_ITEM.nContributor.name) {
      return assembleList(data, levelName, [ENUM_RANK_ITEM.Prem, ENUM_RANK_ITEM.Contract])
    }

    /**
     * 活动率
     */
    if (perfName == ENUM_RANK_ITEM.nRate.name) {
      return assembleList(data, levelName, [ENUM_RANK_ITEM.Prem, ENUM_RANK_ITEM.Contract])
    }

    /**
     * 其他为当前的指标项
     */
    return assembleList(data, levelName, [perfItem])
  }
}

/**
 * 团队业绩X报的数据解析
 */
export let parseInGroupReport = function (levelName, prefItem, data, isGroupAbove) {

  /**
   * 营业区以上
   */
  if (isGroupAbove) {

    let retData = assembleList(data, levelName, [ENUM_RANK_ITEM.Prem, ENUM_RANK_ITEM.Contract])

    return retData
  } else {

    return assembleList(data, levelName, [ENUM_RANK_ITEM.Prem, ENUM_RANK_ITEM.Contract])
  }

}

/**
 * 团队人力X报的数据解析
 */
export let parseInManpowerReport = function (levelName, prefItem, data, isGroupAbove) {

  // 营业区以上
  if (isGroupAbove) {
    return assembleList(data, levelName, [ENUM_RANK_ITEM.nAdd, ENUM_RANK_ITEM.nContributor])
  } else {
    return assembleList(data, levelName, [ENUM_RANK_ITEM.nAdd])
  }
}
