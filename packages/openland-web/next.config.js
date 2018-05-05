const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const path = require('path');

const config = {
    pageExtensions: ['ts', 'tsx'],
    webpack(config, options) {

        // // Page Extensions
        // if (!config.pageExtensions) {
        //     config.pageExtensions = ['jsx', 'js']
        // }
        // if (config.pageExtensions.indexOf('ts') === -1) {
        //     config.pageExtensions.unshift('ts')
        // }
        // if (config.pageExtensions.indexOf('tsx') === -1) {
        //     config.pageExtensions.unshift('tsx')
        // }
    

        // Enable development sourcemaps
        if (options.dev) {
            config.devtool = 'cheap-module-eval-source-map'
        }

        // Merge paths
        const tsConfig = require("../../tsconfig.json");
        const alias = {};
        for (let key of Object.keys(tsConfig.compilerOptions.paths)) {
            alias[key.replace(/\/\*$/, "")] = path.resolve(__dirname + '../../', tsConfig.compilerOptions.paths[key][0].replace(/[\/]\*$/, ""));
        }
        config.resolve.alias = Object.assign({}, config.resolve.alias, alias);

        // Ignore large library from parsing
        config.module.noParse = /(mapbox-gl)\.js$/

        // Typescript
        const {
            dir,
            defaultLoaders,
            dev,
            isServer
        } = options

        // Enable resolving of ts
        config.resolve.extensions.push('.ts', '.tsx')

        // Hot loader
        if (dev && !isServer) {
            config.module.rules.push({
                test: /\.(ts|tsx)$/,
                loader: 'hot-self-accept-loader',
                include: [path.join(dir, 'pages')],
                options: {
                    extensions: /\.(ts|tsx)$/
                }
            })
        }

        // Loader
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [path.resolve(dir + '../../../')],
            exclude: /node_modules/,
            use: [
                defaultLoaders.babel,
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            ]
        })

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
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE)
};

module.exports =  withBundleAnalyzer(config)