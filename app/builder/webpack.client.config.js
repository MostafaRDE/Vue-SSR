const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')
const WebpackBar = require('webpackbar')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('../../builder/webpack.base.config.js')

module.exports = webpackMerge(baseConfig, {
    // Point entry to your app's server entry file
    entry: './src/entry-server.js',

    // This allows webpack to handle dynamic imports in a Node-appropriate
    // fashion, and also tells `vue-loader` to emit server-oriented code when
    // compiling Vue components.
    target: 'node',

    // For bundle renderer source map support
    devtool: 'source-map',

    // This tells the server bundle to use Node-style exports
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        alias: {
            'create-api': './create-api-server.js',
        },
    },

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // Externalize app dependencies. This makes the server build much faster
    // and generates a smaller bundle file.
    externals: webpackNodeExternals({
        // do not externalize dependencies that need to be processed by webpack.
        // you can add more file types here e.g. raw *.vue files
        // you should also whitelist deps that modifies `global` (e.g. polyfills)
        whitelist: /\.css$/,
    }),

    // This is the plugin that turns the entire output of the server build
    // into a single JSON file. The default file name will be
    // `vue-ssr-server-bundle.json`
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
        }),
        new VueSSRServerPlugin(),
        new WebpackBar({
            name: 'Server',
            color: '#ffaa00',
            profile: true,
        }),
    ],
})
