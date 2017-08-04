import AgentApi from '../agent'
import UserApi from '../user'
import store from 'store'
import storeExpire from 'utils/libs/store.expire'
import { Track } from 'utils/libs/tongji'

import { tranformAccountAgent,tranformAccountDbTime } from './account'

import AuthService from '../utils/auth'

export let refreshDataTime = function () {
  UserApi.getAgentInfo().then((ret) => {
    let dataTime = ret.dataTime
    let countTime = ret.countTime
    let serverTime = ret.serverTime
    let timeNow = ret.timeNow
    tranformAccountDbTime({dataTime, countTime, serverTime,timeNow})
  })
}

/**
 * 进入应用时，需要初始化的数据
 */
export let appInit = function () {
  storeExpire.clearForce()
  AgentApi.getProductDict().then(res => {
    if (res) {
      store.set('PRODUCT_KEYS', res.list)
    }
  })

  if (AuthService.getToken()) {
    let agent = AuthService.getAgent();
   // AgentApi.getTeams(AuthService.getAgentId())
    Track.installWithAgent(agent)
  }

}
