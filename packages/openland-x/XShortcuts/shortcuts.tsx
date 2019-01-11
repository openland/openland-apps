// originaly from https://github.com/avocode/react-shortcuts/blob/master/src/component/shortcuts.js

import React from 'react';
import Combokeys from 'combokeys';
import PropTypes from 'prop-types';
import helpers from './helpers';

export default class extends React.Component<{
    children: any;
    handler: Function;
    name: string;
    eventType?: string;
    stopPropagation?: boolean;
    preventDefault?: boolean;
    isolate?: boolean;
    alwaysFireHandler?: boolean;
}> {
    static displayName = 'Shortcuts';

    static contextTypes = {
        shortcuts: PropTypes.object.isRequired,
    };

    static defaultProps = {
        eventType: null,
        stopPropagation: true,
        preventDefault: false,
        isolate: false,
        alwaysFireHandler: false,
    };

    componentDidMount() {
        this._onUpdate();

        if (this.props.name) {
            this.context.shortcuts.addUpdateListener(this._onUpdate);
        }
    }

    componentWillUnmount() {
        this._unbindShortcuts();

        if (this.props.name) {
            this.context.shortcuts.removeUpdateListener(this._onUpdate);
        }

        const element = this._getElementToBind();
        if (!element) {
            return;
        }

        element.removeEventListener('shortcuts:global', this._customGlobalHandler);
    }

    // NOTE: combokeys must be instance per component
    _combokeys: any = null;
    _lastEvent: any = null;

    _bindShortcuts = (shortcutsArr: any) => {
        const element = this._getElementToBind();
        if (!element) {
            return;
        }

        this._combokeys = new Combokeys(document.documentElement);
        this._decorateCombokeys();
        this._combokeys.bind(shortcutsArr, this._handleShortcuts, this.props.eventType);

        element.addEventListener('shortcuts:global', this._customGlobalHandler);
    };

    _customGlobalHandler = (e: any) => {
        const { character, modifiers, event } = e.detail;

        this._combokeys.handleKey(character, modifiers, event, true);
    };

    _decorateCombokeys = () => {
        const element = this._getElementToBind();
        if (!element) {
            return;
        }

        const originalHandleKey = this._combokeys.handleKey.bind(this._combokeys);

        // NOTE: stopCallback is a method that is called to see
        // if the keyboard event should fire
        this._combokeys.stopCallback = (event: any, domElement: any, combo: any) => {
            const isInputLikeElement =
                domElement.tagName === 'INPUT' ||
                domElement.tagName === 'SELECT' ||
                domElement.tagName === 'TEXTAREA' ||
                (domElement.contentEditable && domElement.contentEditable === 'true');

            let isReturnString;
            if (event.key) {
                isReturnString = event.key.length === 1;
            } else {
                isReturnString = Boolean(helpers.getCharacter(event));
            }

            if (isInputLikeElement && isReturnString && !this.props.alwaysFireHandler) {
                return true;
            }

            return false;
        };

        this._combokeys.handleKey = (
            character: string,
            modifiers: Object,
            event: any,
            isGlobalHandler: boolean,
        ) => {
            if (
                this._lastEvent &&
                event.timeStamp === this._lastEvent.timeStamp &&
                event.type === this._lastEvent.type
            ) {
                return;
            }
            this._lastEvent = event;

            if (this.props.isolate && !event.__isolateShortcuts) {
                event.__isolateShortcuts = true;
            }

            // NOTE: works normally if it's not an isolated event
            if (!event.__isolateShortcuts) {
                if (this.props.preventDefault) {
                    event.preventDefault();
                }
                if (this.props.stopPropagation && !isGlobalHandler) {
                    event.stopPropagation();
                }

                originalHandleKey(character, modifiers, event);
                return;
            }
            // NOTE: global shortcuts should work even for an isolated event
            if (this.props.isolate) {
                originalHandleKey(character, modifiers, event);
            }
        };
    };

    _getElementToBind = () => {
        return document.documentElement;
    };

    _unbindShortcuts = () => {
        if (this._combokeys) {
            this._combokeys.detach();
            this._combokeys.reset();
        }
    };

    _onUpdate = () => {
        const shortcutsArr =
            this.props.name && this.context.shortcuts.getShortcuts(this.props.name);
        this._unbindShortcuts();
        this._bindShortcuts(shortcutsArr || []);
    };

    _handleShortcuts = (event: any, keyName: any) => {
        if (this.props.name) {
            const shortcutName = this.context.shortcuts.findShortcutName(keyName, this.props.name);

            if (this.props.handler) {
                this.props.handler(shortcutName, event);
            }
        }
    };

    render() {
        return <>{this.props.children}</>;
    }
}
