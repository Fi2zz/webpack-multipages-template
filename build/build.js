require('./check-versions')()

process.env.NODE_ENV = 'production';
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
var webpackConfig = require('./webpack.prod.conf');
var spinner = ora('building for production...');
const util = require('util');

spinner.start();
const buildPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
const clean = config.build.clean;

function buildCb(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
        '   >  Tip: built files are meant to be served over an HTTP server.\n' +
        '   >  Opening index.vue.html over file:// won\'t work.\n'
    ))
}


console.log(chalk.green(util.inspect(config.build)));


if (clean) {
    rm(buildPath, err => {
        if (err) throw err
        webpack(webpackConfig, buildCb)
    });
} else {
    webpack(webpackConfig, buildCb)
}


//
// rm(
//     buildPath, err => {
//         if (err) throw err
//         webpack(webpackConfig, function (err, stats) {
//             spinner.stop()
//             if (err) throw err
//             process.stdout.write(stats.toString({
//                 colors: true,
//                 modules: false,
//                 children: false,
//                 chunks: false,
//                 chunkModules: false
//             }) + '\n\n');
//             console.log(chalk.cyan('  Build complete.\n'))
//             console.log(chalk.yellow(
//                 '  Tip: built files are meant to be served over an HTTP server.\n' +
//                 '  Opening index.vue.html over file:// won\'t work.\n'
//             ))
//         })
//     }
// );
