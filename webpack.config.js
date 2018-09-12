const path = require('path')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["transform-class-properties"]
          }
        }
      }
    ]
  }
}