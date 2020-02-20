import * as React from 'react';
import * as QuillType from 'quill';
import { css, cx } from 'linaria';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { StickerFragment, UserForMention, RoomSharedNano } from 'openland-api/spacex.types';
import { emojiLink } from 'openland-y-utils/emojiLink';
import { EmojiPicker } from './emoji/EmojiPicker';
import { ShortcutButton } from './shortcuts/ShortcutsButton';
import { emojiConvertToName } from 'openland-y-utils/emojiExtract';
import { fileListToArray } from 'openland-web/fragments/chat/components/DropZone';
import { Span, SpanType } from 'openland-y-utils/spans/Span';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';

const quillStyle = css`
    flex-grow: 1;
    border-radius: 8px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: var(--backgroundTertiaryTrans);

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    .ql-container {
        border-radius: 8px;
        font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    }
    .ql-editor {
        padding: 8px 16px;
        padding-right: 32px;
        font-size: 15px;
        line-height: 24px;
    }
    .ql-editor.ql-blank::before {
        color: var(--foregroundTertiary);
        font-style: normal;
        left: 16px;
    }

    /* copy of quill.snow.css, line 21 */
    /* it seems like quill styles doesn't apply every time */
    /* so we should patch them */
    .ql-clipboard {
        left: -100000px;
        height: 1px;
        overflow-y: hidden;
        position: absolute;
        top: 50%;
    }
`;

const quillWithButtonStyle = css`
    .ql-editor {
        padding-right: 80px;
    }
`;

const mentionStyle = css`
    color: var(--accentPrimary);
    border-radius: 4px;
    padding-top: 1px;
    padding-bottom: 1px;
    font-weight: 600;
`;

const meMentionStyle = css`
    background-color: #daecfd;
    padding-left: 3px;
    padding-right: 3px;
`;

const emojiStyle = css`
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
`;

export type AllMention = { __typename: 'AllMention' };
export type URickTextValue = (string | MentionToSend)[];

export interface URickInputInstance {
    clear: () => void;
    focus: () => void;
    getText: () => URickTextValue;
    commitSuggestion(
        type: 'mention' | 'emoji',
        src: MentionToSend | { name: string; value: string },
    ): void;
    setContent: (inputValue: URickTextValue) => void;
}

export interface URickInputProps {
    initialContent?: URickTextValue;
    placeholder?: string;
    autofocus?: boolean;
    autocompletePrefixes?: string[];
    onTextChange?: (text: string) => void;
    onContentChange?: (content: URickTextValue) => void;
    onAutocompleteWordChange?: (text: string | null) => void;
    withShortcutsButton?: boolean;
    onStickerSent?: (sticker: StickerFragment) => void;

    onEmojiPickerShow?: () => void;
    onEmojiPickerHide?: () => void;

    onPressEnter?: () => Promise<boolean>;
    onPressUp?: () => boolean;
    onPressDown?: () => boolean;
    onPressTab?: () => boolean;
    onPressEsc?: () => boolean;

    onFilesPaste?: (files: File[]) => void;
    className?: string;
}

let Quill: typeof QuillType.Quill;
let QuillDelta: typeof QuillType.Delta;

function loadQuill() {
    if (!Quill) {
        // doing this shit because of SSR
        Quill = require('quill') as typeof QuillType.Quill;
        QuillDelta = require('quill-delta') as typeof QuillType.Delta;
        const Embed = Quill.import('blots/embed');

        // Mentions Blot
        class MentionBlot extends Embed {
            static create(mention: MentionToSend) {
                const node = super.create() as HTMLSpanElement;
                node.className = cx(mentionStyle, mention.__typename === 'User' && mention.isYou && meMentionStyle);
                node.innerText = mention.__typename === 'AllMention' ? 'All' : (mention.__typename === 'SharedRoom' ? mention.title : mention.name);
                node.dataset.user = JSON.stringify(mention);
                return node;
            }

            static value(domNode: HTMLSpanElement) {
                return JSON.parse(domNode.dataset.user!);
            }
        }
        MentionBlot.blotName = 'mention';
        MentionBlot.tagName = 'span';
        MentionBlot.className = 'mention';
        Quill.register(MentionBlot);

        // Emoji Blot
        class EmojiBlot extends Embed {
            static create(data: any) {
                const node = super.create() as HTMLImageElement;
                node.className = emojiStyle;
                node.src = emojiLink(data.name);
                node.dataset.value = data.value;
                node.dataset.name = data.name;
                return node;
            }

            static value(domNode: HTMLImageElement) {
                return { value: domNode.dataset.value, name: domNode.dataset.name };
            }
        }
        EmojiBlot.blotName = 'emoji';
        EmojiBlot.tagName = 'img';
        EmojiBlot.className = 'emoji';
        Quill.register(EmojiBlot);
    }
}

