const path = require('path');
module.exports = {
    entry: './src/code.js', // 1
    output: { // 2
        path: path.resolve(__dirname, 'dist'), 
        filename: 'code.bundle.js',
    },
    module: { // 3
        rules: [{ test: /\.js$/, use: 'babel-loader'}],
    },
    optimization: { minimizer: []} , // 4
}