const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
            },
            {
                loader: require.resolve('react-docgen-typescript-loader'),
            },
        ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.plugins = [
        new TsConfigPathsPlugin({
            tsconfig: path.resolve(__dirname, '../../../tsconfig.json'),
            compiler: 'typescript',
        }),
    ];
    return config;
};
