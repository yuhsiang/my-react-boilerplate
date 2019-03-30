// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { appDir } = require('./config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');


const configedAnalyzer = new BundleAnalyzerPlugin({
  // Can be `server`, `static` or `disabled`.
  // In `server` mode analyzer will start HTTP server to show bundle report.
  // In `static` mode single HTML file with bundle report will be generated.
  // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
  analyzerMode: 'static', // was server
  // Host that will be used in `server` mode to start HTTP server.
  // analyzerHost: '127.0.0.1',
  // Port that will be used in `server` mode to start HTTP server.
  // analyzerPort: 9124,
  // Path to bundle report file that will be generated in `static` mode.
  // Relative to bundles output directory.
  reportFilename: '../report/bundle_anlaysis.html',
  // Module sizes to show in report by default.
  // Should be one of `stat`, `parsed` or `gzip`.
  // See "Definitions" section for more information.
  defaultSizes: 'stat',
  // Automatically open report in default browser
  openAnalyzer: Boolean(false),
  // If `true`, Webpack Stats JSON file will be generated in bundles output directory
  generateStatsFile: Boolean(true),
  // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
  // Relative to bundles output directory.
  statsFilename: 'stats.json',
  // Options for `stats.toJson()` method.
  // For example you can exclude sources of your modules from stats file with `source: false` option.
  // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  statsOptions: null,
  // Log level. Can be 'info', 'warn', 'error' or 'silent'.
  logLevel: 'info',
});

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), `${appDir}/app.js`),
  ],
  mode: 'production',

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*[\\/].*js$/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },

    runtimeChunk: {
      name: 'runtime',
    },
    minimizer: [
      new TerserPlugin({
      }),
    ],
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-tw/
    ),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: `${appDir}/index.pug`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },
      ServiceWorker: {
        events: true,
      },
      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      AppCache: false,
    }),
    configedAnalyzer,
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});
