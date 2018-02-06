var react = require('react');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin();
var babelPluginTransformObjectRestSpread = require('babel-plugin-transform-object-rest-spread');
module.exports = {
    entry: './public/scripts/treeview-app.js',
    output: {
        path:'/Users/eliasdargham/GitHub/Project-Alphabet/Web/public/scripts',
        filename: 'treeview.js'
    },
    plugins: [
        ignore,
      ],
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                query:
                  {
                    presets: ['react'],
                    plugins: [babelPluginTransformObjectRestSpread]
                  }
              }
            ]
          }
        ]
      }
  }
