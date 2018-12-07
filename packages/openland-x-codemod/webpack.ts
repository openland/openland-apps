import * as webpack from 'webpack';
import { processFile } from './utils/processFile';

const jsxstyleLoader: webpack.loader.Loader = function (content: string | Buffer) {
    this.callback(null, processFile(content as string));
    return;
};

export default jsxstyleLoader;