import * as React from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { EmojiData } from 'emoji-mart';
import { addEmoji } from './modifiers/addEmoji';
import { addMention, findActiveWord } from './modifiers/addMention';
import { MentionDataT } from './components/MentionSuggestionsEntry';
import { decorator } from './decorator';

type useHandleEditorChangeT = {
    onChange?: (a: { text: string; mentions: MentionDataT[] }) => void;
    value: string;
};

export function useHandleEditorChange({ onChange, value }: useHandleEditorChangeT) {
    const [plainText, setPlainText] = React.useState('');
    const [activeWord, setActiveWord] = React.useState<string>('');

    const getEditorStateFromText = (text: string) => {
        return EditorState.moveFocusToEnd(
            EditorState.createWithContent(ContentState.createFromText(text), decorator),
        );
    };

    const [editorState, setEditorState] = React.useState(getEditorStateFromText(value));

    const updateEditorState = (newEditorState: EditorState) => {
        const newPlainText = newEditorState.getCurrentContent().getPlainText();

        setEditorState(newEditorState);
        setPlainText(newPlainText);
    };

    const handleEditorChange = (newEditorState: EditorState) => {
        if (newEditorState.getSelection().getHasFocus()) {
            const newActiveWord = findActiveWord(newEditorState);

            if (activeWord !== newActiveWord) {
                setActiveWord(newActiveWord || '');
            }
        }

        updateEditorState(newEditorState);
    };

    const onEmojiPicked = (emojiPicked: EmojiData) => {
        updateEditorState(
            addEmoji({
                editorState,
                emojiShortName: emojiPicked.colons,
            }),
        );
    };

    const finalAddMention = (mention: MentionDataT) => {
        const newEditorState = addMention({
            editorState,
            mention,
        });
        if (newEditorState) {
            updateEditorState(newEditorState);
        }
    };

    const finalAddEmoji = (emojiShortName: string) => {
        const newEditorState = addEmoji({
            editorState,
            emojiShortName,
        });
        if (newEditorState) {
            updateEditorState(newEditorState);
        }
    };

    const getMentions = () => {
        const entityMap = convertToRaw(editorState.getCurrentContent()).entityMap;
        const result = Object.keys(entityMap)
            .map(key => entityMap[key])
            .filter(({ type }) => type === 'MENTION')
            .map(({ data }) => data);

        return (result as any) as MentionDataT[];
    };

    React.useLayoutEffect(() => {
        if (value !== plainText) {
            if (onChange) {
                onChange({
                    text: plainText,
                    mentions: getMentions(),
                });
            }
        }
    }, [plainText]);

    return {
        activeWord,
        setActiveWord,
        addMention: finalAddMention,
        addEmoji: finalAddEmoji,
        handleEditorChange,
        editorState,
        setEditorState,
        onEmojiPicked,
        getMentions,
    };
}
