const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const {
    ANALYZE
} = process.env

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
    typescriptLoaderOptions: {
        transpileOnly: true
    }
};

// const withTypescript = require('next-awesome-typescript');
// module.exports = withTypescript({}, config);

const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript(config);