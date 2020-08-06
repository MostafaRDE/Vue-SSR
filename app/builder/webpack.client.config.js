const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WebpackBar = require('webpackbar')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const baseConfig = require('../../builder/webpack.base.config.js')

module.exports = webpackMerge(baseConfig, {
    entry: {
        app: './src/entry-client.js',
    },
    resolve: {
        alias: {
            'create-api': './create-api-client.js',
        },
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
        }),
        // Important: this splits the webpack runtime into a leading chunk
        // so that async chunks can be injected right after it.
        // this also enables better caching for your app/vendor code.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity,
        // }),
        // This plugins generates `vue-ssr-client-manifest.json` in the
        // output directory.
        new VueSSRClientPlugin(),
        new WebpackBar({
            name: 'Client',
            profile: true,
        }),
    ],
})
