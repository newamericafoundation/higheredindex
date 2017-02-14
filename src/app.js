const Server = require('./server.js')
const port = (process.env.PORT || 8080)
console.log(process.env.NODE_ENV);
console.log(Server);
const app = Server.app()
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  console.log("not equal production");
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)