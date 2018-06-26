// const webpack = require('webpack');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withTypescript = require('@zeit/next-typescript')
const path = require('path');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const StatsPlugin = require('stats-webpack-plugin');
// const HappyPack = require('happypack');

const config = withTypescript({
    pageExtensions: ['page.ts', 'page.tsx'],
    webpack(config, options) {

        // Merge paths from typescript config
        const tsConfig = require("../../tsconfig.json");
        const alias = {};
        for (let key of Object.keys(tsConfig.compilerOptions.paths)) {
            alias[key.replace(/\/\*$/, "")] = path.resolve(__dirname + '../../', tsConfig.compilerOptions.paths[key][0].replace(/[\/]\*$/, ""));
        }
        config.resolve.alias = Object.assign({}, config.resolve.alias, alias);

        // Ignore large library from parsing and solve some babel issues
        config.module.noParse = /(mapbox-gl)\.js$/

        // Typescript
        const {
            dir,
            defaultLoaders,
            dev,
            isServer
        } = options

        // Ask babel to handle typescript files
        // Modules are not loading by default since root folder is out of scope
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [path.resolve(dir + '/../')],
            exclude: /node_modules/,
            use: defaultLoaders.babel,
        })

        if (dev && !isServer) {
            config.module.rules.push({
                test: /\.(ts|tsx)$/,
                include: defaultLoaders.hotSelfAccept.options.include,
                exclude: /node_modules/,
                use: defaultLoaders.hotSelfAccept
            })
        }

        // Disable babel cache
        // defaultLoaders.babel.options.cacheDirectory = false

        // Enable profiling
        // if (!isServer) {
        //     config.profile = true;
        //     config.plugins.push(new StatsPlugin('stats-client.json', {
        //         chunkModules: false,
        //         assets: false,
        //         chunks: false,
        //         reasons: true
        //         // exclude: [/node_modules[\\\/]react/]
        //     }));
        // }

        // Enable debug
        // config.debug = true;

        // Disable minification
        // config.plugins = config.plugins.filter(
        //     (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
        // )

        // Enable uglify cache
        let uglify = config.plugins.find((plugin) => (plugin.constructor.name === 'UglifyJsPlugin'))
        if (uglify) {
            uglify.options.cache = true;
        }

        // Hard Source
        // if (!isServer) {
        //     config.plugins.push(new HardSourceWebpackPlugin({
        //         cacheDirectory: 'node_modules/.cache/hard-source-client/[confighash]',
        //         info: {
        //             // mode: 'none',
        //             level: 'debug',
        //         }
        //     }))
        // } else {
        //     config.plugins.push(new HardSourceWebpackPlugin({
        //         cacheDirectory: 'node_modules/.cache/hard-source-server/[confighash]',
        //         info: {
        //             // mode: 'none',
        //             level: 'debug',
        //         }
        //     }))
        // }

        // Happy Pack
        // config.module.rules = config.module.rules.map((v) => {
        //     if (v.use === defaultLoaders.babel) {
        //         return {
        //             ...v,
        //             use: {
        //                 ...v.use,
        //                 loader: 'happypack/loader',
        //             }
        //         };
        //     }

        //     return v;
        // })
        // config.plugins.push(new HappyPack({
        //     loaders: [defaultLoaders.babel.loader]
        // }));

        // Creating vendor library
        // Doesn't work...
        // if (!isServer) {
        //     let ex = config.entry;
        //     config.entry = async () => {
        //         let res = {
        //             'vendor.js': ['react-lottie'],
        //             ...(await ex()),
        //         };
        //         console.warn(res);
        //         return res;
        //     };
        //     console.warn(config.plugins);

        //     config.plugins.splice(config.plugins.length - 2, 0, (new webpack.optimize.CommonsChunkPlugin({
        //         name: 'vendor.js',
        //         filename: dev ? 'static/commons/vendor.js' : 'static/commons/vendor-[chunkhash].js',
        //         // minChunks: Infinity,
        //         children: true
        //     })));
        // }

        return config;
    },
    // typescriptLoaderOptions: {
    //     transpileOnly: true,
    //     context: path.resolve(__dirname + '../../../'),
    //     configFile: path.resolve(__dirname + '../../../tsconfig.json')
    //     // configFile: 'tsconfig.json'
    // },
    useFileSystemPublicRoutes: false,
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    assetPrefix: process.env.CDN_PREFIX ? process.env.CDN_PREFIX : undefined
});

module.exports = withBundleAnalyzer(config)