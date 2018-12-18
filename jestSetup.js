const { reactSerializer } = require('linaria-jest');

const linaria = require('linaria');
const React = require('react');
React.memo = node => {
    if (typeof node.type === 'object' && node.type.$$typeof === Symbol.for('react.memo')) {
        return Object.create(node, {
            type: {
                configurable: true,
                enumerable: true,
                value: node.type.type,
            },
        });
    }

    return node;
};

React.useContext = id => id;
React.useMemo = id => id();

const { XStyleFactoryRegistry } = require('react-mental');
const { css } = require('glamor');
XStyleFactoryRegistry.registerFactory({
    createStyle: styles => {
        return css(styles).toString();
    },
});

global.decodeURI = id => id;

linaria.css = id => id;
expect.addSnapshotSerializer(reactSerializer);
