const path = require('path')

module.exports = {
    mode: 'development',
    entry: './mainWP.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './')
    }
}
