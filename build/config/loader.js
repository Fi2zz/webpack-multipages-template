const fs = require('fs');
const project = require('../../app.json');
const app = project.module;
const utils = require('util');
const devPort = project.dev.port ? project.dev.port : 8080;
const chalk = require('chalk');
const entry = getEntry();


let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
if (env === 'development') {
    app['index'] = {
        enable: true,
        page: 'index',
        path: './'
    };
}

function fileTemplate(data) {
    console.log(chalk.yellow(`  [${env}]    ----------------`));
    console.log(chalk.yellow(`  [${env}]    ${env.toUpperCase()} config file path`));
    console.log(chalk.yellow(`  [${env}]    ` + __dirname));
    console.log(chalk.yellow(`  [${env}]    Working Modules:`));
    console.log(chalk.yellow(`  [${env}]    ${utils.inspect(data)}`));
    console.log(chalk.yellow(`  [${env}]    ----------------\n`));
    let html = `<table cellpadding="0" cellspacing="0" border="0">
          <tr><th colspan="3" style="border: 1px #fff solid;border-bottom: none;"> Working Modules</th></tr>
          <tr>
                <th style="border:1px #fff solid;border-right: none;">PAGE</th>
                <th style="border:1px #fff solid;border-right: none;">ENTRY FILE</th>
                <th style="border:1px #fff solid;">DEV URL</th>
            </tr>`
    for (let p in data) {

        let url = `http://localhost:${devPort}/${p}.html`;
        let entry = data[p];
        html += `
        <tr> 
            <td style="border:1px #fff solid;border-top: none;border-right: none;">${p}</td> 
            <td style="border:1px #fff solid;border-top: none;border-right: none;">${entry}</td>
            <td style="border:1px #fff solid;border-top: none;">
              <a style="color: #fff" href="${url}">${url}</a>
           </td>
        </tr>
      `
    }
    html += `</table>`;
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Project</title>
    <style>
      html,body{
      width: 100%;
      height: 100%;
      } 
      td,th {
        padding: 10px;
        }
</style>
  </head>
    <body style="margin:0;padding: 0;background: #000;">
        <div id="app" style="padding:16px;color:#fff">
        <h1 style="color: #fff">[WARNING] <BR>THIS FILE IS CREATED BY NODE.js </h1>
        <h1 style="color: #fff">DO NOT PLACE YOUR CODE HERE</h1>
        ${html}
        </div>
    </body>
    </html>`
}

fs.writeFile('index.js', "console.warn('DO NOT code in this file')");
fs.writeFile('index.html', fileTemplate(getEntry()));


function getEntry() {
    let entries = {};
    for (let key in app) {
        if (app[key]['enable']) {
            let item = app[key];
            let path = item['path'];
            if ('page' in item) {
                entries[item['page']] =
                    `${path}index.js`

            } else if ('pages' in item) {
                let pages = item['pages'];
                for (let i = 0; i < pages._length; i++) {
                    let name = pages[i]
                    entries[name] =
                        `${path}${name}/index.js`
                }
            }

        }
    }
    return entries
}


function getTemplate(plugins) {
    let who = process.env.NODE_ENV;
    if (!who) who = 'development'
    let HtmlWebpackPlugin = require('html-webpack-plugin');
    /***
     * @param plugins webpack plugins array
     * @param entry   webpack base config entry option
     * @param env     webpack working env
     ***/
    let opts = []
    for (let name in entry) {
        let item = entry[name] //: entry[name][1];
        let tpl = `${(item.split('.js'))[0]}.html`;
        let options = {
            template: tpl,
            title: name
        };

        if (who === 'production') {
            options.minify = {
                removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            };
            options.chunks = ['manifest', 'vendor', `${name}`]
            options.inject = 'inject' in project.build ? project.build.inject : true;
            options.filename = `${project.build['html-template-path']}/${name}.html`;


        } else if (who === 'development') {
            options.chunks = ['common', `${name}`]
            options.filename = `${name}.html`;

        }


        opts.push(options);
    }


    for (let i = 0; i < opts.length; i++) {
        plugins.push(new HtmlWebpackPlugin(opts[i]))
    }

    return plugins
}

exports.getEntry = getEntry;
exports.getTemplate = getTemplate;
exports.build = project.build;
exports.dev = project.dev;

