var arguments = process.argv.splice(2);
process.env.MODULE_NAME = arguments[0];
var moduleName = arguments[0]
process.env.MODULE_PATH= "entry/"+arguments[0];
process.env.APP_VERSION = arguments[1];
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware')
require('../utils/check-versions')()

process.env.NODE_ENV = 'test'
const detect = require('detect-port');
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config/index')
var moduleConfig = require("../entry/"+moduleName+".config")
var webpackConfig = require('../packs/webpack.test.conf')

var spinner = ora('test for production...')
spinner.start()

rm(path.join(config.test.outputRoot, config.test.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  test complete.\n'))


    var app = express();

    var proxyTable = moduleConfig.test.proxy;
    Object.keys(proxyTable).forEach(function (context) {
      var options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }
      app.use(proxyMiddleware(options.filter || context, options))
    })


// Serve up content from public directory
    app.use(express.static(path.resolve(__dirname, '../../dests/test/',moduleName)))
    var port = process.env.PORT || 3000


    detect(port, (err, _port) => {
      if (err) {
        console.log(err);
      }
      port = _port


      var uri = 'http://localhost:' + port



      console.log('> Starting dev server...')
      console.log('> Listening at ' + uri + '\n')

     app.listen(_port)

    });



  })
})
