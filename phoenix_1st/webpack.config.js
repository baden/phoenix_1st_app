var path = require('path')
var webpack = require('webpack')
var publicPath = 'http://localhost:4001/'

var env = process.env.MIX_ENV || 'dev'
var prod = env === 'prod'

// var entry = './web/static/js/index.js'
var entry = './web/static/js/application.js'
var hot = 'webpack-hot-middleware/client?path=' +
  publicPath + '__webpack_hmr'

// function join(dest) { return path.resolve(__dirname, dest); }

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev'
  })
]

if (env === 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  devtool: prod ? null : 'cheap-module-eval-source-map',
  entry: prod ? entry : [hot, entry],
  output: {
    path: path.resolve(__dirname) + '/priv/static/js',
    filename: 'index.bundle.js',
    publicPath: publicPath
    // path: join('priv/static'),
    // filename: 'js/index.bundle.js',
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel',
      //   query: {
      //     cacheDirectory: true,
      //     plugins: ['transform-decorators-legacy'],
      //     presets: ['react', 'es2015', 'stage-2', 'stage-0'],
      //   },
      // },
      {
        test: /\.css?$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }
    ]
  }
}
