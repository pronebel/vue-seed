var path = require('path')


console.log(__dirname)
function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}


module.exports = {
  alias:{
    'moment$': 'nb-js/vendor/momentjs/moment.js',
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'src': resolve('src'),
    'static':resolve('static'),
    'styles': resolve('src/styles'),
    'assets': resolve('src/assets'),
    'components': resolve('src/common/components'),
    'bizs': resolve('src/common/components/bizs'),
    'widgets': resolve('src/common/components/widgets'),
    'filters': resolve('src/common/filters'),
    'utils': resolve('src/common/utils'),
    'apis': resolve('src/apis'),
    'flux': resolve('src/common/flux')
  },
  babelCompilePath:[
    resolve('src'),
    resolve('test'),
    resolve('node_modules/nb-js/libs'),
    resolve('node_modules/mint-ui/src')
  ],
  eslintPath:[
    //resolve('src'),
    //resolve('test')
  ]
}
