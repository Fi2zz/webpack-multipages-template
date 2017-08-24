const path = require('path')
const app = require('../webpack.multi.pages.generator');
const build = app.build, dev = app.dev;


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

module.exports = {
    entry: app.entry,
    template: app.template,
    build: {
        env: require('./prod.env'),
        // index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(build.target, build.asset),
        assetsSubDirectory: build.sub,
        assetsPublicPath: build.publicPath,
        productionSourceMap: false,
        hash: !!build.hash,
        clean: !!build.clean
    },
    dev: {
        env: require('./dev.env'),
        port: dev.port ? dev.port : 8080,
        autoOpenBrowser: dev.autoOpenBrowser,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: proxyTable,
        cssSourceMap: false,
        autoBuild: !!dev.autoBuild
    }
};
