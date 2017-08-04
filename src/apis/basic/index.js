import { get, post } from '../utils/base'



let findSubNodes = function (nodeIdQuery) {
  return post('/iv/basic/findNodeIdsSub', {nodeIdQuery}, {

  })
}


export default {
  findSubNodes
}
