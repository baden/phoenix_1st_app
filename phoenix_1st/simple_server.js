#!/usr/bin/env node
var express = require('express');
var app = express();

app.use(require('cors')())

// respond with "hello world" when a GET request is made to the homepage
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
