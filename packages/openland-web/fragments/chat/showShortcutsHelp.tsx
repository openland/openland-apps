import * as React from 'react';
import { css, cx } from 'linaria';
import { TextTitle3, TextCaption, TextBody } from 'openland-web/utils/TextStyles';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { SpanView } from 'openland-web/fragments/chat/messenger/message/content/SpannedView';
import {
    SpanType,
    SpanBold,
    SpanItalic,
    SpanCodeBlock,
    SpanCodeInline,
    SpanIrony,
    SpanLoud,
} from 'openland-y-utils/spans/Span';
import { detectOS } from 'openland-x-utils/detectOS';

type SpanT =
    | SpanType.code_block
    | SpanType.code_inline
    | SpanType.italic
    | SpanType.bold
    | SpanType.irony
    | SpanType.loud;

const shortcutsContainer = css`
    padding: 15px 24px;
`;

const shortcutsGroupStyle = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;

    & .shortcut-row:last-child {
        margin-bottom: 0;
    }
`;

const ShortcutsGroup = (props: { children: any[] }) => (
    <div className={shortcutsGroupStyle}>{props.children}</div>
);

const shortcutRow = css`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const shortcutTagStyle = css`
    display: inline-block;
    color: var(--foregroundSecondary);
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    margin-right: 8px;
    padding: 2px 8px;
`;

const shortcutDescriptionStyle = css`
    margin-left: 4px;
`;

const shortcutTitle = css`
    margin-bottom: 16px;
`;

const Shortcut = ({ shortcuts, description }: { shortcuts: string[]; description?: string }) => (
    <div className={cx(shortcutRow, 'shortcut-row')}>
        {shortcuts.map((shortcut, key) => {
            return (
                <span className={cx(shortcutTagStyle, TextCaption)} key={key}>
                    {shortcut}
                </span>
            );
        })}

        {description && (
            <span className={cx(shortcutDescriptionStyle, TextBody)}>{description}</span>
        )}
    </div>
);

const SpanPreview = ({ spanType, text }: { spanType: SpanT; text: string }) => {
    return (
        <SpanView
            span={
                {
                    type: spanType,
                    offset: 0,
                    length: text.length,
                } as SpanCodeBlock | SpanCodeInline | SpanItalic | SpanBold | SpanIrony | SpanLoud
            }
        >
            {text}
        </SpanView>
    );
};

const orStyle = css`
    margin-left: 4px;
    margin-right: 8px;
`;

const Formatting = ({
    formatting,
    shortcuts,
}: {
    formatting: { type: SpanT; text: string };
    shortcuts?: string[];
}) => (
        <div className={cx(shortcutRow, 'shortcut-row')}>
            <SpanPreview spanType={formatting.type} text={formatting.text} />
            {shortcuts && <div className={cx(orStyle, TextBody)}>or</div>}
            {shortcuts &&
                shortcuts.map((shortcut, key) => {
                    return (
                        <span className={cx(shortcutTagStyle, TextCaption)} key={key}>
                            {shortcut}
                        </span>
                    );
                })}
        </div>
    );

export const ShortcutsBody = () => {
    let os = detectOS();
    return (
        <XScrollView3 flexShrink={1} useDefaultScroll={true}>
            <div className={shortcutsContainer}>
                <div className={cx(shortcutTitle, TextTitle3)}>Keyboard shortcuts</div>
                <ShortcutsGroup>
                    <Shortcut shortcuts={['Enter']} description="Send message" />
                    <Shortcut shortcuts={['Shift + Enter']} description="New line" />
                    <Shortcut
                        shortcuts={['↑']}
                        description="Edit last message (works when the message box is in focus)"
                    />
                </ShortcutsGroup>
                <ShortcutsGroup>
                    <Shortcut shortcuts={['Ctrl + S']} description="Search chats" />
                    <Shortcut shortcuts={['Esc']} description="Close chat" />
                    {/* <Shortcut
                        shortcuts={['Ctrl + Option + N', 'Ctrl + Alt + N (Windows)']}
                        description="New chat"
                    /> */}
                </ShortcutsGroup>
                <ShortcutsGroup>
                    {os === 'Mac' && <Shortcut
                        shortcuts={['Ctrl + Cmd + Space']}
                        description="Emojis (standard Mac shortcut)"
                    />}
                    <Shortcut
                        shortcuts={[os === 'Mac' ? 'Cmd + Enter' : 'Ctrl + Enter']}
                        description="Submit form"
                    />
                </ShortcutsGroup>
                <div className={cx(shortcutTitle, TextTitle3)}>Text formatting</div>
                <ShortcutsGroup>
                    <Formatting formatting={{ type: SpanType.loud, text: '# Heading 1' }} />
                    <Formatting
                        formatting={{ type: SpanType.bold, text: '*bold*' }}
                    // shortcuts={['Cmd + B', 'Ctrl + B (Windows)']}
                    />
                    <Formatting
                        formatting={{ type: SpanType.italic, text: '_italic_' }}
                    // shortcuts={['Cmd + I', 'Ctrl + I (Windows)']}
                    />
                    <Formatting
                        formatting={{ type: SpanType.irony, text: '~irony~' }}
                    // shortcuts={['Cmd + U', 'Ctrl + U (Windows)']}
                    />
                    <Formatting
                        formatting={{ type: SpanType.code_inline, text: '`one line code block`' }}
                    />
                    <Formatting
                        formatting={{
                            type: SpanType.code_block,
                            text: '```multiline code blocks```',
                        }}
                    />
                </ShortcutsGroup>
            </div>
        </XScrollView3>
    );
};

export function showShortcutsHelp() {
    showModalBox({ title: 'Shortcuts', width: 524, useTopCloser: true }, () => <ShortcutsBody />);
}
