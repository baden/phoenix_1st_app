# Это мой первый эксперимент с phoenix.

Буду тут фиксировать последовательность действий.

Работу буду вести в докер-контейнере https://hub.docker.com/r/baden/phoenix/

Это будет не совсем стандартное phoenix приложение, а попытка сразу охватить
набор прогрессивных техник:

* Elixir.
* Phoenix framework.
* Ecto.
* PostgreSQL.
* Webpack.
* Sass for the stylesheets.
* React.
* React router.
* Redux.
* ES6/ES7 JavaScript.

## Вдохновение я черпал отсюда

https://github.com/bigardone/phoenix-trello
http://codeloveandboards.com/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/

## 1. Запустим вспомогательный контейнер с базой данных postgesql.

```
docker run --name pg -td library/postgres:latest
```

Впоследствии мы будем запускать и останавливать контейнер.

```
docker stop pg
docker start pg
```

## 2. Создаем проект

Вместо bunch мы будем использовать webpack (интересно зачем?)

Глобальные параметры для запуска докера (чтобы он мог создавать файлы с правами локального пользователя)
```
export D_OPTS="-e USER_ID=`id -u` -e GROUP_ID=`id -g` -v `pwd`:/home/composer/code"
```

```
docker run -it --rm $D_OPTS -w /home/composer/code baden/phoenix mix phoenix.new --no-brunch phoenix_1st
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm init
```

Можно поставить по хардкору:

```
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i style-loader --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i sass-loader --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i node-sass --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i node-libs-browser --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i extract-text-webpack-plugin --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i css-loader --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-preset-stage-2 --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-preset-stage-0 --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-preset-react --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-preset-es2015 --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-plugin-transform-decorators-legacy --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-loader --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i babel-core --save-dev
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i webpack --save-dev
```
```
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i redux-thunk --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i redux-logger --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i redux --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-router-redux --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-router --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-redux --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-page-click --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-gravatar --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-dom --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-dnd-html5-backend --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-dnd --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react-addons-css-transition-group --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i react --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i moment --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i isomorphic-fetch --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i invariant --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i history --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i es6-promise --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i classnames --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i bourbon-neat --save
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i bourbon --save
```

 "phoenix": "file:deps/phoenix",
 "phoenix_html": "file:deps/phoenix_html"

А можно вставить в phoenix_1st готовый список зависимостей:

```
"devDependencies": {
  "babel-core": "^6.13.2",
  "babel-loader": "^6.2.4",
  "babel-plugin-transform-decorators-legacy": "^1.3.4",
  "babel-preset-es2015": "^6.13.2",
  "babel-preset-react": "^6.11.1",
  "babel-preset-stage-0": "^6.5.0",
  "babel-preset-stage-2": "^6.13.0",
  "css-loader": "^0.23.1",
  "extract-text-webpack-plugin": "^1.0.1",
  "node-libs-browser": "^1.0.0",
  "node-sass": "^3.8.0",
  "sass-loader": "^4.0.0",
  "style-loader": "^0.13.1",
  "webpack": "^1.13.1"
},
"dependencies": {
  "bourbon": "^4.2.7",
  "bourbon-neat": "^1.8.0",
  "classnames": "^2.2.5",
  "es6-promise": "^3.2.1",
  "history": "^3.0.0",
  "invariant": "^2.2.1",
  "isomorphic-fetch": "^2.2.1",
  "moment": "^2.14.1",
  "react": "^15.3.0",
  "react-addons-css-transition-group": "^15.3.0",
  "react-dnd": "^2.1.4",
  "react-dnd-html5-backend": "^2.1.2",
  "react-dom": "^15.3.0",
  "react-gravatar": "^2.4.5",
  "react-page-click": "^3.0.0",
  "react-redux": "^4.4.5",
  "react-router": "^2.6.1",
  "react-router-redux": "^4.0.5",
  "redux": "^3.5.2",
  "redux-logger": "^2.6.1",
  "redux-thunk": "^2.1.0"
}
```
и выполнить
```
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st baden/phoenix npm i
```

Создаем файл __phoenix_1st/webpack.config.js__ такого содержания:

```
'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('web/static/' + dest); }

var config = module.exports = {
  entry: {
    application: [
      web('css/application.sass'),
      web('js/application.js'),
    ],
  },

  output: {
    path: join('priv/static'),
    filename: 'js/application.js',
  },

  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('css/application.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}
```

В файл __phoenix_1st/config/dev.exs__ нужно внести некоторые правки:

```
...

config :phoenix_1st, Phoenix1st.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),

...
```

В файл __phoenix_1st/config/dev.exs__ нужно внести некоторые правки:
```
# config/dev.exs

config :phoenix_1st, Phoenix1st.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: [
    node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color"]
  ]

...

# Configure your database
config :phoenix_1st, Phoenix1st.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "phoenix_1st_dev",
  hostname: "pg",
  pool_size: 10

```

Все по идее можно начинать писать код приложения.

### Самый базовый код

__phoenix_1st/web/static/js/application.js__

```
import React                    from 'react';
import ReactDOM                 from 'react-dom';
```

**phoenix_1st/web/static/css/application.sass**
```
// - - reset - normalize.css v3.0.2
//@import libs/normalize

@import global/layout
```

**phoenix_1st/web/static/css/global/_layout.sass**

```
html
  height: 100vh
  body
    height: 100vh

    #main_container
      height: calc(100% - 40px)
      > div
        height: 100%
```

**phoenix_1st/web/templates/layout/app.html.eex**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Hello Phoenix1st!</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<%= static_path(@conn, "/css/application.css") %>">
    <!-- <link rel="stylesheet" href="<%= static_path(@conn, "/css/app.css") %>"> -->
  </head>

  <body>
    <main id="main_container" role="main"></main>
    <script src="<%= static_path(@conn, "/js/application.js") %>"></script>
  </body>
</html>
```

Все, можно попробовать запустить сервер.

```
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st --link pg baden/phoenix mix ecto.create
```

```
docker run -it --rm $D_OPTS -w /home/composer/code/phoenix_1st --link pg -p 4000:4000 baden/phoenix mix phoenix.server
```

Откроем в браузере http://localhost:4000/

Должны увидеть **Hello, world!!!**

Работает, и даже автоматически отслеживает изменения в исходниках.

### Запуск познее (уже из репозитория)
