#!/usr/bin/env node
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')

var compiler = webpack(config)
var app = express()
// app.use(require('cors')())


// RUN_IN_DOCKER

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  lazy: false,
  // proxy: {
  //   "*": "http://localhost:4001"
  // },
  publicPath: config.output.publicPath,
  // watchOptions: { aggregateTimeout: 2000, poll: 1000, ignored: /node_modules/ },
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log
}))

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(4001, '0.0.0.0', function (err) {
  if (err) return console.error(err)
  console.log('dev server running on localhost:4001')
})

// Exit on end of STDIN
process.stdin.resume()
process.stdin.on('end', function () {
  console.log("====END");
  process.exit(0)
})
