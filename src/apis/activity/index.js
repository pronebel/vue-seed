import { get, post } from '../utils/base'

import fireEventApi from './fire'

/**
 * 查看nodeid参加的活动
 * @param agentId
 */
let findAttendEvents = function  (nodeId) {
  return post('/iv/act/findActivity', {nodeId}, {

  })
}
let findManageEvents = function  (nodeId) {
  return post('/iv/act/findActivity', {nodeId}, {

  })
}
let findAttendAwards = function (nodeId,activityId) {
  return post('/iv/act/findActivityAwards', {nodeId,activityId}, {

  })
}
let findManageAwards = function (nodeId,activityId) {
  return post('/iv/act/findActivityAwards', {nodeId,activityId}, {

  })
}

let findAwardDetail = function (nodeId,awardId) {
  return post('/iv/act/findAwardDetail',{nodeId,awardId})
}

let findPrizeDetail = function (nodeId,awardId) {
  return post('/iv/act/findPrizeDetail',{nodeId,awardId})
}

/**
 * xinhuo api
 * @param nodeId
 * @param awardId
 * @returns {*}
 */
let findRecommend = function (nodeId,awardId) {
  return post('/iv/act/fire/findRecommend',{nodeId,awardId})
}


let findSubNodes = function (nodeIdQuery,awardId) {
  return post('/iv/act/findNodeIdsSub', {nodeIdQuery,awardId}, {

  })
}

export default {
  findAttendEvents,
  findManageEvents,
  findAttendAwards,
  findManageAwards,
  findAwardDetail,
  findPrizeDetail,
  findSubNodes,
  ...fireEventApi
}
