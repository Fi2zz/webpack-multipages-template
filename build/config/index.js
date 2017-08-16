// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const app = require('../../app.json');
const build = app.build, dev = app.dev;
const load = require('./loader');
const entry = load.getEntry();
let env = process.env.NODE_ENV;

if (!env) {
  env = 'development'
}


module.exports = {
  entry: entry,
  template: load.getTemplate,
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(build.target, build.asset),
    assetsSubDirectory: build.sub,
    assetsPublicPath: build.publicPath,
    productionSourceMap: false,
  },
  dev: {
    env: require('./dev.env'),
    port: dev.port ? dev.port : 8080,
    autoOpenBrowser: dev.autoOpenBrowser,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: dev.proxy,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
