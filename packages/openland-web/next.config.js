// const webpack = require('webpack');
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const withCSS = require('@zeit/next-css')
// const StatsPlugin = require('stats-webpack-plugin');
// const HappyPack = require('happypack');
const NewUglify = require('uglifyjs-webpack-plugin');

const config = {
    pageExtensions: ['page.ts', 'page.tsx'],
    webpack(config, options) {

        const cacheDir = path.resolve(__dirname + '/../../node_modules/.cache');

        // wat?
        config.resolve.extensions.push('.ts', '.tsx')

        // Merge paths from typescript config
        const tsConfig = require("../../tsconfig.json");
        const alias = {};
        for (let key of Object.keys(tsConfig.compilerOptions.paths)) {
            alias[key.replace(/\/\*$/, "")] = path.resolve(__dirname + '../../', tsConfig.compilerOptions.paths[key][0].replace(/[\/]\*$/, ""));
        }
        config.resolve.alias = Object.assign({}, config.resolve.alias, alias);

        // Ignore large library from parsing and solve some babel issues
        config.module.noParse = [/(mapbox-gl)\.js$/, /(jquery)\.js$/]

        // Typescript
        const {
            dir,
            defaultLoaders,
            dev,
            isServer
        } = options

        // Ask babel to handle typescript files
        // Modules are not loading by default since root folder is out of scope
        let tsLoader = defaultLoaders.babel;
        if (!isServer && !dev) {
            tsLoader = [{
                    loader: 'cache-loader',
                    options: {
                        cacheDirectory: cacheDir + '/cache-loader'
                    }
                },
                defaultLoaders.babel
            ];
        }
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [path.resolve(dir + '/../')],
            exclude: /node_modules/,
            use: tsLoader,
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

        // Disable hoisting
        // config.plugins = config.plugins.filter(
        //     (plugin) => (plugin.constructor.name !== 'ModuleConcatenationPlugin')
        // )

        // Disable uglify
        config.plugins = config.plugins.filter(
            (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
        )

        // Enable uglify cache
        // let uglify = config.plugins.find((plugin) => (plugin.constructor.name === 'UglifyJsPlugin'))
        // if (uglify) {
        //     uglify.options.cache = true;
        // }

        // New Uglify
        if (!isServer && !dev) {
            config.plugins.push(new NewUglify({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    mangle: {
                        safari10: true
                    }
                }
            }));
        }

        // Hard Source
        // Not working for client
        // if (!isServer) {
        //     config.plugins.unshift(new HardSourceWebpackPlugin({
        //         cacheDirectory: hs + '/client/[confighash]',
        //         info: {
        //             // mode: 'none',
        //             level: 'debug',
        //         }
        //     }))
        // if (isServer && !dev) {
        //     config.plugins.unshift(new HardSourceWebpackPlugin({
        //         cacheDirectory: cacheDir + '/hard-source/server/[confighash]',
        //         info: {
        //             level: 'error',
        //         }
        //     }))
        // }

        // Happy Pack (no improvements)
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

        // Creating vendor library (not working)
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
    useFileSystemPublicRoutes: false,
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    assetPrefix: process.env.CDN_PREFIX ? process.env.CDN_PREFIX : undefined
};

module.exports = withCSS(withBundleAnalyzer(withSourceMaps(config)));