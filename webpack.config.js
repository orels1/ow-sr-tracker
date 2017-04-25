const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
  filename: './css/styles.css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  target: 'electron-renderer',
  entry: {
    bundle: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'static/'),
    filename: './js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractStyles.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          filename: './css/styles.css',
        }),
        include: /react-select/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]&publicPath=../&outputPath=img/',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    extractStyles,
  ],
};
