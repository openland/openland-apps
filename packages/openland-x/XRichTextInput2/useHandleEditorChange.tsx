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

        const rawContent = {
            blocks: [
                {
                    text:
                        'This is an "immutable" entity: Superman. Deleting any ' +
                        'characters will delete the entire entity. Adding characters ' +
                        'will remove the entity from the range.',
                    type: 'unstyled',
                    entityRanges: [{ offset: 31, length: 8, key: 'first' }],
                },
                {
                    text: '',
                    type: 'unstyled',
                },
                {
                    text:
                        'This is a "mutable" entity: Batman. Characters may be added ' +
                        'and removed.',
                    type: 'unstyled',
                    entityRanges: [{ offset: 28, length: 6, key: 'second' }],
                },
                {
                    text: '',
                    type: 'unstyled',
                },
                {
                    text:
                        'This is a "segmented" entity: Green Lantern. Deleting any ' +
                        'characters will delete the current "segment" from the range. ' +
                        'Adding characters will remove the entire entity from the range.',
                    type: 'unstyled',
                    entityRanges: [{ offset: 30, length: 13, key: 'third' }],
                },
            ],

            entityMap: {
                first: {
                    type: 'TOKEN',
                    mutability: 'IMMUTABLE',
                },
                second: {
                    type: 'TOKEN',
                    mutability: 'MUTABLE',
                },
                third: {
                    type: 'TOKEN',
                    mutability: 'SEGMENTED',
                },
            },
        };

        // const state = ContentState.createFromBlockArray(['😎🧚‍♀️👩‍❤️‍💋‍👩'], {});

        return EditorState.moveFocusToEnd(EditorState.createWithContent(rawContent, decorator));
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
