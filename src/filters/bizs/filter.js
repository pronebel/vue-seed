import store from 'store'
import { ENUM_DATE_CYCLE, ENUM_JOB_GRADE } from 'utils/constant'

/**
 * 获取日期单位名
 * @param unit
 * @returns {*}
 */
export let dateUnitName = function (unit) {
  if (unit === ENUM_DATE_CYCLE.theMonth.value || unit === ENUM_DATE_CYCLE.preMonth.value) {
    return '月'
  } else if (unit === ENUM_DATE_CYCLE.theWeek.value || unit === ENUM_DATE_CYCLE.preWeek.value) {
    return '周'
  } else {
    return ''
  }
}

/**
 * 根据type获取产品小标
 * @param typeVal
 * @returns {string}
 */
export let productTypeName = function (typeVal) {
  let arr = store.get('PRODUCT_KEYS')
  if (arr && arr.length > 0) {
    let typeName = '-'
    for (let i = 0; i < arr.length; i++) {
      if (typeVal.toString() === arr[i].itemcode) {
        typeName = arr[i].itemnameZh
        break
      }
    }
    return typeName
  } else {
    return '-'
  }
}

/**
 * 获取下一级的级别数据
 * @param level
 * @returns {{}}
 */
export let gradeNextGrade = function (level) {
  level = parseInt(level)
  let nextLevel
  if (level > 0) {
    nextLevel = level - 1

    let __data = {}
    for (let prop in ENUM_JOB_GRADE) {
      if (ENUM_JOB_GRADE[prop].value == nextLevel) {
        __data = ENUM_JOB_GRADE[prop]
        break
      }
    }
    return __data
  } else {
    return {}
  }

}

/**
 * 格式化数据和单位
 * @param num
 * @param unit
 * @returns {*}
 */
export let numberformat = function (num, unit = '') {
  if (isNaN(num)) {
    return 'N/A'
  }

  let absNum = Math.abs(num)
  if (absNum >= 100000000) {// 亿
    let tmpN = parseFloat(num / 100000000)

    return {
      number: tmpN.toFixed(2),
      unit: '亿' + unit
    }

  } else if (absNum >= 10000) {// 万
    let tmpN = parseFloat(num / 10000)

    return {
      number: tmpN.toFixed(2),
      unit: '万' + unit
    }
  } else {
    return {
      number: num.toFixed(0),
      unit: unit
    }
  }
}

/**
 * 根据单位格式化数字信息
 * @param number
 * @param unit
 * @param retType
 * @returns {*}
 */
export let numberWithUnit = function (number, unit, retType = false, numPlus = false) {
  if (number === undefined || number === null || isNaN(number)) {
    let strNum = number === '无数据' ? '无数据' : 'N/A'
    return '<span class="format-number">' + strNum + '</span>'
  }

  let ret = {}

  if (unit !== '%') {
    ret = numberformat(number, unit)
  } else {
    ret = {
      number, unit
    }
  }

  if (retType) {
    return ret
  } else {
    let tmpNum = parseInt(ret.number)
    let tmpNumFloat = parseFloat(ret.number)
    let numStr = (Math.abs(tmpNum) < Math.abs(tmpNumFloat)) ? tmpNumFloat.toFixed(2) : tmpNum
    let unitStr = ret.unit

    // 根据需要添加 + 号
    let strPlus = ''
    if (numPlus) {
      if (tmpNumFloat > 0) {
        strPlus = '+ '
      }
    }

    if (unit === '%') {
      numStr = (parseFloat(numStr) * 100).toFixed(0) + '%'
      unitStr = ''
    }

    // 给负数增加 空格
    if (numStr.toString().indexOf('-') > -1) {
      let numStrArr = numStr.toString().split('-')
      console.log(numStrArr)
      numStr = '- ' + numStrArr[1]
    }

    return '<span class="format-number">' + strPlus + numStr + '</span><span class="format-unit">' + unitStr + '</span>'
  }
}
