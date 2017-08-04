import { get, post, postWithUrlParam } from '../utils/base'
import Promise from 'promise'

/**
 *
 * @param encrypt
 */
function login ({encrypt, iv}) {
  return postWithUrlParam('/iv/agent/login', {}, {}, {encrypt, iv})
}
function getAgentInfo () {
  return post('/iv/agent/getAgentInfo')
}

export default {
  login, getAgentInfo
}
