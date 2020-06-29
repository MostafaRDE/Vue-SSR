const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: [ '.vue', '.js' ], // added .js
        alias: {
            'public': path.resolve(__dirname, '../public'),
        },
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimize: isProd,
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
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'vue-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]?[hash]',
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}
