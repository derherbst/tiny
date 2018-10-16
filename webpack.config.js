// для того, чтобы прописать абсолютный путь
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],

	mode: 'development',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },

	watch: true,

	devServer: {
        overlay: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
	            exclude: /node_modules/,
                use: {
	                loader: "babel-loader",
	                options: {
	                    presets: ['env', 'stage-0']
                    }
                }

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
	],
    devtool: "eval-sourcemap"
};