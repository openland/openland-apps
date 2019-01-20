import * as React from 'react';
import Glamorous from 'glamorous';
import { XModal } from 'openland-x-modal/XModal';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';

const KeyboardShortcuts = Glamorous.div({
    padding: '7px 0 19px',
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
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },

    '& strong': {
        fontWeight: 600,
    },
});

export const ShortcutsModal = (props: { target: any }) => {
    const { isMobile } = React.useContext(MobileSidebarContext);
    if (isMobile) {
        return null;
    }
    return (
        <XModal title="Keyboard shortcuts" useTopCloser={true} target={props.target}>
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
                    Edit last message (works when the message box is in focus)
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
                    <span>Ctrl + Cmd + Space (Mac)</span> Emojis (standard Mac shortcut)
                </KeyboardShortcut>
                <KeyboardShortcut>
                    <span>Ctrl + Option + N (Mac)</span>
                    <span>Ctrl + Alt + N (Windows)</span> New chat
                </KeyboardShortcut>
            </KeyboardShortcuts>
        </XModal>
    );
};
