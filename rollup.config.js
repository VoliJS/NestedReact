import resolve from 'rollup-plugin-node-resolve';

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
            'type-r': 'Nested',
            'react-dom': 'ReactDOM',
            'prop-types': 'PropTypes'
        }
    },
    plugins: [
        resolve(), //for support of `import X from "directory"` rather than verbose `import X from "directory/index"`
    ],
    sourcemap: true,
    external: [
        'react',
        'type-r',
        'react-dom',
        'prop-types'
    ]
};