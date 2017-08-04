import AuthService from '../utils/auth'

export let tranformAccountLogin = function (token) {
  AuthService.saveToken(token)
}

export let tranformAccountAgent = function (agent,timeData) {
  AuthService.saveAgent(agent,timeData)
}
export let tranformAccountDbTime = function (timeData) {
  AuthService.saveDbTime(timeData)
}


