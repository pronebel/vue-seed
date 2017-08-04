import { get, post } from '../utils/base'



let findAgentHead = function  (nodeId) {
  return post('/iv/task/findAgentHead', {nodeId}, {

  })
}



let findIndicator = function  (nodeIdQuery,indicators) {
  return post('/iv/task/findIndicators', {nodeIdQuery,indicators}, {

  })
}
let findNodeDetail = function  (nodeIdQuery,opts={}) {
  return post('/iv/task/findNodeDetail', {nodeIdQuery}, opts)
}
let findNodeIds = function  (nodeId) {
  return post('/iv/task/findNodeIds', {nodeId}, {

  })
}


let findTaskIndicator = function  (nodeId,scope) {
  return post('/iv/task/findTaskIndicator', {nodeId,scope}, {

  })
}

let setTargetDate = function (nodeId, targetDate) {
  return post('/iv/task/setNextDate', {nodeId,targetDate}, {

  })
}


export default {
  findNodeDetail,
  findIndicator,
  findAgentHead,
  findTaskIndicator,
  findNodeIds,
  setTargetDate
}
