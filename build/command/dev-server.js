const detect = require('detect-port');

var arguments = process.argv.splice(2);
process.env.MODULE_NAME = arguments[0];
process.env.MODULE_PATH= "entry/"+arguments[0];
process.env.APP_VERSION = "";
process.env.PORT = arguments[1] || 8081;

require('../utils/check-versions')()

var config = require('../config/index')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('../packs/webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

/*mock json*/
var MockData = require('../mocks/index')

var apiRoutes = express.Router()

if(config.dev.mocker){
  for(var perApi in MockData){
    let __data = MockData[perApi];
    if(__data.method=="get"){
      apiRoutes.get(perApi,__data.func);
    }else{
      apiRoutes.post(perApi,MockData[perApi]);
    }

  }
  app.use('/iv', apiRoutes)
}


/*end*/



var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

if(config.dev.mocker==false){
  // proxy api requests

  let proxyList = proxyTable;

  Object.keys(proxyList).forEach(function (context) {
    var options = proxyList[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var server = null;

detect(port, (err, _port) => {
  if (err) {
    console.log(err);
  }
  port = _port


  var uri = 'http://localhost:' + port



  console.log('> Starting dev server...')
  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    if (autoOpenBrowser) {
      opn(uri)
    }
    _resolve()
  })

  server = app.listen(_port)

});



module.exports = {
  ready: readyPromise,
  close: () => {
    server&&server.close()
  }
}
