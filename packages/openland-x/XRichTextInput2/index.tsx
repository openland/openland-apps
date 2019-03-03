import * as React from 'react';
import { Editor } from 'draft-js';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XFlexStyles } from '../basics/Flex';
import { EditorContainer } from './components/EditorContainer';
import { useMentionSuggestions } from './useMentionSuggestions';
import { useEmojiSuggestions } from './useEmojiSuggestions';
import { useInputMethods, XRichTextInput2RefMethods } from './useInputMethods';
import { useHandleEditorChange } from './useHandleEditorChange';
import { useDraftKeyHandling } from './useDraftKeyHandling';
import { usePasteFiles } from './usePasteFiles';
import { useHandlePastedText } from './useHandlePastedText';
import { MentionEntry, MentionDataT } from './components/MentionSuggestionsEntry';

export interface XRichTextInput2Props extends XFlexStyles {
    onChange?: (a: { text: string; mentions: MentionDataT[] }) => void;
    value: string;
    onSubmit?: () => void;
    placeholder?: string;
    autofocus?: boolean;
    mentionsData?: MentionDataT[];
    onPasteFile?: (file: any) => void;
    onCurrentWordChanged?: (word: string | undefined) => void;
}

export const XRichTextInput2 = React.forwardRef<XRichTextInput2RefMethods, XRichTextInput2Props>(
    (props: XRichTextInput2Props, ref) => {
        if (!canUseDOM) {
            return null;
        }

        const { onSubmit, onChange, value, mentionsData, placeholder } = props;

        const editorRef = React.useRef<Editor>(null);

        const {
            editorState,
            setEditorState,
            activeWord,
            setActiveWord,
            handleEditorChange,
            addMention,
            addEmoji,
            onEmojiPicked,
            getMentions,
        } = useHandleEditorChange({
            onChange,
            value,
        });

        const { handlePastedText } = useHandlePastedText({ setEditorState });

        const { resetAndFocus } = useInputMethods({
            ref,
            editorRef,
            editorState,
            setEditorState,
            getMentions,
        });

        const { onPasteFiles } = usePasteFiles({
            onPasteFile: props.onPasteFile,
            resetAndFocus,
        });

        const emojiState = useEmojiSuggestions({
            activeWord,
        });

        const mentionState = useMentionSuggestions({
            mentionsData,
            activeWord,
        });

        const applyMentionByIndex = (index: number) => {
            const mentionEntry = mentionState.suggestions[index];
            if (mentionEntry) {
                addMention(mentionEntry);
                setActiveWord('');
            }
        };

        const applyCurrentSuggestedMention = () =>
            applyMentionByIndex(mentionState.selectedEntryIndex);

        const applyCurrentSuggestedEmoji = () => {
            const emojiShortName = emojiState.suggestions[emojiState.selectedEntryIndex];
            if (emojiShortName) {
                addEmoji(emojiShortName);
                setActiveWord('');
            }
        };

        const { keyBinding, onHandleKey } = useDraftKeyHandling({
            onSubmit,
            mentionSuggestions: mentionState.suggestions,
            applyCurrentSuggestedMention: applyCurrentSuggestedMention,
            emojiSuggestions: emojiState.suggestions,
            applyCurrentSuggestedEmoji,
        });

        return (
            <EditorContainer
                {...props}
                editorState={editorState}
                setEditorState={setEditorState}
                activeWord={activeWord}
                onEmojiPicked={onEmojiPicked}
                showMentionSuggestions={mentionState.suggestions.length !== 0}
                mentionSuggestions={mentionState.suggestions.map((mention, key) => {
                    return (
                        <MentionEntry
                            {...mention}
                            key={key}
                            isSelected={key === mentionState.selectedEntryIndex}
                            onClick={() => {
                                applyMentionByIndex(key);
                            }}
                        />
                    );
                })}
            >
                <Editor
                    ref={editorRef}
                    placeholder={placeholder}
                    keyBindingFn={keyBinding}
                    handleKeyCommand={onHandleKey}
                    handlePastedFiles={onPasteFiles}
                    handlePastedText={handlePastedText as any}
                    onDownArrow={(event: any) => {
                        mentionState.handleDown(event);
                        emojiState.handleDown(event);
                    }}
                    onUpArrow={(event: any) => {
                        mentionState.handleDown(event);
                        emojiState.handleDown(event);
                    }}
                    stripPastedStyles={true}
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </EditorContainer>
        );
    },
);
