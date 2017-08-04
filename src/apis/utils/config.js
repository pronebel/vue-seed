export const GET_SYSTEM_INFO = function () {
  return {
    'ControlInfo': {
      'senderSystem': 'IV',
      'senderApplication': 'Hammer',
      'version': '1.0',
      'senderChannel': 'H5',
      'msgId': Date.now().toString()
    }
  }
}



/**
 * http method
 */
export let METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

/**
 * http-content-type
 * @type {{NORMAL: string, RESTFUL: string}}
 */
export let ContentType = {
  NORMAL: 'application/x-www-form-urlencoded',
  RESTFUL: 'application/json;charset=utf-8'

}
