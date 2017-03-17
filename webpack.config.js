//todo:webpack使用最新版?
var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

// http://www.jbrantly.com/typescript-and-webpack/  配置项
module.exports = {
    entry: {
        app: ["./src/app.ts"]
    },
    output: {
        path: __dirname + '/dist', //输出目录
        filename: 'app.js', //输出文件名
        publicPath: '/dist/', //启动webpack-dev-server服务时，实际上不生成文件，这里对应的是内存中的目录；
    },
    devServer: {
        // contentBase: "www", //本地服务器所加载的页面所在的目录
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "8000"
    },
    devtool: 'source-map', //source-map
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.ts', '.js']
    },
    plugins: [],
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
}