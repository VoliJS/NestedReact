module.exports = {
     entry: "./src/main",

     output : {
       filename : './react-bone.js',
       library : "React",
       libraryTarget : 'umd'
     },

     devtool : 'source-map',

     externals : [
       {
         'react' : {
           commonjs : 'react',
           commonjs2 : 'react',
           amd : 'react',
           root : 'React'
         },

         'react-dom' : {
           commonjs : 'react-dom',
           commonjs2 : 'react-dom',
           amd : 'react-dom',
           root : 'ReactDOM'
         }
       }
     ]
};
