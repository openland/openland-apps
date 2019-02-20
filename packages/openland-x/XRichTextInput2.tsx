import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Editor,
    EditorState,
    Modifier,
    SelectionState,
    ContentState,
    CompositeDecorator,
    ContentBlock,
    getDefaultKeyBinding,
    DraftHandleValue,
} from 'draft-js';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { extractFlexProps, XFlexStyles, applyFlex } from './basics/Flex';
import { css } from 'linaria';
import Glamorous from 'glamorous';
import { emoji } from 'openland-y-utils/emoji';

function findActiveWordStart(state: EditorState): number {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (selection.getStartKey() !== selection.getEndKey()) {
        return -1;
    }
    let text = content.getBlockForKey(selection.getStartKey()).getText();

    let startIndex = selection.getStartOffset() - 1;
    while (startIndex >= 0) {
        if (text.charAt(startIndex) !== ' ') {
            startIndex--;
        } else {
            break;
        }
    }
    return startIndex + 1;
}

function findActiveWord(state: EditorState): string | undefined {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (!selection.getHasFocus()) {
        return undefined;
    }
    let text = content.getBlockForKey(selection.getStartKey()).getText();
    let startIndex = findActiveWordStart(state);
    let res = text.substring(startIndex, selection.getEndOffset());
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}

export type MentionDataT = {
    id: string;
    name: string;
    title: string;
    avatar: string;
    isYou?: boolean;
    online?: boolean;
};

export interface XRichTextInput2Props extends XFlexStyles {
    onChange?: (value: string) => void;
    value: string;
    onSubmit?: () => void;
    placeholder?: string;
    autofocus?: boolean;
    mentionsData?: MentionDataT[];
    onPasteFile?: (file: any) => void;
    onCurrentWordChanged?: (word: string | undefined) => void;
}

function findLinkMention(contentBlock: ContentBlock, callback: any, contentState: ContentState) {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
}

const Container = Glamorous.div<XFlexStyles>([
    {
        position: 'relative',
        '& .public-DraftEditorPlaceholder-root:not(.public-DraftEditorPlaceholder-hasFocus)': {
            color: 'rgba(0, 0, 0, 0.5)',
        },
    },
    applyFlex,
]);

class ContainerWrapper extends React.PureComponent {
    render() {
        return <Container {...this.props} />;
    }
}
function keyBinding(e: React.KeyboardEvent<any>): string | null {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
}

export const MentionEntry = ({ avatar, name, id, online, title }: MentionDataT) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const onMouseLeave = () => setIsFocused(false);
    const onMouseEnter = () => setIsFocused(true);

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <XView
                position="relative"
                width="100%"
                flexDirection="row"
                flexGrow={1}
                flexShrink={1}
                paddingTop={6}
                paddingBottom={6}
                paddingRight={15}
                paddingLeft={15}
                minWidth={0}
                backgroundColor={isFocused ? '#f9f9f9' : '#ffffff'}
                hoverBackgroundColor={'#f9f9f9'}
            >
                <XAvatar
                    size={'m-small'}
                    style={'user'}
                    src={avatar}
                    objectName={name}
                    objectId={id}
                    online={online}
                />

                <XView
                    flexDirection="column"
                    alignSelf="center"
                    marginLeft={12}
                    fontSize={13}
                    fontWeight={'600'}
                    lineHeight={1.54}
                    color={'#000000'}
                >
                    {emoji({
                        src: name,
                        size: 15,
                    })}
                </XView>

                <XView
                    flexDirection="column"
                    alignSelf={'center'}
                    marginLeft={7}
                    opacity={0.4}
                    fontSize={12}
                    fontWeight={'600'}
                    lineHeight={1.5}
                    color={'#000000'}
                >
                    {title}
                </XView>

                <XView flexGrow={1} />

                <XView
                    flexDirection="column"
                    alignSelf={'center'}
                    opacity={0.4}
                    fontSize={12}
                    fontWeight={'400'}
                    lineHeight={1.5}
                    color={isFocused ? '#000000' : 'transparent'}
                >
                    <div style={{ position: 'relative' }}>
                        <span style={{ top: 2, position: 'absolute', left: -16 }}>↵</span>{' '}
                        <span>to select</span>
                    </div>
                </XView>
            </XView>
        </div>
    );
};

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
};

const getRelativeParent: (element: HTMLElement) => HTMLElement | null = (element: HTMLElement) => {
    if (!element) {
        return null;
    }

    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement!!);
};

const positionSuggestions = (args: any) => {
    let { state, filteredEmojis, popover, decoratorRect } = args;
    const relativeParent = getRelativeParent(popover.parentElement);

    let scrollLeft: any;
    let scrollTop: any;
    let relativeTop: any;
    let relativeLeft: any;

    if (relativeParent) {
        scrollLeft = relativeParent.scrollLeft;
        scrollTop = relativeParent.scrollTop;

        const relativeParentRect = relativeParent.getBoundingClientRect();
        relativeLeft = decoratorRect.left - relativeParentRect.left;
        relativeTop = decoratorRect.top - relativeParentRect.top + relativeParentRect.height;
        console.warn(relativeParentRect);
    } else {
        scrollTop =
            window.pageYOffset ||
            (document.documentElement ? document.documentElement.scrollTop : undefined);
        scrollLeft =
            window.pageXOffset ||
            (document.documentElement ? document.documentElement.scrollLeft : undefined);

        relativeTop = decoratorRect.top;
        relativeLeft = decoratorRect.left;
    }

    const left = relativeLeft + scrollLeft;
    const top = relativeTop - scrollTop!! + 8;

    let transform;
    let transition;
    if (state.isActive) {
        if (filteredEmojis.size > 0) {
            transform = 'scale(1)';
            transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
        } else {
            transform = 'scale(0)';
            transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
        }
    }

    return {
        left: `${left}px`,
        bottom: `${top}px`,
        transform,
        transformOrigin: '1em 0%',
        transition,
    };
};

