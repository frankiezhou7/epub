require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  app: {
    title: 'E-PORTS',
    description: 'E-PORTS Portal description.',
    head: {
      titleTemplate: 'E-PORTS: %s',
      meta: [
        {name: 'description', content: 'E-PORTS'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'E-PORTS'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'E-PORTS'},
        {property: 'og:description', content: 'E-PORTS Portal description.'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
