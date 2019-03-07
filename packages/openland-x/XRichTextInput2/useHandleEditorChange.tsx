import * as React from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { EmojiData } from 'emoji-mart';
import { addEmoji } from './modifiers/addEmoji';
import { getSearchText } from './utils/getSearchText';
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
        const mentionString = '@Sergey Lapin @dev lapin 🎉';
        const emojiString = '😎🧚‍♀️👩‍❤️‍💋‍👩';

        text = emojiString;

        const mentionRawContent = {
            blocks: [
                {
                    text: '@Sergey Lapin @dev lapin 🎉',
                    type: 'unstyled',
                    entityRanges: [
                        { offset: 0, length: '@Sergey Lapin'.length, key: 'first' },
                        {
                            offset: '@Sergey Lapin'.length + 1,
                            length: '@dev lapin 🎉'.length,
                            key: 'second',
                        },
                    ],
                },
            ],

            entityMap: {
                first: {
                    type: 'MENTION',
                },
                second: {
                    type: 'MENTION',
                },
            },
        };

        const emojiRawContent = {
            blocks: [
                {
                    text: '😎🧚‍👩‍❤️‍💋‍👩',
                    type: 'unstyled',
                    entityRanges: [
                        { offset: 0, length: 1, key: 'first' },
                        { offset: 1, length: 1, key: 'second' },
                        { offset: 3, length: 8, key: 'third' },
                    ],
                },
            ],

            entityMap: {
                first: {
                    type: 'emoji',
                },
                second: {
                    type: 'emoji',
                },
                third: {
                    type: 'emoji',
                },
            },
        };

        return EditorState.moveFocusToEnd(
            EditorState.createWithContent(convertFromRaw(emojiRawContent as any), decorator),
        );
    };

    const [editorState, setEditorState] = React.useState(getEditorStateFromText(value));

    const updateEditorState = (newEditorState: EditorState) => {
        const newPlainText = newEditorState.getCurrentContent().getPlainText();

        setEditorState(newEditorState);
        setPlainText(newPlainText);
    };

    const updateEditorStateFromText = (text: string) => {
        updateEditorState(getEditorStateFromText(text));
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
                unified: (emojiPicked as any).unified,
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

    const finalAddEmoji = ({ shortName, unified }: { shortName: string; unified: string }) => {
        const { begin, end, word } = getSearchText(editorState, editorState.getSelection());

        const newEditorState = addEmoji({
            editorState,
            emojiShortName: shortName,
            unified,
            mode: {
                type: 'REPLACE',
                begin: begin + word.indexOf(':'),
                end,
            },
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
        updateEditorStateFromText,
        editorState,
        setEditorState,
        onEmojiPicked,
        getMentions,
    };
}
