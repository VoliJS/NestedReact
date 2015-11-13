module.exports = {
    entry : "./src/main",

    output : {
        filename      : './nestedreact.js',
        library       : "React",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    externals : [
        {
            'nestedtypes' : {
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
    ]
};
