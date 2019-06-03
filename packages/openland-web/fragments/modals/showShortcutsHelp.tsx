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
import { css } from 'linaria';

const KeyboardShortcuts = Glamorous.div({
    padding: '2px 40px 30px',
});

const KeyboardShortcut = Glamorous.div({
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#000000',
    marginBottom: 12,
});

const shortcutSpanClassName = css`
    padding: 1px 8px 2px;
    display: inline-block;
    font-size: 13px
    font-weight: 400;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.06);
`;

const descriptionClassName = css`
    margin-left: 12px;
    font-size: 14px;
    line-height: 1.43;
    color: #000000;
`;

const Shortcut = ({ shortcuts, description }: { shortcuts: any[]; description?: string }) => {
    return (
        <KeyboardShortcut>
            {shortcuts.map((shortcut, key) => {
                if (!(typeof shortcut === 'string')) {
                    return shortcut;
                }
                return (
                    <span
                        className={shortcutSpanClassName}
                        style={{ marginLeft: key === 0 ? 0 : 8 }}
                        key={key}
                    >
                        {shortcut}
                    </span>
                );
            })}

            <span className={descriptionClassName}>{description}</span>
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

const arrowUpShortcutClassName = css`
    padding: 3px 6px 4px 6px;
    font-size: 13px;
    line-height: 1.54;
    font-weight: 600;
    border-radius: 8px;
    color: rgba(0, 0, 0, 0.5);
    background-color: rgba(0, 0, 0, 0.06);
`;

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
                    shortcuts={[
                        <strong className={arrowUpShortcutClassName} key="edit">
                            ↑
                        </strong>,
                    ]}
                    description="Edit last message (works when the message box is in focus)"
                />
                <XView height={22} />
                {/* overlapse with Cmd + S */}
                <Shortcut shortcuts={['Ctrl + S']} description="Search chats" />
                {/* overlapse with option + ↑ behaves weird with scroll */}
                <Shortcut
                    shortcuts={['Shift + Cmd + ↑ (Mac)', 'Shift + Ctrl + ↑ (Windows)']}
                    description="Previous chat"
                />
                <Shortcut
                    shortcuts={['Shift + Cmd + ↓ (Mac)', 'Shift + Ctrl + ↓ (Windows)']}
                    description="Next chat"
                />
                <Shortcut shortcuts={['Esc']} description="Close chat" />
                <Shortcut
                    shortcuts={['Ctrl + Option + N (Mac)', 'Ctrl + Alt + N (Windows)']}
                    description="New chat"
                />
                <XView height={20} />
                <Shortcut
                    shortcuts={['Ctrl + Cmd + Space (Mac)']}
                    description="Emojis (standard Mac shortcut)"
                />
                <Shortcut
                    shortcuts={['Cmd + Enter (Mac)', 'Ctrl + Enter (Windows)']}
                    description="Submit form"
                />
                <XView marginTop={33} marginBottom={11} fontSize={18} fontWeight={'600'}>
                    Text formatting
                </XView>
                <XView marginTop={5} marginBottom={17}>
                    <SpanPreview spanType={SpanType.loud} text={`# Heading 1`} />
                </XView>
                <XView flexDirection="row">
                    <SpanPreview spanType={SpanType.bold} text={`*bold*`} />
                    <XView paddingLeft={6} paddingRight={8}>
                        or
                    </XView>
                    <Shortcut shortcuts={['Cmd + B (Mac)', 'Ctrl + B (Windows)']} />
                </XView>
                <XView flexDirection="row">
                    <SpanPreview spanType={SpanType.italic} text={`_italic_`} />
                    <XView paddingLeft={6} paddingRight={8}>
                        or
                    </XView>
                    <Shortcut shortcuts={['Cmd + I (Mac)', 'Ctrl + I (Windows)']} />
                </XView>
                <XView flexDirection="row">
                    <SpanPreview spanType={SpanType.italic} text={`~irony~`} />
                    <XView paddingLeft={6} paddingRight={8}>
                        or
                    </XView>
                    <Shortcut shortcuts={['Cmd + R (Mac)', 'Ctrl + R (Windows)']} />
                </XView>
                <XView marginTop={12}>
                    <div>
                        <SpanPreview
                            spanType={SpanType.code_inline}
                            text={`'one line code block'`}
                        />
                    </div>
                </XView>
                <XView marginTop={12}>
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
