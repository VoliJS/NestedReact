var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry : "./lib/index",

    output : {
        filename      : './dist/index.min.js',
        library       : "React",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    externals : [
        {
            'type-r' : {
                commonjs  : 'nestedtypes',
                commonjs2 : 'nestedtypes',
                amd       : 'nestedtypes',
                root      : 'Nested'
            },

            'react' : {
                commonjs  : 'react',
                commonjs2 : 'react',
                amd       : 'react',
                root      : 'React'
            },

            'react-dom' : {
                commonjs  : 'react-dom',
                commonjs2 : 'react-dom',
                amd       : 'react-dom',
                root      : 'ReactDOM'
            }
        }
    ],

    plugins : [
        new UnminifiedWebpackPlugin()
    ]
};