const path = require('path');
const webpack = require('webpack');
const encode=require("webpack-encoding-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new encode({encode:'UTF-8'}),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: "LeBronChao Webpack",
      inject:"body",
      cache:true,
      minify:{
        removeComments: true, // 是否删除注释
        removeRedundantAttributes:true, // 是否删除多余（默认）属性
        removeEmptyAttributes:true,  // 是否删除空属性
        collapseWhitespace:false,  // 折叠空格
        removeStyleLinkTypeAttributes:true, // 比如link中的type="text/css"
        minifyCSS:true, // 是否压缩style标签内的css
        minifyJS:{  // 压缩JS选项，可参考Terser配置
          mangle:{
            toplevel: true
          }
      }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import',"@babel/plugin-transform-runtime"],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      }
    ]
  },
  optimization: {
    splitChunks: false
  }
}