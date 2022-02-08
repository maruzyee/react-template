const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
})
const miniCssPlugin = new MiniCssExtractPlugin()
const env = dotenv.config().parsed
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /nodeModules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 3000,
    static: { directory: path.join(__dirname, 'public'), serveIndex: true },
    //; static: ['assets'],
    historyApiFallback: { index: '/', disableDotRule: true },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    htmlPlugin,
    miniCssPlugin,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
  ],
}
