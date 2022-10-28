const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const PUBLIC_PATH = path.resolve(__dirname, 'dist')

const htmlWebpackPluginDefaults = {
  scriptLoading: 'blocking',
  inject: 'head'
}

const pages = ['index.html', 'about.html', 'delivery.html', 'payment.html', 'articles.html', 'articles-detail.html', 'job.html', 'reviews.html', 'contacts.html', '404.html', 'lk.html', 'ui.html', 'catalog.html', 'catalog-empty.html', 'card-detail-pots.html', 'card-detail-flow.html', 'card-detail-basket.html', 'lk-authorization.html', 'lk-orders.html', 'registration.html', 'registration-pass.html', 'registration-recovery.html', 'registration-final.html', 'registration-change.html', 'plug.html']
const dialogs = ['dialog-large.html', 'dialog-middle.html', 'dialog-small.html', 'dialog-reviews.html', 'dialog-shipped.html', 'dialog-pass.html', 'dialog-info.html']

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')

    }
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/index.js',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/pictures/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/includes'),
        use: ['raw-loader']
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/style.css", }),
    ...pages.map((name) =>
      new HtmlWebpackPlugin({
        ...htmlWebpackPluginDefaults,
        template: `./src/${name}`,
        filename: name,
        minify: {
          collapseWhitespace: false
        }
      })
    ),
    new CopyPlugin({
      patterns: [
        { from: "./src/img/", to: "./img/" },
        ...dialogs.map((name) => ({ from: `./src/${name}`, to: `./${name}` }))
      ],
    }),
  ],
  devServer: {
    compress: false,
    port: 9000,
    historyApiFallback: true,

  },

};