const mentionSuggestionsWrapperClassName = css`
    position: absolute;
    border: 1px solid #eee;
    border-radius: 10px;
    background: #fff;
    box-shadow: none;
    z-index: 100;
    bottom: 50px;
    left: 0;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const XRichTextInput2 = React.forwardRef<XRichTextInput2RefMethods, XRichTextInput2Props>(
    (props: XRichTextInput2Props, ref) => {
        if (!canUseDOM) {
            return null;
        }

        const editorRef = React.useRef<Editor>(null);
        const containerRef = React.useRef<ContainerWrapper>(null);

        const [plainText, setPlainText] = React.useState('');
        const [suggestions, setSuggestions] = React.useState<MentionDataT[] | undefined>(
            props.mentionsData || [],
        );

        const [widthOfContainer, setWidthOfContainer] = React.useState(0);

        const getEditorStateFromText = (text: string) => {
            return EditorState.moveFocusToEnd(
                EditorState.createWithContent(
                    ContentState.createFromText(text),
                    new CompositeDecorator([
                        {
                            strategy: findLinkMention,
                            component: (p: any) => (
                                <span style={{ backgroundColor: '#f00' }}>{p.children}</span>
                            ),
                        },
                    ]),
                ),
            );
        };
        const [editorState, setEditorState] = React.useState(getEditorStateFromText(props.value));

        const onHandleKey = (command: string) => {
            if (command === 'x-editor-submit') {
                if (props.onSubmit) {
                    props.onSubmit();
                    return 'handled';
                }
            }
            return 'not-handled';
        };
        const focus = () => {
            window.requestAnimationFrame(() => {
                if (editorRef && editorRef.current) {
                    editorRef.current.focus();
                }
            });
        };

        const resetAndFocus = () => {
            window.requestAnimationFrame(() => {
                setEditorState(
                    EditorState.push(editorState, ContentState.createFromText(''), 'remove-range'),
                );

                focus();
            });
        };

        // hack to fix useImperativeHandle typings
        const useImperativeHandle = (React as any)
            .useImperativeHandle as typeof React.useImperativeMethods;

        useImperativeHandle<XRichTextInput2RefMethods, any>(ref, () => ({
            focus,
            resetAndFocus: () => {
                window.requestAnimationFrame(() => {
                    setEditorState(
                        EditorState.push(
                            editorState,
                            ContentState.createFromText(''),
                            'remove-range',
                        ),
                    );

                    focus();
                });
            },
            getHasFocus: () => {
                return editorState.getSelection().getHasFocus();
            },
        }));

        const onPasteFiles = (files: Blob[]): DraftHandleValue => {
            let file = files[0];
            if (!file) {
                return 'handled';
            }

            if (props.onPasteFile) {
                props.onPasteFile(file);
            }

            resetAndFocus();
            return 'handled';
        };

        const handleEditorChange = (newEditorState: EditorState) => {
            const activeWord = findActiveWord(newEditorState);

            if (props.onCurrentWordChanged) {
                props.onCurrentWordChanged(activeWord);
            }
            const newPlainText = editorState.getCurrentContent().getPlainText();

            setEditorState(newEditorState);
            setPlainText(newPlainText);
        };

        React.useLayoutEffect(() => {
            if (props.onChange) {
                props.onChange(plainText);
            }
        }, [plainText]);

        React.useLayoutEffect(() => {
            if (props.value !== plainText) {
                setEditorState(getEditorStateFromText(props.value));
                setPlainText(props.value);
            }
        }, [props.value]);

        React.useLayoutEffect(() => {
            setSuggestions(props.mentionsData);
        }, [props.mentionsData]);

        React.useLayoutEffect(() => {
            const containerEl =
                containerRef &&
                containerRef.current &&
                (ReactDOM.findDOMNode(containerRef.current) as Element);
            const newWidthOfContainer = containerEl ? containerEl.getBoundingClientRect().width : 0;

            if (widthOfContainer !== newWidthOfContainer) {
                setWidthOfContainer(newWidthOfContainer);
            }
        }, []);

        return (
            <ContainerWrapper {...extractFlexProps(props)} ref={containerRef}>
                <div
                    className={mentionSuggestionsWrapperClassName}
                    style={{
                        width: widthOfContainer,
                    }}
                >
                    {suggestions &&
                        suggestions.length &&
                        suggestions.map((mention, key) => {
                            return <MentionEntry {...mention} key={key} />;
                        })}
                </div>
                <Editor
                    ref={editorRef}
                    placeholder={props.placeholder}
                    keyBindingFn={keyBinding}
                    handleKeyCommand={onHandleKey}
                    handlePastedFiles={onPasteFiles}
                    stripPastedStyles={true}
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </ContainerWrapper>
        );
    },
);
