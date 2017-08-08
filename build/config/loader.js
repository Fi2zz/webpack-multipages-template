function getEntry() {
  const app = require('../../app.json').module;
  let entries = {};
  for (let key in app) {
    if (app[key]['enable']) {
      let item = app[key];
      let path = item['path'];
      if ('page' in item) {
        entries[item['page']] = `${path}/index.js`
      } else if ('pages' in item) {
        let pages = item['pages'];

        for (let i = 0; i < pages._length; i++) {
          let name = pages[i]
          entries[name] = `${path}/${name}/index.js`
        }
      }

    }
  }
  return entries
}


function getTemplate(plugins) {
  let entry = getEntry();
  let who = process.env.NODE_ENV
  let HtmlWebpackPlugin = require('html-webpack-plugin');
  /***
   * @param plugins webpack plugins array
   * @param entry   webpack base config entry option
   * @param env     webpack working env
   ***/
  // let who = env;
  for (let name in entry) {
    let item = entry[name] //: entry[name][1];
    let tpl = `${ (item.split('.js'))[0]}.html`;
    let filename = `${name}.html`;
    let options = {
      filename: filename,
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

    } else if (who === 'development') {
      options.chunks = ['common', `${name}`]
    }
    let plugin = new HtmlWebpackPlugin(options);
    plugins.push(plugin)
  }


  return plugins
};

exports.getEntry = getEntry;
exports.getTemplate = getTemplate;
