const path = require('path')

module.exports = {
    webpack: {
        alias: {
            '@Pages': path.resolve(__dirname, 'src/pages'),
            '@Services': path.resolve(__dirname, 'src/services'),
            '@Constants': path.resolve(__dirname, 'src/constants'),
            '@Utils': path.resolve(__dirname, 'src/utils')
        }
    }
}
