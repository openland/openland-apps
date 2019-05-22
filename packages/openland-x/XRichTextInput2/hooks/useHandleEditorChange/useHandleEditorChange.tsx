import * as React from 'react';
import { EditorState, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import { EmojiData } from 'emoji-mart';
import { addEmoji } from '../../modules/emoji/addEmojiModifier';
import { addMention, findActiveWord } from '../../modules/mentions/addMentionModifier';
import { mentionDecorator } from '../../modules/mentions/decorator';
import { emojiDecorator } from '../../modules/emoji/decorator';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { getEmojiAndMentionBlocksAndEntityMap } from './dataConversion';
import { SuggestionTypeT } from '../../modules/mentions/MentionSuggestions/useMentionSuggestions';
import { prepareLegacyMentions } from 'openland-engines/legacy/legacymentions';
import { EmojiDataT } from '../../modules/emoji/EmojiSuggestions/useEmojiSuggestions';

const getWordAt = (maybeString: any, position: any) => {
    // Perform type conversions.
    const str = String(maybeString);
    // eslint-disable-next-line no-bitwise
    const pos = Number(position) >>> 0;

    // Search for the word's beginning and end.
    const left = str.slice(0, pos + 1).search(/\S+$/);
    const right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return {
            word: str.slice(left),
            begin: left,
            end: str.length,
        };
    }

    // Return the word, using the located bounds to extract it from the string.
    return {
        word: str.slice(left, right + pos),
        begin: left,
        end: right + pos,
    };
};

const getSearchText = (editorState: EditorState, selection: any) => {
    const anchorKey = selection.getAnchorKey();
    const anchorOffset = selection.getAnchorOffset() - 1;
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();

    return getWordAt(blockText, anchorOffset);
};

type useHandleEditorChangeT = {
    onChange?: (a: { text: string; mentions: UserWithOffset[] }) => void;
    value: string;
    initialMentions?: UserWithOffset[];
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
            convertFromRaw(getEmojiAndMentionBlocksAndEntityMap(
                text,
                mentions.map(({ user }) => user),
            ) as any),
            new CompositeDecorator([mentionDecorator, emojiDecorator]),
        ),
    );
};

export function useHandleEditorChange({
    onChange,
    value,
    initialMentions,
}: useHandleEditorChangeT) {
    const [plainText, setPlainText] = React.useState(value);
    const [activeWord, setActiveWord] = React.useState<string>('');
    const [editorState, setEditorState] = React.useState(() =>
        getEditorStateFromText({ text: value, mentions: initialMentions || [] }),
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

    const finalAddMention = (mention: SuggestionTypeT) => {
        if (mention) {
            const newEditorState = addMention({
                editorState,
                mention,
            });
            if (newEditorState) {
                updateEditorState(newEditorState);
            }
            setActiveWord('');
        }
    };

    const finalAddEmoji = (emojiData: EmojiDataT) => {
        if (emojiData) {
            const { begin, end, word } = getSearchText(editorState, editorState.getSelection());

            const newEditorState = addEmoji({
                editorState,
                emojiShortName: emojiData.shortName,
                unified: emojiData.unified,
                mode: {
                    type: 'REPLACE',
                    begin: begin + word.indexOf(':'),
                    end,
                },
            });
            if (newEditorState) {
                updateEditorState(newEditorState);
            }
            setActiveWord('');
        }
    };

    const getMentions = () => {
        const entityMap = convertToRaw(editorState.getCurrentContent()).entityMap;
        const result = Object.keys(entityMap)
            .map(key => entityMap[key])
            .filter(({ type }) => type === 'MENTION')
            .map(({ data }) => data);

        return (prepareLegacyMentions(plainText, result as any) as any) as UserWithOffset[];
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
        plainText,
        activeWord,
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
