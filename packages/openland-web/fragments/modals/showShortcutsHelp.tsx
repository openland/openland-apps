import * as React from 'react';
import Glamorous from 'glamorous';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { SpanView } from 'openland-web/components/messenger/message/content/SpannedView';
import {
    SpanType,
    SpanBold,
    SpanItalic,
    SpanCodeBlock,
    SpanCodeInline,
    SpanIrony,
    SpanLoud,
} from 'openland-y-utils/spans/Span';

const KeyboardShortcuts = Glamorous.div({
    padding: '7px 40px 30px',
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

const Shortcut = ({ shortcuts, description }: { shortcuts: any[]; description?: string }) => {
    return (
        <KeyboardShortcut>
            {shortcuts.map((shortcut, key) => {
                return <span key={key}>{shortcut}</span>;
            })}

            {description}
        </KeyboardShortcut>
    );
};

const SpanPreview = ({
    spanType,
    text,
}: {
    spanType:
        | SpanType.code_block
        | SpanType.code_inline
        | SpanType.italic
        | SpanType.bold
        | SpanType.irony
        | SpanType.loud;

    text: string;
}) => {
    return (
        <SpanView
            span={
                {
                    type: spanType,
                    offset: 0,
                    length: text.length,
                } as (SpanCodeBlock | SpanCodeInline | SpanItalic | SpanBold | SpanIrony | SpanLoud)
            }
        >
            {text}
        </SpanView>
    );
};

export const ShortcutsBody = () => {
    return (
        <XScrollView3 flexShrink={1} useDefaultScroll={true}>
            <KeyboardShortcuts>
                <XView marginBottom={16} fontSize={18} fontWeight={'600'}>
                    Keyboard shortcuts
                </XView>
                <Shortcut shortcuts={['Enter']} description="Send message" />
                <Shortcut shortcuts={['Shift + Enter']} description="New line" />
                <Shortcut shortcuts={['Ctrl + E']} description="Edit last message" />
                <Shortcut
                    shortcuts={[<strong key="edit">↑</strong>]}
                    description="Edit last message (works when the message box is in focus)"
                />
                <Shortcut
                    shortcuts={['Cmd + S (Mac)', 'Ctrl + S (Windows)']}
                    description="Search chats"
                />
                <Shortcut
                    shortcuts={['Option + ↑ (Mac)', 'Alt + ↑ (Windows)']}
                    description="Previous chat"
                />
                <Shortcut
                    shortcuts={['Option + ↓ (Mac)', 'Alt + ↓ (Windows)']}
                    description="Next chat"
                />
                <Shortcut shortcuts={['Esc']} description="Close chat" />
                <Shortcut
                    shortcuts={['Ctrl + Option + N (Mac)', 'Ctrl + Alt + N (Windows)']}
                    description="New chat"
                />
                <Shortcut
                    shortcuts={['Ctrl + Cmd + Space (Mac)']}
                    description="Emojis (standard Mac shortcut)"
                />
                <Shortcut
                    shortcuts={['Cmd + Enter (Mac)', 'Ctrl + Enter (Windows)']}
                    description="Submit form"
                />
                <XView marginBottom={16} fontSize={18} fontWeight={'600'}>
                    Text formatting
                </XView>
                <SpanPreview spanType={SpanType.loud} text={`# Heading 1`} />
                <XView flexDirection="row">
                    <SpanPreview spanType={SpanType.bold} text={`*bold*`} /> or
                    <Shortcut shortcuts={['Cmd + B (Mac)', 'Ctrl + B (Windows)']} />
                </XView>
                <XView flexDirection="row">
                    <SpanPreview spanType={SpanType.italic} text={`_italic_`} /> or
                    <Shortcut shortcuts={['Cmd + I (Mac)', 'Ctrl + I (Windows)']} />
                </XView>
                <XView>
                    <SpanPreview spanType={SpanType.irony} text={`~irony~`} />
                </XView>
                <XView>
                    <SpanPreview spanType={SpanType.code_inline} text={`'one line code block'`} />
                </XView>
                <XView>
                    <SpanPreview
                        spanType={SpanType.code_block}
                        text={`'''multiline code blocks'''`}
                    />
                </XView>
            </KeyboardShortcuts>
        </XScrollView3>
    );
};

export function showShortcutsHelp() {
    showModalBox({ title: 'Shortcuts' }, () => <ShortcutsBody />);
}
