const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// <editor-fold desc="Base config">

const config = {
    stats: 'none',
    output: {
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/dist/',
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: [ '.vue', '.js', '.ts', '.tsx', '.styl' ], // added .js
        alias: {
            'public': path.resolve(__dirname, '../../public'),
        },
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: {
                    minChunks: 1,
                    enforce: true,
                    priority: -20,
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        whitespace: 'preserve',
                    },
                },
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]?[hash]',
                    outputPath: 'images',
                    esModule: false,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                    name: '[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new Dotenv('./.env'),
    ],
}

// </editor-fold>

// NODE_ENV
let isDevelopment = process.env.NODE_ENV === 'development'

config.devtool = isDevelopment ? 'cheap-module-source-map' : false

config.optimization.minimize = !isDevelopment

// <editor-fold desc="Rules">

config.module.rules.push(...[

    // this will apply to both plain `.css` files
    // AND `<style>` blocks in `.vue` files
    {
        test: /\.css$/,
        use: [
            isDevelopment ? { loader: 'vue-style-loader' } : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // only enable hot in development
                    hmr: isDevelopment,
                    // if hmr does not work, this is a forceful method.
                    reloadAll: isDevelopment,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[local]_[hash:base64:8]',
                    },
                },
            },
        ],
    },

    // this will apply to both plain `.stylus` files
    // AND `<style>` blocks in `.vue` files
    {
        test: /\.styl(us)?$/,
        use: [
            {
                loader: ExtractCssChunks.loader,
                options: {
                    hmr: isDevelopment,
                    // if hmr does not work, this is a forceful method.
                    reloadAll: true,
                },
            },
            'css-loader',
            'stylus-loader',
        ],
    },

])

// </editor-fold>

// <editor-fold desc="In Development Mode">

if (isDevelopment) {

    config.mode = 'development'

    config.plugins.push(...[

        new FriendlyErrorsPlugin(),

        new ExtractCssChunks({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),

        new webpack.optimize.ModuleConcatenationPlugin(),

        new Dotenv({
            path: './.env.development',
        }),

    ])

}

// </editor-fold>

// <editor-fold desc="In Production Mode">

else {

    config.optimization.minimizer = [
        new TerserJSPlugin({
            test: /\.js($|\?)/i,
            sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
    ]

    config.plugins.push(...[
        // ... Vue Loader plugin omitted
        new MiniCssExtractPlugin({
            // filename: 'style.css',

            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),

        new ExtractCssChunks({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),

        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        new PurgecssPlugin({
            paths: glob.sync([
                path.join(__dirname, '../../public/index.template.html'),
                path.join(__dirname, '../../src/App.vue'),
                path.join(__dirname, '../../src/**/*.vue'),
                path.join(__dirname, '../../src/**/*.js'),
                path.join(__dirname, '../../src/**/*.css'),
                path.join(__dirname, '../../src/**/*.styl'),
            ], { nodir: true }),
            extractors: [
                {
                    extractor: class TailwindExtractor {
                        static extract(content) {
                            return content.match(/[A-z0-9-_:\/]+/g) || []
                        }
                    },
                    extensions: [ 'html', 'vue', 'js', 'styl' ],
                },
            ],
            whitelist: [],
            whitelistPatterns: [],
        }),

        new Dotenv({
            path: './.env.production',
        }),

        new CleanWebpackPlugin(),
    ])

}

// </editor-fold>

module.exports = config
