// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var merge = require('webpack-merge')
var ProdEnv = require('./prod.env.js')

var moduleName = process.env.MODULE_NAME || 'demo';
var modulePath = process.env.MODULE_PATH || 'entry/demo';
var moduleConfig = require("../entry/"+moduleName+".config")
var DateVersion = new Date();

var version = process.env.APP_VERSION=='undefined' ? (DateVersion.getMonth()+1)+""+DateVersion.getDate() : process.env.APP_VERSION ;

var htmlTemplatePath = 'src/template/index.tpl.html';

var splitModule= modulePath.split("\/");
var moduleTargetName = splitModule[splitModule.length-1]+version;




function assembleIndexPath(env,mod,targetName){
  return path.resolve(__dirname, '../../dests/',env,mod,targetName+'.html')
}

function assembleAssetRoot(env,mod){
  return path.resolve(__dirname, '../../dests/',env,mod)
}


module.exports = {
  entrys: {
    app: './src/'+modulePath+'/entry.js',
  },
  test: {
    template:htmlTemplatePath,
    env: require('./test.env.js'),
    index: assembleIndexPath("test",moduleName,moduleTargetName),
    outputRoot: assembleAssetRoot("test",moduleName),
    assetsSubDirectory: moduleTargetName,

    assetsPublicPath: '/',

    productionSourceMap: true,


  },
  build: {

    template:htmlTemplatePath,
    env: merge(ProdEnv,{
      DOMAIN_PATH:moduleConfig.prod.domainPath,
      API_PATH:moduleConfig.prod.apiPath
    }),
    index: assembleIndexPath("prod",moduleName,moduleTargetName),
    outputRoot: assembleAssetRoot("prod",moduleName),
    assetsSubDirectory: moduleTargetName,
    assetsPublicPath: moduleConfig.prod.assetsPath,

    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    template:htmlTemplatePath,
    env: require('./dev.env.js'),
    port: process.env.PORT,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: moduleConfig.dev.proxy,
    mocker:!true,

    cssSourceMap: false
  }
}
