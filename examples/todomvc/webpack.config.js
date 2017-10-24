var webpack = require( 'webpack' );

module.exports = {
    entry  : './js/main.jsx',
    output : {
        path       : __dirname + '/dist',
        publicPath : '/dist/',
        filename   : 'app.js'
    },

    devtool : 'source-map',

    resolve : {
        modules : [ 'node_modules', 'js' ]
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
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    }
};
