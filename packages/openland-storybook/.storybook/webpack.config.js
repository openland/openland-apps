const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [['react-app', { flow: false, typescript: true }]],
        },
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
