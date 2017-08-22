const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const env = config.build.env;
let plugins = [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new ExtractTextPlugin({
            filename:

                utils.assetsPath(`css/[name]${config.build.hash ? '.[contenthash]' : ''}.css`)

            // utils.assetsPath('css/[name].[contenthash].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
;

plugins = config.template(plugins);

// console.log(plugins)

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,

        filename: utils.assetsPath(`js/[name]${config.build.hash ? '.[chunkhash]' : ''}.js`),
        chunkFilename: utils.assetsPath(`js/[id]${config.build.hash ? '.[chunkhash]' : ''}.js`)
    },
    plugins: plugins
});

// utils.assetsPath(`css/[name]${config.build.hash ? '.[contenthash]' : ''}.css`)

// filename: utils.assetsPath('js/[name].[chunkhash].js'),

// chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