function extractActiveWord(quill: QuillType.Quill) {
    let selection = quill.getSelection();
    if (!selection) {
        return null;
    }
    let start = Math.max(0, selection.index - 64 /* Maximum lookback */);

    return findActiveWord(quill.getText(start, selection.index + selection.length - start), {
        start: selection.index,
        end: selection.index + selection.length,
    });
}

function convertInputValue(content: URickTextValue) {
    if (typeof content === 'string') {
        return new QuillDelta([{ insert: content }]);
    }
    return new QuillDelta(
        content.map(c => {
            if (typeof c === 'string') {
                // TODO: extract emoji
                return { insert: c };
            } else if (c.__typename === 'User' || c.__typename === 'Organization' || c.__typename === 'SharedRoom' || c.__typename === 'AllMention') {
                return { insert: { mention: c } };
            } else {
                return { insert: '' };
            }
        }),
    );
}

function convertQuillContent(content: QuillType.Delta) {
    let res: (string | UserForMention | AllMention)[] = [];
    for (let c of content.ops!) {
        if (c.insert) {
            if (typeof c.insert === 'string') {
                res.push(c.insert);
            } else if (typeof c.insert === 'object') {
                if (c.insert.mention) {
                    res.push(c.insert.mention);
                }
                if (c.insert.emoji) {
                    res.push(c.insert.emoji.value);
                }
            }
        }
    }
    return res;
}

export function convertToInputValue(text: string, spans: Span[]): URickTextValue {
    let value: URickTextValue = [];
    let textStringTail = text;
    for (let absSpan of spans.filter(span => span.type === SpanType.mention_user || span.type === SpanType.mention_organization || span.type === SpanType.mention_room || span.type === SpanType.mention_all)) {
        let userSpan = absSpan;
        let rawText = userSpan.textRaw || '';
        let spanStart = textStringTail.indexOf(rawText);
        if (spanStart === -1) {
            continue;
        }
        if (spanStart !== 0) {
            value.push(textStringTail.substring(0, spanStart));
        }
        if (userSpan.textRaw === '@All' || userSpan.type === SpanType.mention_all) {
            value.push({ __typename: 'AllMention' });
        } else {
            if (userSpan.type === SpanType.mention_user) {
                value.push({ __typename: 'User', ...userSpan.user });
            } else if (userSpan.type === SpanType.mention_room) {
                value.push({ __typename: 'SharedRoom', ...userSpan.room as RoomSharedNano });
            } else if (userSpan.type === SpanType.mention_organization) {
                value.push({ __typename: 'Organization', ...userSpan.organization });
            }
        }

        textStringTail = textStringTail.substring(
            spanStart + rawText.length,
            textStringTail.length,
        );
    }
    value.push(textStringTail);

    return value;
}

export function convertFromInputValue(
    data: URickTextValue,
): { text: string; mentions: MentionToSend[] } {
    let text = '';
    let mentions: MentionToSend[] = [];
    for (let t of data) {
        if (typeof t === 'string') {
            text += t;
        } else if (t.__typename === 'User') {
            text += '@' + t.name;
            mentions.push(t);
        } else if (t.__typename === 'Organization') {
            text += '@' + t.name;
            mentions.push(t);
        } else if (t.__typename === 'SharedRoom') {
            text += '@' + t.title;
            mentions.push(t);
        } else {
            text += '@All';
            mentions.push(t);
        }
    }

    const textValue = text.trim();

    return {
        text: textValue,
        mentions,
    };
}

