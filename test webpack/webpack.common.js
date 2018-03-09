const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index1: './src/index.js',
    index2: './src/index2.js',
    // print: './src/print.js'
  },
  // devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    // hot: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      filename: 'index1.html',
      template: 'src/index.html',
      title: '我是index1.html',
      chunks: ['index1']
      // minify:{
      //   removeComments:true,
      //   collapseWhitespace:true
      // }
    }),
    new HtmlWebpackPlugin({
      filename: 'index2.html',
      template: './src/index2.html',
      title: '我是index2.html',
      chunks: ['index2'],
      inlineSource: '.(js|css)$'

    }),
    new HtmlWebpackInlineSourcePlugin(),
    // new ExtractTextPlugin({
    //   filename:'[name].css'
    // }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    // filename: '[name].[hash].js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          "presets": ["env"]
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers:'last 10 versions'
                })
              ]
            }
          }
        ]
      },
      
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers:'last 10 versions'
                })
              ]
            }
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader:'file-loader',
            options:{
              name:'assets/[name]-[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};