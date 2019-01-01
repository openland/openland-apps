const path = require('path');

module.exports = {
    rootPath: "./packages",
    publicPath: "static", // these two are next.js
    publicUrl: "/static/", // specific settings
    watchDirs: ['packages'],
    webpack: (config) => {

        const tsConfig = require('./tsconfig.json');
        const alias = {};
        for (let key of Object.keys(tsConfig.compilerOptions.paths)) {
            alias[key.replace(/\/\*$/, '')] = path.resolve(
                __dirname, 'packages',
                tsConfig.compilerOptions.paths[key][0].replace(/[\/]\*$/, ''),
            );
        }

        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: 'babel-loader',
                        }],
                    },
                ],
            },
            resolve: {
                alias: Object.assign({}, config.alias, alias),
                extensions: [
                    ...config.resolve.extensions,
                    '.ts',
                    '.tsx',
                ],
            }
        }
    },
};