const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const {
    ANALYZE
} = process.env
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const config = {
    webpack(config, options) {
        if (ANALYZE) {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: 8888,
                openAnalyzer: true
            }))
        }
        config.module.noParse = /(mapbox-gl)\.js$/
        return config;
    },
    useFileSystemPublicRoutes: false,
    typescriptLoaderOptions: {
        transpileOnly: true
    },
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE)
};

// const withTypescript = require('next-awesome-typescript');
// module.exports = withTypescript({}, config);

const withTypescript = require('@zeit/next-typescript')
module.exports = withBundleAnalyzer(withTypescript(config));