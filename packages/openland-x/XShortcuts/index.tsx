import * as React from 'react';
import * as PropTypes from 'prop-types';
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

type HandlerMapT = {
    [id: string]: Function;
};

type KeymapT = {
    [id: string]:
        | string
        | {
              osx?: string[];
              windows?: string[];
          };
};

// list of pairs {id, keymap} ordered by component depth

type XShortcutsT = {
    handlerMap: HandlerMapT;
    children: any;
    keymap: KeymapT;
    supressOtherShortcuts?: boolean;
};
export class XShortcuts extends React.Component<XShortcutsT> {
    componentId: string;
    listOfIdKeymaps: { id: string; keymap: KeymapT; supressOtherShortcuts?: boolean }[];
    constructor(props: XShortcutsT) {
        super(props);
        this.componentId = UUID();
        this.listOfIdKeymaps = [];
    }

    componentWillMount() {
        this.listOfIdKeymaps.push({
            id: this.componentId,
            keymap: this.props.keymap,
            supressOtherShortcuts: this.props.supressOtherShortcuts,
        });

        this.updateKeymap();
    }

    componentWillUnmount() {
        this.listOfIdKeymaps = this.listOfIdKeymaps.filter(
            ({ id }: { id: string }) => id !== this.componentId,
        );
        this.updateKeymap();
    }

    updateKeymap = () => {
        let finalKeymap = {};

        this.listOfIdKeymaps.forEach(({ keymap }: { keymap: KeymapT }) => {
            finalKeymap = { ...finalKeymap, ...keymap };
        });

        console.log(finalKeymap);

        shortcutManager.setKeymap({
            App: finalKeymap,
        });
    };

    handleActions = (action: string, event: React.KeyboardEvent) => {
        const filteredIdKeymapsPairs = this.listOfIdKeymaps.filter(
            ({ keymap }: { keymap: KeymapT }) => Object.keys(keymap).indexOf(action) !== -1,
        );

        console.log(filteredIdKeymapsPairs);

        if (
            filteredIdKeymapsPairs.length &&
            filteredIdKeymapsPairs[filteredIdKeymapsPairs.length - 1].id === this.componentId
        ) {
            this.props.handlerMap[action](event);
        }
    };

    render() {
        return (
            <Shortcuts name="App" handler={this.handleActions} isolate alwaysFireHandler>
                {this.props.children}
            </Shortcuts>
        );
    }
}
