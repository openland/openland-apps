import * as React from 'react';
import PhotoIcon from '../icons/ic-photo-2.svg';
import FileIcon from '../icons/ic-file-3.svg';
import IntroIc from '../icons/ic-attach-intro-3.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import ShortcutsIcon from '../icons/ic-attach-shortcuts-3.svg';
import Glamorous from 'glamorous';

const KeyboardShortcuts = Glamorous.div({
    padding: '7px 0 19px'
});

const KeyboardShortcut = Glamorous.div({
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#000000',
    marginBottom: 15,

    '& span': {
        margin: '-1px 8px -2px 0',
        padding: '1px 8px 2px',
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '20px',
        color: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },

    '& strong': {
        fontWeight: 600
    }
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>(props => ({
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    opacity: props.disable ? 0.7 : undefined,
    cursor: props.disable ? 'default !important' : 'pointer',
    '&:first-child': {
        marginLeft: 6
    },
    '@media (max-width: 800px)': {
        fontSize: 0,
        '& > svg': {
            marginRight: '0!important'
        }
    },
    '&:hover': {
        color: props.disable ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.disable ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)'
        }
    },
    '&.shortcuts-button > svg, &.document-button > svg': {
        marginTop: 1,
        marginBottom: -1
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)'
        }
    }
}));

export class ShortcutsModal extends React.PureComponent {
    render() {
        return (
            <XModal
                title="Keyboard shortcuts"
                useTopCloser={true}
                target={
                    <AttachmentButton className="shortcuts-button">
                        <ShortcutsIcon />
                        <span>Shortcuts</span>
                    </AttachmentButton>
                }
            >
                <KeyboardShortcuts>
                    <KeyboardShortcut>
                        <span>Ctrl + S</span> Search chats
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Esc</span> Close chat
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>
                            <strong>↑</strong>
                        </span>{' '}
                        Edit last message (works when the message box is in
                        focus)
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Ctrl + E</span> Edit last message
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Option + ↑ (Mac)</span>
                        <span>Alt + ↑ (Windows)</span> Previous chat
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Option + ↓ (Mac)</span>
                        <span>Alt + ↓ (Windows)</span> Next chat
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Enter</span> Send message
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Shift + Enter</span> New line
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Cmd + Enter (Mac)</span>
                        <span>Ctrl + Enter (Windows)</span> Submit form
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Ctrl + Cmd + Space (Mac)</span> Emojis (standard
                        Mac shortcut)
                    </KeyboardShortcut>
                    <KeyboardShortcut>
                        <span>Ctrl + Option + N (Mac)</span>
                        <span>Ctrl + Alt + N (Windows)</span> New chat
                    </KeyboardShortcut>
                </KeyboardShortcuts>
            </XModal>
        );
    }
}

export class AttachmentRaw extends React.PureComponent<{
    handleAttach: React.MouseEventHandler<HTMLElement>;
    enabled?: boolean;
}> {
    render() {
        const { handleAttach, enabled } = this.props;

        return (
            <XHorizontal separator="none">
                <AttachmentButton
                    onClick={enabled ? handleAttach : undefined}
                    enabled={enabled}
                    disable={!enabled}
                >
                    <PhotoIcon />
                    <span>Photo</span>
                </AttachmentButton>
                <AttachmentButton
                    onClick={enabled ? handleAttach : undefined}
                    enabled={enabled}
                    disable={!enabled}
                    className="document-button"
                >
                    <FileIcon />
                    <span>Document</span>
                </AttachmentButton>
                <AttachmentButton
                    query={
                        !enabled
                            ? undefined
                            : { field: 'addItro', value: 'true' }
                    }
                    className="intro-button"
                    disable={!enabled}
                >
                    <IntroIc />
                    <span>Intro</span>
                </AttachmentButton>
                <ShortcutsModal />
            </XHorizontal>
        );
    }
}
