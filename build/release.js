var express = require('express');
var app = express();

// The number of milliseconds in one day
var oneDay = 86400000;

// Use compress middleware to gzip content
var proxyMiddleware = require('http-proxy-middleware')


// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable =  {

  '/iv/**':{
    target:'http://localhost:8080/hammerInterface/'
  }
}
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  console.log(options);
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})


// Serve up content from public directory
app.use(express.static(__dirname + '/docker/test/'));

app.listen(process.env.PORT || 3000);
