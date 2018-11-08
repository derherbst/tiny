// для того, чтобы прописать абсолютный путь
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let template = require('./src/index.pug');

let conf = {
    // entry: {
	// 	bundle: './src/index.js' // здесь добавляем точки входа. имя свойства будет использовано в output -> filename
	// },

	entry: ['./src/index.js'], // здесь добавляем точки входа. имя свойства будет использовано в output -> filename

	mode: 'development',

    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: '[name].[chunkhash].js', // name берется из entry
        filename: 'bundle.js', // name берется из entry
        // publicPath: 'dist/'
    },

	watch: true,

	devServer: {
        port: 8081,
		contentBase: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
	            exclude: /node_modules/,
                use: {
	                loader: "babel-loader",
                    // options: {
	                 //    presets: ['env', 'stage-0']
                    // }
                }

            },
	        {
		        test: /\.pug$/,
		        use: [
		        	{
			            loader: "pug-loader"
		            }
		        ] // Please use raw loader in order to get the content string
	        },
	        { // sass / scss loader for webpack
		        test: /\.s?css$/,
		        use: ExtractTextPlugin.extract(
			        {
				        fallback: 'style-loader',
				        use: ['css-loader']
			        })
	        },
	        // graphics loader
	        {
	        	test: /\.(jpe?g|png|gif|svg)$/,
		        use: {
	        		loader: 'url-loader',
			        options: {
				        limit: 8000, // Convert images < 8kb to base64 strings
				        name: './static/img/[name].[ext]'
			        }
		        }
	        }
        ]
    },

	plugins: [
		new ExtractTextPlugin({ // define where to save the file
			filename: './static/css/[name].bundle.css', // now output for css bundle is => dist/static/css
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.pug'
		}),
	],

	resolve: {
    	extensions: ['.js', '.json', '.jsx', '*'] // чтобы вэбпак понимал расширение .jsx
	}
};

module.exports = (env, options) => {

	let production = options.mode === 'production';

	conf.devtool = production ? 'source-map' : 'eval-sourcemap';

	return conf;
}