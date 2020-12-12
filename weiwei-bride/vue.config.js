module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000",
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