const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    outputDir: 'dist',
    assetsDir: 'public',
    publicPath: '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue:192,
                        propList: ['*', '!border*']
                    })
                ]
            }
        }
    }
};
