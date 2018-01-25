const gulp = require('gulp');
const fs = require("fs");

const pkg = require('./package.json');
const config = pkg.config;

const PORT = config.port || 5000;
const NAME = pkg.name;
const VERSION = pkg.version;

gulp.task("name", function() {
  console.log(NAME);
});

gulp.task("version", function() {
  console.log(VERSION);
});

gulp.task("docker", function() {
  fs.writeFileSync(__dirname + '/Dockerfile', `

  FROM docker.e-ports.com/node:6.3.0

  MAINTAINER qiao.hanping@e-ports.com

  WORKDIR /web/

  COPY package.json ./
  RUN npm install

  COPY gulpfile* ./
  COPY bin ./bin
  COPY src ./src
  COPY static ./static
  COPY webpack ./webpack
  COPY webpack-assets.json ./
  COPY server.babel.js ./
  COPY gulpfile.js ./
  COPY .babelrc ./

  LABEL web.name=${NAME} \\
        web.version=${VERSION}

  EXPOSE ${PORT}
  CMD ["/usr/local/bin/node", "--harmony", "/web/bin/server.js"]`);

});

gulp.task("default", ["build"]);
