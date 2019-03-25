// const webpack = require('webpack');
const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withCSS = require('@zeit/next-css');

const config = {
    pageExtensions: ['page.ts', 'page.tsx'],
    webpack(config, options) {
        const cacheDir = path.resolve(__dirname + '/../../node_modules/.cache');

        // wat?
        config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

        // Merge paths from typescript config
        const tsConfig = require('../../tsconfig.json');
        const alias = {};
        for (let key of Object.keys(tsConfig.compilerOptions.paths)) {
            alias[key.replace(/\/\*$/, '')] = path.resolve(
                __dirname + '../../',
                tsConfig.compilerOptions.paths[key][0].replace(/[\/]\*$/, ''),
            );
        }
        // Hack runtime
        alias['openland-y-runtime'] = alias['openland-y-runtime-web'];
        config.resolve.alias = Object.assign({}, config.resolve.alias, alias);

        // Ignore large library from parsing and solve some babel issues
        config.module.noParse = [/(mapbox-gl)\.js$/, /(jquery)\.js$/];

        // Typescript
        const { dir, defaultLoaders, dev, isServer } = options;

        // Ask babel to handle typescript files
        // Modules are not loading by default since root folder is out of scope
        // let tsLoader = defaultLoaders.babel;

        // config.module.rules.unshift({
        //     test: /\.(tsx)$/,
        //     include: [path.resolve(dir + '/../')],
        //     exclude: /node_modules/,
        //     use: [{
        //         loader: path.resolve(dir + '/../openland-x-codemod/lib/openland-x-codemod/loader.js'),
        //     }]
        // });

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [path.resolve(dir + '/../')],
            exclude: /node_modules/,
            use: [
                defaultLoaders.babel,
                {
                    loader: 'linaria/loader',
                    options: {
                        sourceMap: process.env.NODE_ENV !== 'production',
                    },
                },
            ],
        });

        // HACK: Quick fix to resolve the custom babel config in root
        config.module.rules.forEach(rule => {
            if (rule.use.loader === 'next-babel-loader') {
                rule.use.options.cwd = undefined;
            }
        });

        // if (dev && !isServer) {
        //     config.module.rules.push({
        //         test: /\.(ts|tsx)$/,
        //         include: defaultLoaders.hotSelfAccept.options.include,
        //         exclude: /node_modules/,
        //         use: defaultLoaders.hotSelfAccept
        //     })
        // }

        // if (!isServer && !dev) {
        //     tsLoader = [{
        //             loader: 'cache-loader',
        //             options: {
        //                 cacheDirectory: cacheDir + '/cache-loader'
        //             }
        //         },
        //         defaultLoaders.babel
        //     ];
        // }

        // config.module.rules.unshift({
        //     test: /\.(js|jsx)$/,
        //     include: [
        //         path.resolve(dir + '/../../node_modules/react-native-web/')
        //     ],
        //     // exclude: /node_modules/,
        //     use: defaultLoaders.babel,
        // });

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
        // config.plugins = config.plugins.filter(
        //     (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
        // )

        // Enable uglify cache
        // let uglify = config.plugins.find((plugin) => (plugin.constructor.name === 'UglifyJsPlugin'))
        // if (uglify) {
        //     uglify.options.cache = true;
        // }

        // New Uglify
        // if (!isServer && !dev) {
        //     config.plugins.push(new NewUglify({
        //         cache: true,
        //         parallel: true,
        //         sourceMap: true,
        //         uglifyOptions: {
        //             mangle: {
        //                 safari10: true
        //             }
        //         }
        //     }));
        // }

        // Disable sourcemaps for server
        // if (isServer && !dev) {
        //     config.devtool = false;
        // }

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

        // if (!isServer){
        //     config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
        // }

        // Add moment to commons
        if (!isServer) {
            config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
            if (config.optimization.splitChunks.cacheGroups) {
                (config.optimization.splitChunks.cacheGroups.uploadcare = {
                    test: /\/node_modules\/uploadcare/,
                    name: 'vendor',
                    chunks: 'all',
                }),
                    (config.optimization.splitChunks.cacheGroups.moment = {
                        test: /\/node_modules\/moment/,
                        name: 'vendor',
                        chunks: 'all',
                    }),
                    (config.optimization.splitChunks.cacheGroups.momenttx = {
                        test: /\/node_modules\/moment-timezones/,
                        name: 'vendor',
                        chunks: 'all',
                    }),
                    (config.optimization.splitChunks.cacheGroups.emoji1 = {
                        test: /\/node_modules\/emojione/,
                        name: 'vendor',
                        chunks: 'all',
                    }),
                    (config.optimization.splitChunks.cacheGroups.emoji1react = {
                        test: /\/node_modules\/react-emojione/,
                        name: 'vendor',
                        chunks: 'all',
                    }),
                    (config.optimization.splitChunks.cacheGroups.draft = {
                        test: /\/node_modules\/draft-js/,
                        name: 'vendor',
                        chunks: 'all',
                    });
            }
        }

        return config;
    },
    useFileSystemPublicRoutes: false,
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    assetPrefix: process.env.CDN_PREFIX ? process.env.CDN_PREFIX : undefined,
};

module.exports = withCSS(withBundleAnalyzer(config));
