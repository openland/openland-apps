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

let listOfIdKeymaps: { id: string; keymap: KeymapT; supressOtherShortcuts?: boolean }[] = [];
export class XShortcuts extends React.Component<XShortcutsT> {
    componentId: string;

    constructor(props: XShortcutsT) {
        super(props);
        this.componentId = UUID();
    }

    componentWillMount() {
        listOfIdKeymaps.push({
            id: this.componentId,
            keymap: this.props.keymap,
            supressOtherShortcuts: this.props.supressOtherShortcuts,
        });

        this.updateKeymap();
    }

    componentWillUnmount() {
        listOfIdKeymaps = listOfIdKeymaps.filter(
            ({ id }: { id: string }) => id !== this.componentId,
        );

        this.updateKeymap();
    }

    componentWillReceiveProps(nextProps: XShortcutsT) {
        const index = listOfIdKeymaps.findIndex(({ id }) => id === this.componentId);

        listOfIdKeymaps[index] = {
            id: this.componentId,
            keymap: this.props.keymap,
            supressOtherShortcuts: nextProps.supressOtherShortcuts,
        };

        this.updateKeymap();
    }

    updateKeymap = () => {
        let finalKeymap = {};

        listOfIdKeymaps.forEach(({ keymap }: { keymap: KeymapT }) => {
            finalKeymap = { ...finalKeymap, ...keymap };
        });

        shortcutManager.setKeymap({
            App: finalKeymap,
        });
    };

    handleActions = (action: string, event: React.KeyboardEvent) => {
        console.log('handleActions');
        const filteredIdKeymapsPairs = listOfIdKeymaps.filter(
            ({ keymap }: { keymap: KeymapT }) => Object.keys(keymap).indexOf(action) !== -1,
        );

        const myDepth = filteredIdKeymapsPairs.findIndex(item => item.id === this.componentId);
        const suppressIds = filteredIdKeymapsPairs
            .filter(item => item.supressOtherShortcuts)
            .map(filteredItem => {
                return filteredIdKeymapsPairs.findIndex(item => item.id === filteredItem.id);
            });

        let isSuppresed = false;

        for (let i = 0; i < suppressIds.length; i++) {
            if (suppressIds[i] > myDepth) {
                isSuppresed = true;
            }
        }

        if (
            filteredIdKeymapsPairs.length &&
            filteredIdKeymapsPairs.filter(item => item.id === this.componentId).length &&
            !isSuppresed
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
