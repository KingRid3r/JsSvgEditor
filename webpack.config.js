const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

const env = process.env.NODE_ENV;

let config =
{
    entry: "./src/index.js",
    output:
    {
    	path: path.resolve(__dirname, "./public/assets"),
    	filename: "./js/bundle.js"
    },
    module:
    {
        rules:
        [{
        	test: /\.js$/,
        	exclude: /node_modules/,
        	loader: "babel-loader"
        },
        {
			test: /\.scss$/,
			use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader', 'postcss-loader'],
  			}))
		}]
    },
    plugins: [
    	new ExtractTextWebpackPlugin("./stylesheets/styles.css")
    ],
    devServer:
    {
    	publicPath: "/assets/",
		contentBase: path.resolve(__dirname, "./public"),
		historyApiFallback: true,
		inline: true,
		open: true,
		hot: true
	},
	devtool: "eval-source-map"
}

module.exports = config;

if (env === 'production')
{
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin(),
		new OptimizeCSSAssets()
	);
}