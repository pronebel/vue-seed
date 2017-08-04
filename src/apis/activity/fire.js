import { get, post } from '../utils/base'


/**
 * 新伙燎原- 推荐的新人达标情况
 * @param nodeId
 * @param awardId
 * @returns {*}
 */
let findRecommend = function (nodeId,awardId) {
  return post('/iv/act/fire/findRecommend',{nodeId,awardId})
}

let findTeamCount = function (nodeId,awardId,options={}) {
  return post('/iv/act/fire/findTeamCount',{nodeId,awardId},options)
}



export default {
  findRecommend,
  findTeamCount
}

