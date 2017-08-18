const path = require('path')
const app = require('./loader');
const build = app.build, dev = app.dev;
const entry = app.getEntry();
let env = process.env.NODE_ENV;
if (!env) {
    env = 'development'
}
let proxyTable = dev.proxy !== false ? {
    '/api': {
        target: dev.proxy,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
} : {};

console.log(proxyTable)

module.exports = {
    entry: entry,
    template: app.getTemplate,
    build: {
        env: require('./prod.env'),
        // index: path.resolve(__dirname, '../dist/index.html'),
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
        proxyTable: proxyTable,
        cssSourceMap: false
    }
}
