/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const { appDir } = require('./config');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  mode: options.mode,
  optimization: options.optimization,
  module: {
    rules: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      use: [{
        loader: 'babel-loader',
      }],
      exclude: /node_modules/,
      options: options.babelQuery,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      use: [{
        loader: 'style-loader',
      }, { loader: 'css-loader' }],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{ loader: 'file-loader' }],
    },
    {
      test: /\.pug$/,
      use: [{
        loader: 'html-loader',
      }, {
        loader: 'pug-html-loader',
      }],
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
          // options: { sourceMap: true }
        }, {
          loader: 'css-loader',
          // options: {
          //   // localIdentName: '[sha512:hash:base32]-[name]-[local]',
          //   // modules: true,
          //   sourceMap: true
          // }
        },
        // {
        //   loader: 'postcss-loader',
        //   // options: { sourceMap: true }
        // },
        {
          loader: 'sass-loader',
          // options: {
          //   // includePaths: 'app/styles',
          //   sourceMap: true
          // }
        },
      ],
    },
    {
      test: /\.less$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
      }],
    },
    {
      test: /\.(jpg|png|gif|ico)$/,
      use: [{
        loader: 'file-loader',
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
      ],
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    }, {
      test: /\.(mp4|webm)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      }],

    }],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CORS_DOMAIN: JSON.stringify(process.env.CORS_DOMAIN),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: [appDir, 'node_modules'],
    alias: {
      moment$: 'moment/moment.js',
    },
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
