import * as React from 'react';
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

export class XRichTextInput2 extends React.PureComponent<
    XRichTextInput2Props,
    { editorState: EditorState }
> {
    private ref = React.createRef<Editor>();

    constructor(props: XRichTextInput2Props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(
                ContentState.createFromText(''),
                new CompositeDecorator([
                    {
                        strategy: findLinkMention,
                        component: (p: any) => (
                            <span style={{ backgroundColor: '#f00' }}>{p.children}</span>
                        ),
                    },
                ]),
            ),
        };
    }

    focus = () => {
        window.requestAnimationFrame(() => {
            this.setState({
                editorState: EditorState.moveFocusToEnd(this.state.editorState),
            });

            if (this.ref.current) {
                this.ref.current.focus();
            }
        });
    };

    onHandleKey: (command: string) => DraftHandleValue = (command: string) => {
        if (command === 'x-editor-submit') {
            if (this.props.onSubmit) {
                this.props.onSubmit();
                return 'handled';
            }
        }
        return 'not-handled';
    };

    onPasteFiles = (files: Blob[]): DraftHandleValue => {
        let file = files[0];
        if (!file) {
            return 'handled';
        }

        if (this.props.onPasteFile) {
            this.props.onPasteFile(file);
        }

        this.resetAndFocus();
        return 'handled';
    };

    resetAndFocus = () => {
        window.requestAnimationFrame(() => {
            this.setState(
                src => ({
                    editorState: EditorState.push(
                        src.editorState,
                        ContentState.createFromText(''),
                        'remove-range',
                    ),
                }),
                () => {
                    this.focus();
                },
            );
        });
    };

    applyMention = (src: { name: string; id: string }) => {
        this.setState(
            s => {
                let selection = s.editorState.getSelection();
                let start = findActiveWordStart(s.editorState);
                if (start < 0) {
                    return s;
                }
                let content = s.editorState.getCurrentContent();
                let text = content.getBlockForKey(selection.getStartKey()).getText();

                let s2 = SelectionState.createEmpty(selection.getStartKey()).merge({
                    anchorOffset: start,
                    focusOffset: selection.getEndOffset(),
                }) as any;

                let entity = content.createEntity('MENTION', 'IMMUTABLE', { uid: src.id });

                let replace = Modifier.replaceText(
                    entity,
                    s2,
                    src.name,
                    undefined,
                    entity.getLastCreatedEntityKey(),
                );

                // let stext = src.name;
                if (
                    selection.getEndOffset() === text.length ||
                    text.charAt(selection.getEndOffset()) !== ' '
                ) {
                    // stext = src.name + ' ';
                    replace = Modifier.insertText(replace, replace.getSelectionAfter(), ' ');
                }

                let s3 = EditorState.push(s.editorState, replace, 'insert-mention' as any);
                return { editorState: s3 };
            },
            () => this.ref.current!.focus(),
        );
    };

    private handleEditorChange = (editorState: EditorState) => {
        if (this.props.onCurrentWordChanged) {
            this.props.onCurrentWordChanged(findActiveWord(editorState));
        }
        const plainText = editorState.getCurrentContent().getPlainText();
        this.setState(
            {
                editorState,
            },
            () => {
                if (this.props.onChange) {
                    this.props.onChange(plainText);
                }
            },
        );
    };

    render() {
        if (!canUseDOM) {
            return null;
        }

        return (
            <ContainerWrapper {...extractFlexProps(this.props)}>
                <Editor
                    ref={this.ref}
                    placeholder={this.props.placeholder}
                    keyBindingFn={keyBinding}
                    handleKeyCommand={this.onHandleKey}
                    handlePastedFiles={this.onPasteFiles}
                    stripPastedStyles={true}
                    editorState={this.state.editorState}
                    onChange={this.handleEditorChange}
                />
            </ContainerWrapper>
        );
    }
}
