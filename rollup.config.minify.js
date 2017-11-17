import uglify from 'rollup-plugin-uglify';

import config from './rollup.config'

config.output.file = 'dist/index.min.js';
config.plugins.push(uglify());
export default config;