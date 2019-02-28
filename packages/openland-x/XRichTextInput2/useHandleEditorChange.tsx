import * as React from 'react';
const decorateComponentWithProps = require('decorate-component-with-props').default;
import { EditorState, ContentState, CompositeDecorator, ContentBlock } from 'draft-js';
import { EmojiData } from 'emoji-mart';
import emojiStrategy from './utils/emojiStrategy';
import { MentionComponentInnerText } from './components/MentionComponentInnerText';
import { Emoji } from './components/Emoji';
import { addEmoji } from './modifiers/addEmoji';
import { addMention, findActiveWord } from './modifiers/addMention';
import { MentionDataT } from './components/MentionEntry';

function findLinkMention(contentBlock: ContentBlock, callback: any, contentState: ContentState) {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
}

type useHandleEditorChangeT = { onChange?: (value: string) => void; value: string };

const decorator = new CompositeDecorator([
    {
        strategy: findLinkMention,
        component: MentionComponentInnerText,
    },
    {
        strategy: emojiStrategy,
        component: decorateComponentWithProps(Emoji, {
            imagePath: 'https://cdn.openland.com/shared/web/emoji/4.0/png/64/',
            imageType: 'png',
            cacheBustParam: '',
        }),
    },
]);

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

    React.useLayoutEffect(() => {
        if (value !== plainText) {
            if (onChange) {
                onChange(plainText);
            }
        }
    }, [plainText]);

    return {
        activeWord,
        setActiveWord,
        addMention: finalAddMention,
        handleEditorChange,
        editorState,
        setEditorState,
        onEmojiPicked,
    };
}
