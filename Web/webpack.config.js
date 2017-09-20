var react = require('react');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin()
module.exports = {
    entry: './public/treeview-app.js',
    output: {
        path:'/Users/eliasdargham/web-workspace/project-alphabet/public',
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
                    presets:['react']
                  }
              }
            ]
          }
        ]
      }
  }
