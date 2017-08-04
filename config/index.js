// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var moduleName = process.env.MODULE_NAME || 'demo';

var DateVersion = new Date();

var version = process.env.APP_VERSION=='undefined' ? (DateVersion.getMonth()+1)+""+DateVersion.getDate() : process.env.APP_VERSION ;

var htmlTemplatePath = 'src/template/index.tpl.html';

var splitModule= moduleName.split("\/");
var moduleTargetName = splitModule[splitModule.length-1]+version;

module.exports = {
  entrys: {
    app: './src/'+moduleName+'/entry.js',
  },
  test: {
    template:htmlTemplatePath,
    env: require('./test.env.js'),
    index: path.resolve(__dirname, '../docker/test/hammer/'+moduleTargetName+'.html'),
    assetsRoot: path.resolve(__dirname, '../docker/test/hammer/'),
    assetsSubDirectory: moduleTargetName,

    assetsPublicPath: 'http://localhost:3000/hammer/',

    productionSourceMap: true,


  },
  build: {
    template:htmlTemplatePath,
    env: require('./prod.env.js'),
    index: path.resolve(__dirname, '../docker/dests/hammer/'+moduleTargetName+'.html'),
    assetsRoot: path.resolve(__dirname, '../docker/dests/hammer/'),
    assetsSubDirectory: moduleTargetName,

    assetsPublicPath: 'http://wx.life.cntaiping.com/hammer/',

    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
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
    proxyTable: {

      '/iv/**':{
        //target:'http://10.1.16.23:8082/hammerInterface/'
        //target:'http://10.1.16.22:8082/hammerInterface/'
        target:'http://localhost:8080/hammerInterface/'
        //target:'http://10.1.16.21:19000/hammerInterface/'
      }
    },
    mocker:!true,

    cssSourceMap: false
  }
}
