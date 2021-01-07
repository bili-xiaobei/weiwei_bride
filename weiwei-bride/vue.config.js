module.exports = {
    devServer: {
        proxy: {
            "/api": {
                // target: "http://wwbride111.applinzi.com:5050",
                target: "http://127.0.0.1:3000",
                // target: "http://188.131.145.204:3000",
                
                // 部署
                changeOrigin: "true",
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    },
    css: {
        loaderOptions: {
            // 此文件为主题切换文件
            sass: {
                prependData: `@import "./public/css/_variable.scss";`,
            },
        },
    },
}