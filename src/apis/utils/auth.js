import store from 'store'

import { ENUM_JOB_LEVEL } from 'utils/constant'

export default {

  clear () {
    store.remove('Token')
    store.remove('agent')
    store.remove('Uid')
  },

  saveToken(token){
    store.set('Token', token)

  },
  saveDbTime(timeData){
    store.set('dbTime', timeData)
  },
  saveAgent(agent, timeData){
    store.set('agent', agent)
    store.set('dbTime', timeData)

  },
  getDateNow(){
    let timeData = store.get('dbTime')
    if (timeData && timeData.timeNow) {
      return new Date(timeData.timeNow)
    } else {
      return new Date()
    }
  },
  getServerDate(){
    let timeData = store.get('dbTime')
    if (timeData && timeData.serverTime) {
      return new Date(timeData.serverTime)
    } else {
      return new Date()
    }
  },
  getUpdateTime(){
    let timeData = store.get('dbTime')
    if (timeData && timeData.countTime) {
      return timeData.countTime
    } else {
      return null
    }
  },
  getDataTime(){
    let timeData = store.get('dbTime')
    if (timeData && timeData.dataTime) {
      return timeData.dataTime
    } else {
      return null
    }
  },
  getAgentId(){
    let agent = store.get('agent')

    if (agent) {
      return agent.agentId
    } else {
      return null
    }
  },
  getAgent(){
    let agent = store.get('agent')
    if (agent) {
      return agent
    } else {
      return null
    }
  },
  getAgentName(){
    let agent = store.get('agent')

    if (agent) {
      return agent.agentName
    } else {
      return '--'
    }
  },
  getNodeId () {
    let agent = store.get('agent')

    if (agent) {
      return agent.nodeId
    } else {
      return null
    }
  },
  getMaxNodeId () {
    let agent = store.get('agent')

    if (agent) {
      return agent.maxNodeId
    } else {
      return null
    }
  },
  getLevel () {
    let agent = store.get('agent')

    if (agent) {
      return agent.agentGradeLevel
    } else {
      return null
    }
  },
  getUid(){
    let agent = store.get('agent')

    if (agent) {
      return agent.agentId.toString()
    } else {
      return null
    }
  },
  /**
   * 判断是否是业经以上级别
   * @returns {boolean}
   */
  isHighLevel(){

    let agent = store.get('agent')
    let compareLevel = ENUM_JOB_LEVEL.lever11
    return (agent && agent.agentGradeLevel >= compareLevel.level) ;
  },
  getToken () {
    let Token = store.get('Token')

    if (Token) {
      return Token
    } else {
      return null
    }
  }

}
