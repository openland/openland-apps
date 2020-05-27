import * as React from 'react';
import * as QuillType from 'quill';
import { css, cx } from 'linaria';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { StickerFragment, UserForMention } from 'openland-api/spacex.types';
import { EmojiPicker } from './emoji/EmojiPicker';
import { ShortcutButton } from './shortcuts/ShortcutsButton';
import { emojiConvertToName } from 'openland-y-utils/emojiExtract';
import { fileListToArray } from 'openland-web/fragments/chat/components/DropZone';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { XView } from 'react-mental';
import { getQuill } from 'openland-web/components/quill/getQuill';

const quillInputStyle = css`
    background-color: var(--backgroundTertiaryTrans);
    overflow-y: auto;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    .ql-editor {
        padding: 8px 16px;
        padding-right: 32px;
        font-size: 15px;
        line-height: 24px;
    }
`;

const quillArticleStyle = css`
    overflow-y: none;
    .ql-editor p {
        padding: 0 0px 12px;
    }
    .ql-editor {
        padding: 16px;
        font-size: 18px;
        line-height: 1.58;
    }
`;

const quillArticleTitleStyle = css`
    overflow-y: none;
    .ql-editor p {
        padding: 0px;
    }
    .ql-editor {
        padding: 16px;
        font-size: 32px;
        line-height: 34px;
    }
`;

const quillStyle = css`
    flex-grow: 1;
    border-radius: 8px;
    -webkit-overflow-scrolling: touch;
    position: relative;

    .ql-container {
        border-radius: 8px;
        font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
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
    onStickerSent?: (sticker: StickerFragment) => void;

    onEmojiPickerShow?: (stickers: boolean) => void;
    onEmojiPickerHide?: () => void;

    onPressEnter?: () => Promise<boolean> | boolean;
    onPressUp?: () => Promise<boolean> | boolean;
    onPressDown?: () => Promise<boolean> | boolean;
    onPressTab?: () => Promise<boolean> | boolean;
    onPressEsc?: () => Promise<boolean> | boolean;

    onFilesPaste?: (files: File[]) => void;

    appearance: 'input' | 'article' | 'article-title';
    className?: string;
    withShortcutsButton?: boolean;
    hideEmoji?: boolean;
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

export const URickInput = React.memo(
    React.forwardRef((props: URickInputProps, ref: React.Ref<URickInputInstance>) => {

        const lib = React.useMemo(() => getQuill(), []);
        const Quill = lib.Quill;
        const QuillDelta = lib.QuillDelta;

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

        // Embed Providers
        // const editorId = React.useMemo(() => randomKey(), []);
        // const [embeds, setEmbeds] = React.useState<{ key: string, component: any }[]>([]);
        // const attachEmbed = React.useCallback((key: string, component: any) => {
        //     setEmbeds((e) => [...e, { key, component }]);
        // }, []);
        // const dettachEmbed = React.useCallback((key: string) => {
        //     setEmbeds((e) => e.filter((v) => key !== key));
        // }, []);
        // React.useLayoutEffect(() => {
        //     registeredEditors.set(editorId, { attach: attachEmbed, detach: dettachEmbed });
        //     return () => {
        //         registeredEditors.delete(editorId);
        //     };
        // }, []);

        // Editor
        let editor = React.useRef<QuillType.Quill>();
        let containerRef = React.useRef<HTMLDivElement>(null);
        let tooltipRef = React.useRef<HTMLDivElement>(null);
        const [popupLocation, setPopupLocation] = React.useState<{ x: number, y: number } | null>(null);

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
                formats: props.appearance === 'article' ? ['mention', 'emoji', 'bold', 'italic', 'custom'] : ['mention', 'emoji'],
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

                // Handle popup style
                if (props.appearance === 'article') {
                    let range = q.getSelection();
                    if (range === null || range.length === 0) {
                        setPopupLocation(null);
                        return;
                    }
                    let rangeBounds = q.getBounds(range.index, range.length);
                    setPopupLocation({
                        y: rangeBounds.top,
                        x: rangeBounds.left + rangeBounds.width / 2
                    });
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
            <>
                <div
                    className={cx(
                        quillStyle,
                        'scroll-container',
                        props.className && props.className,
                        props.withShortcutsButton && quillWithButtonStyle,
                        props.appearance === 'article' && quillArticleStyle,
                        props.appearance === 'input' && quillInputStyle,
                        props.appearance === 'article-title' && quillArticleTitleStyle,
                    )}
                >
                    <div ref={containerRef} />
                    {props.withShortcutsButton && <ShortcutButton />}
                    {!props.hideEmoji && (
                        <EmojiPicker
                            onEmojiPicked={onEmojiPicked}
                            onStickerSent={props.onStickerSent}
                            onShow={props.onEmojiPickerShow}
                            onHide={props.onEmojiPickerHide}
                        />
                    )}
                    <div
                        ref={tooltipRef}
                        style={popupLocation ? {
                            position: 'absolute',
                            top: popupLocation.y - 44 - 10,
                            left: popupLocation.x - 100 / 2,
                            pointerEvents: 'all'
                        } : { display: 'none' }}
                    >
                        <XView
                            width={100}
                            height={44}
                            backgroundColor="#292927"
                            borderRadius={16}
                            flexDirection="row"
                            overflow="hidden"
                        >
                            <XView
                                width={44}
                                height={44}
                                backgroundColor="red"
                                onClick={(e) => {
                                    let range = editor.current!.getSelection(true);
                                    if (range && range.length > 0) {
                                        let formats = editor.current!.getFormat(range);
                                        if (formats.bold) {
                                            editor.current!.format('bold', false);
                                        } else {
                                            editor.current!.format('bold', true);
                                        }
                                    }
                                }}
                            >
                                B
                            </XView>
                            <XView
                                width={44}
                                height={44}
                                backgroundColor="yellow"
                                onClick={(e) => {
                                    // let selection = editor.current!.getSelection(true);
                                    // editor.current!.insertEmbed(selection.index, 'custom', {
                                    //     editorId,
                                    //     type: 'image',
                                    //     data: {}
                                    // }, 'user');
                                    // let range = editor.current!.getSelection(true);
                                    // if (range && range.length > 0) {
                                    //     let formats = editor.current!.getFormat(range);
                                    //     if (formats.italic) {
                                    //         editor.current!.format('italic', false);
                                    //     } else {
                                    //         editor.current!.format('italic', true);
                                    //     }
                                    // }
                                }}
                            >
                                I
                            </XView>
                        </XView>
                    </div>
                </div>
                {/* {embeds.map((v) => (<React.Fragment key={v.key} >{v.component}</React.Fragment>))} */}
            </>
        );
    }),
);
