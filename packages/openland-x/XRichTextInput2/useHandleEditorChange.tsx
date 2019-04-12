import * as React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { EmojiData } from 'emoji-mart';
import { addEmoji } from './modifiers/addEmoji';
import { getSearchText } from './utils/getSearchText';
import { addMention, findActiveWord } from './modifiers/addMention';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { getEmojiAndMentionBlocksAndEntityMap } from './dataConversion';
import { decorator } from './decorator';
import { UserShort } from 'openland-api/Types';

type useHandleEditorChangeT = {
    onChange?: (a: { text: string; mentions: UserWithOffset[] }) => void;
    value: string;
    mentionsData?: UserWithOffset[];
};

export const getEditorStateFromText = ({
    text,
    mentions,
}: {
    text: string;
    mentions: UserWithOffset[];
}) => {
    return EditorState.moveFocusToEnd(
        EditorState.createWithContent(
            convertFromRaw(getEmojiAndMentionBlocksAndEntityMap(text, mentions) as any),
            decorator,
        ),
    );
};

export function useHandleEditorChange({ onChange, value, mentionsData }: useHandleEditorChangeT) {
    const [plainText, setPlainText] = React.useState('');
    const [activeWord, setActiveWord] = React.useState<string>('');
    const [editorState, setEditorState] = React.useState(() =>
        getEditorStateFromText({ text: value, mentions: mentionsData || [] }),
    );

    const updateEditorState = (newEditorState: EditorState) => {
        const newPlainText = newEditorState.getCurrentContent().getPlainText();

        setEditorState(newEditorState);
        setPlainText(newPlainText);
    };

    const updateEditorStateFromTextAndMentions = ({
        text,
        mentions,
    }: {
        text: string;
        mentions: UserWithOffset[];
    }) => {
        updateEditorState(
            getEditorStateFromText({
                text,
                mentions,
            }),
        );
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

    const finalAddMention = (mention: UserShort) => {
        console.log(mention);
        const newEditorState = addMention({
            editorState,
            mention: {
                user: mention,
                offset: 0,
                length: 0,
            },
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

        return (result as any) as UserWithOffset[];
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
        updateEditorState,
        updateEditorStateFromTextAndMentions,
        editorState,
        setEditorState,
        onEmojiPicked,
        getMentions,
    };
}
