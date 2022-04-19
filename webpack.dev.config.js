const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = [
  {
    mode: 'development',
    entry: './electron/main.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
				include: /electron/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: __dirname + '/build',
      filename: 'electron.js'
    }
  },
	{
		mode: 'development',
		entry: './electron/preload.ts',
		target: 'electron-preload',
		module: {
			rules: [{
				test: /\.ts$/,
				include: /electron/,
				use: [{ loader: 'ts-loader' }]
			}]
		},
		output: {
			path: __dirname + '/build',
			filename: 'preload.js'
		}
	},
	{
		mode: 'development',
		entry: './src/index.tsx',
		target: 'electron-renderer',
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
					use: ['style-loader', 'css-loader', 'sass-loader']
				}
			]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ]
		},
		output: {
			path: __dirname + "/build",
			filename: "react.js"
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `./src/index.html`
			})
		]
	}
];