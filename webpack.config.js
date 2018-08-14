
module.exports = {    
    entry: './scripts/app.js',
    output: {
        filename: './dist/bundle.js'      
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
//"start": "webpack --config webpack.config.js"
//"start": "node_modules/.bin/webpack"
