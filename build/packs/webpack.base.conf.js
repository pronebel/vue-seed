var path = require('path')
var utils = require('./utils')
var config = require('../config/index')
var vueLoaderConfig = require('./vue-loader.conf')

console.log(__dirname)
function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}




module.exports = {
  entry: config.entrys,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : (process.env.NODE_ENV === 'test'?config.test.assetsPublicPath :config.dev.assetsPublicPath)
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'moment$': 'nb-js/vendor/momentjs/moment.js',
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src'),
      'styles': resolve('src/styles'),
      'assets': resolve('src/assets'),
      'common': resolve('src/common'),
      'components': resolve('src/common/components'),
      'bizs': resolve('src/common/components/bizs'),
      'widgets': resolve('src/common/components/widgets'),
      'filters': resolve('src/common/filters'),
      'utils': resolve('src/common/utils'),
      'apis': resolve('src/apis'),
      'flux': resolve('src/common/flux')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'),resolve('node_modules/nb-js/libs'),resolve('node_modules/mint-ui/src')]
      },
      {
        //test: /.*\.(gif|png|jpe?g|svg)$/i,
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 5000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65
              },
              pngquant:{
                quality: "65-90",
                speed: 4
              },
              svgo:{
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false
              }
            }

          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
