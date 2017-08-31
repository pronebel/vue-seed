module.exports = {

  'app': {
    'prod': {
      "domainPath":'"http://wx.life.cntaiping.com/hammer/"',
      "apiPath":'"http://wx.life.cntaiping.com/hammer/"',
      'assetsPath': 'http://wx.life.cntaiping.com/hammer/'
    },
    'dev': {
      'proxy': {
        '/iv/**': {
          //target:'http://10.1.16.23:8082/hammerInterface/'
          target: 'http://10.1.16.22:8082/hammerInterface/'
          //target:'http://localhost:8080/hammerInterface/'
          // target:'http://10.1.16.21:19000/hammerInterface/'
        }
      }
    },
    'test':{
      'proxy': {
        '/iv/**': {
          target: 'http://10.1.16.22:8082/hammerInterface/'
        }
      }
    }
  },
  'principal': {
    'prod': {
      "domainPath":'"http://wx.life.cntaiping.com/hammer/principal/"',
      "apiPath":'"http://wx.life.cntaiping.com/hammer/principal/"',
      'assetsPath': 'http://wx.life.cntaiping.com/hammer/principal/'
    },
    'dev': {
      'proxy': {
        '/iv/**': {
          target: 'http://localhost:18001/'
        }
      }
    },
    'test':{
      'proxy': {
        '/iv/**': {
          target: 'http://localhost:18001/'
        }
      }
    }

  }

}