export const URickInput = React.memo(
    React.forwardRef((props: URickInputProps, ref: React.Ref<URickInputInstance>) => {
        loadQuill();

        let editor = React.useRef<QuillType.Quill>();
        let containerRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => ({
            clear: () => {
                let ed = editor.current;
                if (ed) {
                    ed.setText('');
                }
            },
            focus: () => {
                let ed = editor.current;
                if (ed) {
                    ed.focus();
                    ed.setSelection(ed.getLength(), ed.getLength());
                }
            },
            getText: () => {
                let ed = editor.current;
                if (ed) {
                    return convertQuillContent(ed.getContents());
                } else {
                    return [''];
                }
            },
            commitSuggestion: (type: 'mention' | 'emoji', src: any) => {
                setTimeout(() => {
                    let ed = editor.current;
                    if (ed) {
                        let selection = ed.getSelection(true);
                        if (selection) {
                            let autocompleteWord: string | null = null;
                            let activeWord = extractActiveWord(ed);
                            if (activeWord) {
                                let activeWordCheckPrefix = activeWord.toLowerCase();
                                for (let p of props.autocompletePrefixes!) {
                                    if (activeWordCheckPrefix.startsWith(p)) {
                                        autocompleteWord = activeWord;
                                        break;
                                    }
                                }
                            }

                            if (!autocompleteWord) {
                                return;
                            }
                            // WARNING: Do not change order of lines.
                            // It seems there is a bug in Quill that inserts a new line when
                            // deleting text up to the end
                            ed.insertEmbed(selection.index, type, src, 'user');
                            if (type === 'mention') {
                                ed.insertText(selection.index + 1, ' ', 'user');
                            }
                            ed.deleteText(
                                selection.index - autocompleteWord.length,
                                autocompleteWord.length + selection.length,
                                'user',
                            );
                            ed.setSelection(selection.index + 1, 1, 'user');
                        }
                    }
                }, 10);
            },
            setContent: (inputValue: URickTextValue) => {
                let ed = editor.current;
                if (ed) {
                    ed.setContents(convertInputValue(inputValue));
                }
            },
        }));

        React.useEffect(
            () => {
                if (containerRef.current && containerRef.current.firstChild && props.onFilesPaste) {
                    let q = containerRef.current.firstChild;
                    let listener = (ev: ClipboardEvent) => {
                        if (props.onFilesPaste && ev.clipboardData && ev.clipboardData.files) {
                            props.onFilesPaste(fileListToArray(ev.clipboardData.files));
                        }
                    };
                    q.addEventListener('paste', listener);

                    return () => q.removeEventListener('paste', listener);
                }
                return () => false;
            },
            [props.onFilesPaste],
        );

        React.useLayoutEffect(() => {
            let q = new Quill(containerRef.current!, {
                formats: ['mention', 'emoji'],
                scrollingContainer: '.scroll-container',
                placeholder: props.placeholder,
            });
            if (props.initialContent) {
                q.setContents(convertInputValue(props.initialContent));
            }
            if (props.autofocus) {
                if (props.initialContent) {
                    q.setSelection({ index: q.getText().length - 1, length: 0 });
                } else {
                    q.focus();
                }
            }

            // Hacky method to add key binding before editor processing
            function addBinding(key: number, callback?: () => boolean | Promise<boolean>) {
                q.keyboard.addBinding({ key: key as any }, () => {
                    if (callback) {
                        let res = callback();
                        if (res) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                });
                (q.keyboard as any).bindings[key].unshift((q as any).keyboard.bindings[key].pop());
            }

            addBinding(9, props.onPressTab);
            addBinding(13, props.onPressEnter);
            addBinding(38, props.onPressUp);
            addBinding(40, props.onPressDown);
            addBinding(27, props.onPressEsc);

            // Handle text change
            let lastKnownText: string = '';
            let lastAutocompleteText: string | null = null;
            q.on('editor-change', () => {
                let tx = q.getText().trim();
                if (tx !== lastKnownText) {
                    lastKnownText = tx;
                    if (props.onTextChange) {
                        props.onTextChange(tx);
                    }
                }
                if (props.onContentChange) {
                    props.onContentChange(convertQuillContent(q.getContents()));
                }

                if (
                    props.onAutocompleteWordChange &&
                    props.autocompletePrefixes &&
                    props.autocompletePrefixes.length > 0
                ) {
                    let selection = q.getSelection();
                    if (selection) {
                        let autocompleteWord: string | null = null;
                        let activeWord = extractActiveWord(q);
                        if (activeWord) {
                            let activeWordCheckPrefix = activeWord.toLowerCase();
                            for (let p of props.autocompletePrefixes) {
                                if (activeWordCheckPrefix.startsWith(p)) {
                                    autocompleteWord = activeWord;
                                    break;
                                }
                            }
                        }
                        if (lastAutocompleteText !== autocompleteWord) {
                            lastAutocompleteText = autocompleteWord;
                            props.onAutocompleteWordChange(autocompleteWord);
                        }
                    }
                }
            });

            q.clipboard.addMatcher('img', (node, delta) => {
                let src = node.alt;
                let emojiName = src && emojiConvertToName(src);
                return new QuillDelta().insert(
                    emojiName ? { emoji: { name: emojiName, value: src } } : src,
                );
            });

            q.clipboard.addMatcher('td', (node, delta) => {
                return delta.insert(' ');
            });

            q.clipboard.addMatcher('th', (node, delta) => {
                return delta.insert(' ');
            });

            editor.current = q;
        }, []);

        const onEmojiPicked = React.useCallback((src: string) => {
            let q = editor.current;
            if (q) {
                let selection = q.getSelection(true);
                q.insertEmbed(
                    selection.index,
                    'emoji',
                    { name: emojiConvertToName(src), value: src },
                    'user',
                );
                q.setSelection(selection.index + 1, 0, 'user');
            }
        }, []);

        return (
            <div
                className={cx(
                    quillStyle,
                    'scroll-container',
                    props.className && props.className,
                    props.withShortcutsButton && quillWithButtonStyle,
                )}
            >
                <div ref={containerRef} />
                {props.withShortcutsButton && <ShortcutButton />}
                <EmojiPicker
                    onEmojiPicked={onEmojiPicked}
                    onStickerSent={props.onStickerSent}
                    onShow={props.onEmojiPickerShow}
                    onHide={props.onEmojiPickerHide}
                />
            </div>
        );
    }),
);
