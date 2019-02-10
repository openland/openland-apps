import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import {
    Editor,
    EditorState,
    Modifier,
    SelectionState,
    ContentState,
    CompositeDecorator,
    ContentBlock,
} from 'draft-js';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const findActiveWordStart = (state: EditorState): number => {
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
};

const findActiveWord = (state: EditorState): string | undefined => {
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
};

const findLinkMention = (contentBlock: ContentBlock, callback: any, contentState: ContentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
};

type XRichTextInput2Props = {
    onCurrentWordChanged?: (word: string | undefined) => void;
};

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

                if (
                    selection.getEndOffset() === text.length ||
                    text.charAt(selection.getEndOffset()) !== ' '
                ) {
                    replace = Modifier.insertText(replace, replace.getSelectionAfter(), ' ');
                }

                let s3 = EditorState.push(s.editorState, replace, 'insert-mention' as any);
                return { editorState: s3 };
            },
            () => this.ref.current!.focus(),
        );
    };

    private handleEditorChange = (value: EditorState) => {
        if (this.props.onCurrentWordChanged) {
            this.props.onCurrentWordChanged(findActiveWord(value));
        }
        this.setState({ editorState: value });
    };

    render() {
        if (!canUseDOM) {
            return null;
        }

        return (
            <Editor
                ref={this.ref}
                stripPastedStyles={true}
                editorState={this.state.editorState}
                onChange={this.handleEditorChange}
            />
        );
    }
}

// Things to check:
// 1) focus test
// 2) backspace all - write test
// 3) test mobile well

// TODO:
// 0) refactor MessageComposeComponentMobile and MessageComposeComponent to minimize them,
//    maybe merge with master
// 1) wrap up and finalize UI with mentions list (use simple input stub)
// 2) mentions support
// 3) emojies support
// 4) support paste files
// 5) emoji picker
//

export default withApp('UI Framework - Rich Input', 'viewer', () => {
    let [currentWord, setCurrentWord] = React.useState<string | undefined>(undefined);
    let ref = React.useRef<XRichTextInput2>(null);
    return (
        <DevDocsScaffold title="Rich Input">
            <XContent>
                {/* <XVertical>
                    <XTitle>Simple</XTitle>
                    <XView height={24}>{currentWord}</XView>
                    <XButton
                        text="set mention"
                        onClick={() => {
                            ref.current!.applyMention({ id: 'someid', name: 'Fabulous developer' });
                        }}
                    />
                    <XView backgroundColor="rgba(0,0,0,0.1)">
                        <XRichTextInput2 ref={ref} onCurrentWordChanged={setCurrentWord} />
                    </XView>
                </XVertical> */}
            </XContent>
        </DevDocsScaffold>
    );
});
