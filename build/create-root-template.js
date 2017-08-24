const utils = require('util');
const chalk = require('chalk');
const fs = require('fs');

function html(data, devPort, env) {
    console.log(chalk.yellow(`  [${env}]    ----------------`));
    console.log(chalk.yellow(`  [${env}]    ${env.toUpperCase()} config file path`));
    console.log(chalk.yellow(`  [${env}]    ` + __dirname));
    console.log(chalk.yellow(`  [${env}]    Working Modules:`));
    console.log(chalk.yellow(`  [${env}]    \n   ${utils.inspect(data)}`));
    console.log(chalk.yellow(`  [${env}]    ----------------\n`));
    let html = `<table cellpadding="0" cellspacing="0" border="0">
          <tr><th colspan="3" style="border: 1px #fff solid;border-bottom: none;"> Working Modules</th></tr>
          <tr>
            <th style="border:1px #ddd solid;border-right: none;">PAGE</th>
            <th style="border:1px #ddd solid;border-right: none;">ENTRY FILE</th>
            <th style="border:1px #ddd solid;">DEV URL</th>
          </tr>`


    for (let p in data) {
        let url = `http://localhost:${devPort}/${p}.html`;
        let entry = data[p];
        html += `
        <tr> 
            <td style="border:1px #ddd solid;border-top: none;border-right: none;">${p}</td> 
            <td style="border:1px #ddd solid;border-top: none;border-right: none;">${entry}</td>
            <td style="border:1px #ddd solid;border-top: none;">
              <a style="color: #333" href="${url}">${url}</a>
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
            <style>html,body{width: 100%;height: 100%;} td,th {padding: 10px;}</style>
        </head>
        <body style="margin:0;padding: 0;">
            <div id="app" style="padding:16px;">
            <h1 style="color:#f00">[WARNING] <BR>THIS FILE IS CREATED BY NODE.js </h1>
            <h1 style="color: #f00">DO NOT PLACE YOUR CODE HERE</h1>
            ${html}
            </div>
        </body>
    </html>`
}

function createRootTemplate(entry, devPort, env) {
    fs.writeFile('index.js', "console.warn('DO NOT code in this file')", (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(chalk.green('> Write "index.js" is done'))
    });
    fs.writeFile('index.html', html(entry, devPort, env), function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log(chalk.green('> Write "index.html" is done'))
    });
}

module.exports = createRootTemplate;
