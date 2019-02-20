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
import Glamorous from 'glamorous';

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

export const MentionEntry = ({
    mention,
    isFocused,
}: {
    mention: MentionDataT;
    isFocused: boolean;
}) => {
    return (
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
                src={mention.avatar}
                objectName={mention.name}
                objectId={mention.id}
                online={mention.online}
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
                {mention.name}
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
                {mention.title}
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
    );
};

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
};

const MentionSuggestionsWrapper = Glamorous.div(({ width }: any) => ({
    '& ': {
        '&.draftJsMentionPlugin__mentionSuggestions__2DWjA': {
            position: 'absolute',
            borderTop: '1px solid #eee',
            background: '#fff',
            boxShadow: 'none',
            width,
            maxWidth: width,
            zIndex: 100,
            bottom: 50,
            left: 0,
            borderRadius: '10px',
            cursor: 'pointer',
        },
    },
}));

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
                <MentionSuggestionsWrapper width={widthOfContainer}>
                    {suggestions && suggestions.length && (
                        <MentionEntry mention={suggestions[0]} isFocused={true} />
                    )}
                </MentionSuggestionsWrapper>
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
