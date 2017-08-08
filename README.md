# app.json 

以下为主要参数


 ` build `
 
    target                打包文件发布目录
    publicPath            资源公共路径
    asset                 资源路径
    sub                   资源子目录

 ` dev ` 
    
    port                  devSever的端口
    proxy                 devServer proxy table的url
    autoOpenBrowser       自动打开浏览器
    
 ` module `  
    
    moduleName            模块名称
      enable              启用模块
      path                模块所在目录
      page/pages          模块页面名称
      

以下为主要依赖
添加到 `devDependencies ` and `npm  install

      "autoprefixer": "^7.1.2",
      "babel-core": "^6.22.1",
      "babel-loader": "^7.1.1",
      "babel-plugin-transform-runtime": "^6.22.0",
      "babel-preset-env": "^1.3.2",
      "babel-preset-stage-2": "^6.22.0",
      "babel-register": "^6.22.0",
      "chalk": "^2.0.1",
      "connect-history-api-fallback": "^1.3.0",
      "copy-webpack-plugin": "^4.0.1",
      "css-loader": "^0.28.0",
      "cssnano": "^3.10.0",
      "eventsource-polyfill": "^0.9.6",
      "express": "^4.14.1",
      "extract-text-webpack-plugin": "^2.0.0",
      "file-loader": "^0.11.1",
      "friendly-errors-webpack-plugin": "^1.1.3",
      "html-webpack-plugin": "^2.28.0",
      "http-proxy-middleware": "^0.17.3",
      "webpack-bundle-analyzer": "^2.2.1",
      "semver": "^5.3.0",
      "shelljs": "^0.7.6",
      "opn": "^5.1.0",
      "optimize-css-assets-webpack-plugin": "^2.0.0",
      "ora": "^1.2.0",
      "rimraf": "^2.6.0",
      "url-loader": "^0.5.8",
      "vue-loader": "^12.1.0",
      "vue-style-loader": "^3.0.1",
      "vue-template-compiler": "^2.3.3",
      "webpack": "^2.6.1",
      "webpack-dev-middleware": "^1.10.0",
      "webpack-hot-middleware": "^2.18.0",
      "webpack-merge": "^4.1.0"
