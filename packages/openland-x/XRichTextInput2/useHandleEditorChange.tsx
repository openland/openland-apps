import * as React from 'react';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import {
    EditorState,
    SelectionState,
    ContentState,
    CompositeDecorator,
    ContentBlock,
    Modifier,
} from 'draft-js';
import { EmojiData } from 'emoji-mart';

export function findActiveWordStart(state: EditorState): number {
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

function findLinkMention(contentBlock: ContentBlock, callback: any, contentState: ContentState) {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
}

type useHandleEditorChangeT = { onChange?: (value: string) => void; value: string };

const mentionComponentInnerTextClassName = css`
    background: #e6f3ff;
    color: #1790ff;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 5px;
`;

export const MentionComponentInnerText = ({ children }: { children: any }) => {
    // hack to get text
    const text = children[0].props.text;
    console.log(children[0].props.text);
    return (
        <span className={mentionComponentInnerTextClassName}>
            {emoji({
                src: text,
                size: 16,
                cache: false,
            })}
        </span>
    );
};

export function useHandleEditorChange({ onChange, value }: useHandleEditorChangeT) {
    const [plainText, setPlainText] = React.useState('');
    const [activeWord, setActiveWord] = React.useState<string>('');

    const getEditorStateFromText = (text: string) => {
        return EditorState.moveFocusToEnd(
            EditorState.createWithContent(
                ContentState.createFromText(text),
                new CompositeDecorator([
                    {
                        strategy: findLinkMention,
                        component: MentionComponentInnerText,
                    },
                ]),
            ),
        );
    };

    const [editorState, setEditorState] = React.useState(getEditorStateFromText(value));

    const applyMention = ({ id, name }: { name: string; id: string }) => {
        let selection = editorState.getSelection();
        let start = findActiveWordStart(editorState);
        if (start < 0) {
            return;
        }
        let content = editorState.getCurrentContent();
        let text = content.getBlockForKey(selection.getStartKey()).getText();

        let s2 = SelectionState.createEmpty(selection.getStartKey()).merge({
            anchorOffset: start,
            focusOffset: selection.getEndOffset(),
        }) as any;

        let entity = content.createEntity('MENTION', 'IMMUTABLE', { uid: id });

        let replace = Modifier.replaceText(
            entity,
            s2,
            `@${name}`,
            undefined,
            entity.getLastCreatedEntityKey(),
        );

        if (
            selection.getEndOffset() === text.length ||
            text.charAt(selection.getEndOffset()) !== ' '
        ) {
            replace = Modifier.insertText(replace, replace.getSelectionAfter(), ' ');
        }

        let s3 = EditorState.moveFocusToEnd(
            EditorState.push(editorState, replace, 'insert-mention' as any),
        );

        setEditorState(s3);
    };

    const handleEditorChange = (newEditorState: EditorState) => {
        if (newEditorState.getSelection().getHasFocus()) {
            const newActiveWord = findActiveWord(newEditorState);

            if (activeWord !== newActiveWord) {
                setActiveWord(newActiveWord || '');
            }
        }

        const newPlainText = editorState.getCurrentContent().getPlainText();

        setEditorState(newEditorState);
        setPlainText(newPlainText);
    };

    const onEmojiPicked = (emojiPicked: EmojiData) => {
        // let content = editorState.getCurrentContent();
        // let selection = editorState.getSelection();
        // let entity = content.createEntity('EMOJI', 'IMMUTABLE', { id: emojiPicked.id });
        // let start = findActiveWordStart(editorState);
        // if (start < 0) {
        //     return;
        // }
        // let s2 = SelectionState.createEmpty(selection.getStartKey()).merge({
        //     anchorOffset: start,
        //     focusOffset: selection.getEndOffset(),
        // }) as any;
        // if (emojiPicked.colons) {
        //     console.log(
        //         emoji({
        //             src: emojiPicked.colons,
        //             size: 14,
        //         }),
        //     );
        // }
        // let replace = Modifier.replaceText(
        //     entity,
        //     s2,
        //     `${emojiPicked.colons}`,
        //     undefined,
        //     entity.getLastCreatedEntityKey(),
        // );
        // let s3 = EditorState.moveFocusToEnd(
        //     EditorState.push(editorState, replace, 'insert-emoji' as any),
        // );
        // setEditorState(s3);
    };

    React.useLayoutEffect(() => {
        if (onChange) {
            onChange(plainText);
        }
    }, [plainText]);

    React.useLayoutEffect(() => {
        if (value !== plainText) {
            setEditorState(getEditorStateFromText(value));
            setPlainText(value);
        }
    }, [value]);

    return {
        activeWord,
        setActiveWord,
        applyMention,
        handleEditorChange,
        editorState,
        setEditorState,
        onEmojiPicked,
    };
}
