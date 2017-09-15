var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

module.exports = {
  alias:{
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'src': resolve('src'),
    'common':resolve('src/common'),
    'styles': resolve('src/styles'),
    'assets': resolve('src/assets'),
    'services': resolve('src/services'),

    'components': resolve('src/common/components'),
    'filters': resolve('src/common/filters'),
    'utils': resolve('src/common/utils'),
  },
  babelCompilePath:[
    resolve('src'),
    resolve('test')
  ],
  eslintPath:[
    //resolve('src'),
    //resolve('test')
  ]
}
