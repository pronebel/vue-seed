var merge = require('webpack-merge')


module.exports =  {
  NODE_ENV: '"development"',
  mocker:true,
  MODULE:{
    assist:true,
    events:true,
    dashboard:true
  },
  npm_config_report:false
}
