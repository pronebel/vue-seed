import { get, post } from '../utils/base'

/**
 *
 * @param encrypt
 */
function setTime (time) {
  return post('/iv/agent/setTestDate?time=' + time)
}



export default {
  setTime
}
