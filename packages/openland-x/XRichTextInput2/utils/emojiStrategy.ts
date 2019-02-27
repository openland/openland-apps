const findWithRegex = require('find-with-regex').default;
const emojione = require('emojione');

const unicodeRegex = new RegExp(emojione.unicodeRegexp, 'g');

export default (contentBlock: Object, callback: Function) => {
    findWithRegex(unicodeRegex, contentBlock, callback);
};
