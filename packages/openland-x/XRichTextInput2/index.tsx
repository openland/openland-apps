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
import { extractFlexProps, XFlexStyles, applyFlex } from '../basics/Flex';
import { css, cx } from 'linaria';
import Glamorous from 'glamorous';
import { emoji } from 'openland-y-utils/emoji';
import { useMentionSuggestions } from './useMentionSuggestions';

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
    console.log(e);
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
}

export const MentionEntry = ({
    avatar,
    name,
    id,
    online,
    title,
    isSelected,
}: MentionDataT & { isSelected: boolean }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setIsFocused(isSelected);
    }, [isSelected]);

    const onMouseLeave = () => setIsFocused(false);
    const onMouseEnter = () => setIsFocused(true);

    const emojifiedName = React.useMemo(() => {
        return emoji({
            src: name,
            size: 15,
        });
    }, [name]);

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
                    {emojifiedName}
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

const mentionSuggestionsWrapperShow = css`
    transform: scale(1);
`;

const mentionSuggestionsWrapperHide = css`
    transform: scale(0);
`;

const mentionSuggestionsWrapperClassName = css`
    left: 0px;
    bottom: 0px;
    transform-origin: 1em 0%;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
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
        const [activeWord, setActiveWord] = React.useState<string>('');

        const [sizeOfContainer, setSizeOfContainer] = React.useState<{
            width: number;
            height: number;
        }>({ width: 0, height: 0 });

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
            console.log(command);
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
            const newActiveWord = findActiveWord(newEditorState);

            // if (props.onCurrentWordChanged) {
            //     props.onCurrentWordChanged(activeWord);
            // }
            if (activeWord !== newActiveWord) {
                setActiveWord(newActiveWord || '');
            }

            const newPlainText = editorState.getCurrentContent().getPlainText();

            setEditorState(newEditorState);
            setPlainText(newPlainText);
        };

        const {
            handleDown,
            handleUp,
            filteredSuggestions,
            selectedMentionEntry,
        } = useMentionSuggestions({
            mentionsData: props.mentionsData,
            activeWord,
        });

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
            const containerEl =
                containerRef &&
                containerRef.current &&
                (ReactDOM.findDOMNode(containerRef.current) as Element);

            const newWidthOfContainer = containerEl ? containerEl.getBoundingClientRect().width : 0;
            const newHeightOfContainer = containerEl
                ? containerEl.getBoundingClientRect().height
                : 0;

            if (
                sizeOfContainer.width !== newWidthOfContainer ||
                sizeOfContainer.height !== newHeightOfContainer
            ) {
                setSizeOfContainer({
                    width: newWidthOfContainer,
                    height: newHeightOfContainer,
                });
            }
        }, []);

        return (
            <ContainerWrapper {...extractFlexProps(props)} ref={containerRef}>
                <div
                    className={cx(
                        mentionSuggestionsWrapperClassName,
                        filteredSuggestions.length !== 0
                            ? mentionSuggestionsWrapperShow
                            : mentionSuggestionsWrapperHide,
                    )}
                    style={{
                        width: sizeOfContainer.width,
                        left: filteredSuggestions.length !== 0 ? 0 : sizeOfContainer.width / 2,
                        bottom: filteredSuggestions.length !== 0 ? 50 : sizeOfContainer.height / 2,
                    }}
                >
                    {filteredSuggestions.map((mention, key) => {
                        return (
                            <MentionEntry
                                {...mention}
                                key={key}
                                isSelected={key === selectedMentionEntry}
                            />
                        );
                    })}
                </div>

                <Editor
                    ref={editorRef}
                    placeholder={props.placeholder}
                    keyBindingFn={keyBinding}
                    handleKeyCommand={onHandleKey}
                    handlePastedFiles={onPasteFiles}
                    onDownArrow={handleDown}
                    onUpArrow={handleUp}
                    stripPastedStyles={true}
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </ContainerWrapper>
        );
    },
);
