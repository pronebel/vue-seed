import { get, post } from '../utils/base'


/**
 * 获取直辖团队和育成同G团队
 * @param agentId
 */
function getTeams (agentId) {
  return post('/iv/agent/queryteam', {agentId}, {
    cache: {
      exp: 5 * 60 * 1000
    }
  })
}

/**
 * 查看指标项
 * @param nodeId
 * @param dateCycle
 */
function queryPerf (data = {}) {
  let {nodeId, dateCycle, level, requestScope} = data
  return post('/iv/agent/queryPerf', {nodeId, dateCycle, level, requestScope})
}

/**
 * 查看昨日明细
 * @param nodeId
 */
function queryPreDetail (nodeId, level, requestScope) {
  return post('/iv/agent/queryPreDetail', {nodeId, level, requestScope})
}

/**
 * 查看查看奖杯排行
 * @param nodeId
 */
function queryChampion (nodeId, level, dateCycle, requestScope) {
  return post('/iv/agent/queryChampion', {nodeId, level, dateCycle, requestScope})
}

/**
 * 查看荣誉排行
 * @param nodeId
 * @param level
 * @param dateCycle
 * @param rankItem
 */
function queryHonorRoll (nodeId, level, requestScope, dateCycle, rankItem) {
  return post('/iv/agent/queryHonorRoll',
    {nodeId, level, requestScope, dateCycle, rankItem}
  )
}

/**
 * 按下一级查看
 * @param nodeId
 * @param requestScope
 * @param dateCycle
 */
function queryNextLevel (nodeId, level, requestScope, dateCycle) {
  return post('/iv/agent/queryNextLevel', {nodeId, level, requestScope, dateCycle})
}

/**
 * 查询自保件详情
 * @param nodeId
 * @param dateCycle
 */
function querySelfInsure (nodeId, dateCycle) {
  return post('/iv/agent/querySelfInsure', {nodeId, dateCycle})
}

function queryManDetail (nodeId, dateCycle) {
  return post('/iv/agent/queryManDetail', {nodeId, dateCycle})
}

/**
 * 按直接查询
 * @param nodeId
 * @param dateCycle
 */
function queryJobGradeDetail (data, opts = {}) {
  let {nodeId, dateCycle, level, requestScope} = data
  level = parseInt(level)
  return post('/iv/agent/queryJobGradeDetail', {nodeId, dateCycle, level, requestScope}, opts)
}

function queryProductDetail (data, opts = {}) {
  let {nodeId, requestScope, level, dateCycle} = data
  level = parseInt(level)
  return post('/iv/agent/queryProductDetail', {nodeId, requestScope, level, dateCycle}, opts)
}

function getProductDict () {
  let groupcode = 'product_type'
  return get('/iv/agent/readDic', {groupcode})
}

export default {
  getProductDict,
  getTeams,
  queryPerf,
  queryPreDetail,
  queryChampion,
  queryHonorRoll,
  queryNextLevel,
  querySelfInsure,
  queryManDetail,
  queryJobGradeDetail,
  queryProductDetail

}
