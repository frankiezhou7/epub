require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');

// var reactPath = path.resolve(__dirname, '../node_modules/react/dist/react.min.js');
// var reactRouterPath = path.resolve(__dirname, '../node_modules/react-router/lib');
// var reactReduxPath = path.resolve(__dirname, '../node_modules/react-redux/dist/react-redux.min.js');
// var reduxPath = path.resolve(__dirname, '../node_modules/redux/dist/redux.min.js');
// var reactDomPath = path.resolve(__dirname, '../node_modules/react-dom');
var lodashPath = path.resolve(__dirname, '../node_modules/eplodash/node_modules/lodash');
//var epuiMdPath = path.resolve(__dirname, '../../epui-md');

var ENV = process.env;
var pkg = require('../package.json');
var config = pkg.config;
var port = (config.port || ENV.PORT)+1 || 4001;
var host = ENV.HOST || '0.0.0.0' || 'localhost';
var EP_PUBLIC_SERVICE_HOST = ENV.EP_PUBLIC_SERVICE_HOST || '192.168.30.102';
var API_PORT = '12000';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
  '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
  '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

var reReact = /^react\/(.*)$/;
var piReplacements = [
  new webpack.NormalModuleReplacementPlugin(/^react\/(.*)$/, function(res) {res.request = path.join(__dirname , '../node_modules/react/' + reReact.exec(res.request)[1]);}),
  new webpack.NormalModuleReplacementPlugin(/^react$/, path.join(__dirname , '../node_modules/react')),
  new webpack.NormalModuleReplacementPlugin(/^moment$/, path.join(__dirname , '../node_modules/moment')),
];

module.exports = {
  devtool : 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude:[ /node_modules/,/epui-md/], loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.css$/, loaders:['style-loader','css-loader']},
      { test: /\.(woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file'},
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
      { test: /src\/pages\/([^\/]+\/[^\/]+).js$/, loaders: ['bundle?lazy','babel?' + JSON.stringify(babelLoaderQuery)]}
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    // alias: {
    //   'lodash': lodashPath
    // },
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ].concat(piReplacements)
};
