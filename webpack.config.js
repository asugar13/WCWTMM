const HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: {
    main: './src/index.js',
    forgotten_password: './src/forgotten-password.js',
    reset_password: './src/reset-password.js',
    my_profile: './src/my-profile.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8080,
    compress: true, //compresses what's server into gzip
    hot:true,   //hot reloading
    http2: true, //using https
    proxy: {
      '/': {
      target: 'https://localhost:3000',
      pathRewrite: {'^/api' : ''},
      secure: false
    }
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    // }),
    new HtmlWebPackPlugin({
      template: "./public/reset-password.html",
      filename: "./reset-password.html",
      chunks: ['reset_password']
    }),
    new HtmlWebPackPlugin({
      template: "./public/welcome.html",
      filename: "./welcome.html",
      chunks: ['main']
    }),
    new HtmlWebPackPlugin({
      template: "./public/forgotten-password.html",
      filename: "./forgotten-password.html",
      chunks: ['forgotten_password']
    }),
    new HtmlWebPackPlugin({
      template: "./public/my-profile.html",
      filename: "./my-profile.html",
      chunks: ['my_profile']
    })
  ]
};
