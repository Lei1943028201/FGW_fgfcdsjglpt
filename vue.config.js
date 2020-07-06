const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    outputDir: 'dist',
    assetsDir: 'public',
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                //target:'http://172.16.193.191:8080/', // 徐清敏
                target:'http://172.16.193.114:8080/', // 唐东鹏
                //target:'http://172.16.192.209:8081/', // 谷家顺
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': 'api/'
                }
            },
        },
    },
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
