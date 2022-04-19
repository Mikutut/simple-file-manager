const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = [
	{
		mode: 'development',
		entry: './src/index.tsx',
		target: 'web',
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /.ts(x?)$/,
					include: /src/,
					use: ['ts-loader']
				},
				{
					test: /.s[ac]ss$/,
					include: /src\/styles/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
					]
				},
				{
					test: /.js$/,
					include: /build/,
					use: [{ 
						loader: 'babel-loader',
						options: {
							presets: ["@babel/preset-react"]
						}
					}]
				}
			]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ]
		},
		output: {
			path: __dirname + "/devserver",
			filename: "react.js"
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `./src/index.html`
			}),
			new MiniCssExtractPlugin()
		],
		devServer: {
			static: {
				directory: path.join(__dirname, "devserver")
			},
			port: 3000,
			hot: true
		}
	}
];