
# app.json 

本模板基于Vue webpack-template 

项目根目录下不要建 index.html和index.js。这两个文件将由Node.js自动生成







 ` build `
 
    target                打包文件发布目录
    publicPath            资源公共路径
    asset                 资源路径
    sub                   资源子目录
    "html-template-path"  打包html的存放路径
    inject                是否将打包时将资源路径注入到html文件，默认为true配置和 html-webpack-plugin一致  

 ` dev ` 
    
    port                  devSever的端口
    proxy                 devServer proxy table的url
    autoOpenBrowser       自动打开浏览器
    autoCompile           自动打包
    
 ` module `  
    
    moduleName            模块名称
      enable              启用模块
      path                模块所在目录
      page/pages          模块页面名称
      


