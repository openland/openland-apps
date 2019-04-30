import * as React from 'react';
import * as PropTypes from 'prop-types';
// type ShortcutManager
const { ShortcutManager } = require('react-shortcuts');
import Shortcuts from './shortcuts';
import UUID from 'uuid/v4';

const shortcutManager = new ShortcutManager({
    App: {},
});

export class XShortcutsRoot extends React.Component {
    static childContextTypes = {
        shortcuts: PropTypes.object.isRequired,
    };
    getChildContext() {
        return { shortcuts: shortcutManager };
    }
    render() {
        return <>{this.props.children}</>;
    }
}

// list of pairs {id, keymap} ordered by component depth
let listOfIdKeymaps: any = [];

const updateKeymap = () => {
    let finalKeymap = {};
    if (
        listOfIdKeymaps.length &&
        listOfIdKeymaps[listOfIdKeymaps.length - 1].supressOtherShortcuts
    ) {
        finalKeymap = listOfIdKeymaps[listOfIdKeymaps.length - 1].keymap;
    } else {
        listOfIdKeymaps.forEach(({ keymap }: any) => {
            finalKeymap = { ...finalKeymap, ...keymap };
        });
    }

    // console.log(JSON.stringify(finalKeymap, null, 2));

    shortcutManager.setKeymap({
        App: finalKeymap,
    });
};

export class XShortcuts extends React.Component<{
    handlerMap: Object;
    children: any;
    keymap: Object;
    supressOtherShortcuts?: boolean;
}> {
    componentId: string;
    constructor(props: any) {
        super(props);
        this.componentId = UUID();
    }

    componentWillMount() {
        listOfIdKeymaps.push({
            id: this.componentId,
            keymap: this.props.keymap,
            supressOtherShortcuts: this.props.supressOtherShortcuts,
        });
        updateKeymap();
    }

    componentWillUnmount() {
        listOfIdKeymaps = listOfIdKeymaps.filter(
            ({ id }: { id: string }) => id !== this.componentId,
        );
        updateKeymap();
    }

    handleActions = (action: any, event: any) => {
        const filteredIdKeymapsPairs = listOfIdKeymaps.filter(
            ({ keymap }: any) => Object.keys(keymap).indexOf(action) !== -1,
        );

        // last one wins
        if (
            filteredIdKeymapsPairs.length &&
            filteredIdKeymapsPairs[filteredIdKeymapsPairs.length - 1].id === this.componentId
        ) {
            this.props.handlerMap[action](event);
        }
    };

    render() {
        return (
            <Shortcuts
                name="App"
                handler={this.handleActions}
                isolate
                alwaysFireHandler
            >
                {this.props.children}
            </Shortcuts>
        );
    }
}
