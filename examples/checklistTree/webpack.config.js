var webpack = require( 'webpack' );

module.exports = {
    entry  : './src/index.jsx',
    output : {
        // export itself to a global var
        path       : __dirname + '/dist',
        publicPath : '/dist/',
        filename   : 'app.js'
    },

    devtool : 'source-map',

    resolve : {
        modules : [ 'node_modules', 'src' ]
    },

    plugins : [
        new webpack.ProvidePlugin( {
            $          : "jquery",
            jQuery     : 'expose?jQuery!jquery',
            _          : "underscore"
        } )
    ],

    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test    : /\.jsx?$/,
                exclude : /(node_modules|lib)/,
                loader  : 'babel-loader'
            },
            {
                test: /\.js$/,
                //use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    }
};
