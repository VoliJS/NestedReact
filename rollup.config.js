import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
    input : 'lib/index.js',
    context: 'this', //used to silence warnings
    output : {
        file   : 'dist/index.js',
        format : 'umd',
        name   : 'ReactMVx',
        exports: 'named',
        globals: {
            react: 'React',
            'nestedtypes': 'Nested',
            'react-dom': 'ReactDOM',
            'prop-types': 'PropTypes'
        }
    },
    plugins: [
        resolve(),
        replace({ //workaround for webpack `externals` configuration
            exclude: 'node_modules/**',
            'type-r': 'nestedtypes'
        })
    ],
    sourcemap: true,
    external: [
        'react',
        'nestedtypes',
        'react-dom',
        'prop-types'
    ]
};