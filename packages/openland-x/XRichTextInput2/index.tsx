import * as React from 'react';
import { Editor } from 'draft-js';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XFlexStyles } from '../basics/Flex';
import { MentionSuggestionsContainer } from './components/MentionSuggestionsContainer';
import { useMentionSuggestions } from './useMentionSuggestions';
import { useInputMethods, XRichTextInput2RefMethods } from './useInputMethods';
import { useHandleEditorChange } from './useHandleEditorChange';
import { useKeyHandling } from './useKeyHandling';
import { usePasteFiles } from './usePasteFiles';
import { useHandlePastedText } from './useHandlePastedText';
import { MentionEntry, MentionDataT } from './components/MentionEntry';

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

        const {
            handleDown,
            handleUp,
            filteredSuggestions,
            selectedMentionEntryIndex,
        } = useMentionSuggestions({
            mentionsData,
            activeWord,
        });

        const applyMentionById = (id: number) => {
            const mentionEntry = filteredSuggestions[id];
            if (mentionEntry) {
                addMention(mentionEntry);
                setActiveWord('');
            }
        };

        const { keyBinding, onHandleKey } = useKeyHandling({
            onSubmit,
            filteredSuggestions,
            applyMentionById,
            selectedMentionEntryIndex,
        });

        return (
            <MentionSuggestionsContainer
                {...props}
                activeWord={activeWord}
                onEmojiPicked={onEmojiPicked}
                showSuggestions={filteredSuggestions.length !== 0}
                suggestions={filteredSuggestions.map((mention, key) => {
                    return (
                        <MentionEntry
                            {...mention}
                            key={key}
                            isSelected={key === selectedMentionEntryIndex}
                            onClick={() => {
                                applyMentionById(key);
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
                    onDownArrow={handleDown}
                    onUpArrow={handleUp}
                    stripPastedStyles={true}
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </MentionSuggestionsContainer>
        );
    },
);
