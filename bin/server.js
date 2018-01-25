#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
var ENV = process.env;
var pkg = require('../package.json');
var config = pkg.config;
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = ENV.NODE_ENV !== 'production';
global.__PORT__ = config.port || ENV.PORT || 4000;
global.__HOST__ = ENV.HOST || '0.0.0.0';
global.__EP_PUBLIC_SERVICE_HOST__ = ENV.EP_PUBLIC_SERVICE_HOST || '192.168.30.102';
global.__API_PORT__ = '12000';
global.__EP_PUBLIC_API_URL__ = ENV.EP_PUBLIC_API_URL || 'http://192.168.30.102:12000';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('../src/server');
  });
