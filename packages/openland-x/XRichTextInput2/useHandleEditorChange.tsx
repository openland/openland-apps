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
                    {
                        strategy: emojiStrategy,
                        component: decorateComponentWithProps(Emoji, {
                            imagePath: 'https://cdn.openland.com/shared/web/emoji/4.0/png/64/',
                            imageType: 'png',
                            cacheBustParam: '',
                        }),
                    },
                ]),
            ),
        );
    };

    const [editorState, setEditorState] = React.useState(getEditorStateFromText(value));

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
        setEditorState(
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
            setEditorState(newEditorState);
        }
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
        addMention: finalAddMention,
        handleEditorChange,
        editorState,
        setEditorState,
        onEmojiPicked,
    };
}
