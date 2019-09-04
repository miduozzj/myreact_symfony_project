var Encore = require('@symfony/webpack-encore');
Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    //Web服务器用于访问输出路径的公共路径 绝对路径 有子目录，而不是根目录
     .setPublicPath('/myreact-project/public/build/')
     //.setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    .setManifestKeyPrefix('build/')


    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('login', './assets/js/login.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel(function (babelConfig) {
        babelConfig.plugins = [
            "@babel/plugin-proposal-object-rest-spread","@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            ["import", {libraryName: "antd", style: 'css'} ]
        ]
    })
    .enableLessLoader()
    // .enableLessLoader(function(options) {
    //        options.javascriptEnabled= true;
    //        options.modifyVars={
    //            'font-family':"PingFangSC-Regular",
    //            'font-size-base': '38px'
    //        };
    // })
    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    .enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')
    .configureUrlLoader({
        images: {
           limit: 8192,
        }
    })
    // .addLoader(
    //     {
    //         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    //         use: [
    //             {
    //                 loader: 'babel-loader',
    //             },
    //             {
    //                 loader: '@svgr/webpack',
    //                 options: {
    //                     babel: false,
    //                     icon: true,
    //                 },
    //             },
    //         ]
    //     }
    // )
;

module.exports = Encore.getWebpackConfig();
