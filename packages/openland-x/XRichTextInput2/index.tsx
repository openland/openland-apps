import * as React from 'react';
import { Editor } from 'draft-js';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XFlexStyles } from '../basics/Flex';
import { MentionSuggestionsContainer } from './MentionSuggestionsContainer';
import { useMentionSuggestions } from './useMentionSuggestions';
import { useInputMethods, XRichTextInput2RefMethods } from './useInputMethods';
import { useHandleEditorChange } from './useHandleEditorChange';
import { useKeyHandling } from './useKeyHandling';
import { usePasteFiles } from './usePasteFiles';
import { MentionEntry, MentionDataT } from './MentionEntry';

export interface XRichTextInput2Props extends XFlexStyles {
    onChange?: (value: string) => void;
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
            applyMention,
            onEmojiPicked,
        } = useHandleEditorChange({
            onChange,
            value,
        });

        const { resetAndFocus } = useInputMethods({
            ref,
            editorRef,
            editorState,
            setEditorState,
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
                applyMention(mentionEntry);
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
