import * as React from 'react';
import { Editor } from 'draft-js';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XFlexStyles } from '../basics/Flex';
import { EditorContainer } from './components/EditorContainer';
import { useMentionSuggestions } from './modules/mentions/MentionSuggestions/useMentionSuggestions';
import {
    useEmojiSuggestions,
    EmojiDataT,
} from './modules/emoji/EmojiSuggestions/useEmojiSuggestions';
import { useInputMethods, XRichTextInput2RefMethods } from './hooks/useInputMethods';
import { useHandleEditorChange } from './hooks/useHandleEditorChange/useHandleEditorChange';
import { useDraftKeyHandling } from './hooks/useDraftKeyHandling';
import { usePasteFiles } from './hooks/usePasteFiles';
import { useHandlePastedText } from './hooks/useHandlePastedText';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UserShort } from 'openland-api/Types';
export interface XRichTextInput2Props extends XFlexStyles {
    onChange?: (a: { text: string; mentions?: UserWithOffset[] }) => void;
    value: string;
    onSubmit?: () => void;
    placeholder?: string;
    autofocus?: boolean;
    initialMentions?: UserWithOffset[];
    getMentionsSuggestions: () => Promise<UserWithOffset[]>;
    onPasteFile?: (file: any) => void;
    onCurrentWordChanged?: (word: string | undefined) => void;
    minimal?: boolean;
    round?: boolean;
    hideAttach?: boolean;
}

export const XRichTextInput2 = React.memo(
    React.forwardRef<XRichTextInput2RefMethods, XRichTextInput2Props>(
        (props: XRichTextInput2Props, ref) => {
            if (!canUseDOM) {
                return null;
            }

            const {
                onSubmit,
                onChange,
                value,
                getMentionsSuggestions,
                initialMentions,
                placeholder,
            } = props;

            const editorRef = React.useRef<Editor>(null);

            const {
                editorState,
                setEditorState,
                updateEditorStateFromTextAndMentions,
                activeWord,
                setActiveWord,
                handleEditorChange,
                addMention,
                addEmoji,
                onEmojiPicked,
                getMentions,
                updateEditorState,
            } = useHandleEditorChange({
                onChange,
                value,
                initialMentions,
            });

            const { handlePastedText } = useHandlePastedText({ editorState, updateEditorState });

            const { focus } = useInputMethods({
                updateEditorStateFromTextAndMentions,
                ref,
                editorRef,
                editorState,
                setEditorState,
                getMentions,
            });

            const { onPasteFiles } = usePasteFiles({
                onPasteFile: props.onPasteFile,
                focus,
            });

            const emojiState = useEmojiSuggestions({
                activeWord,
            });

            const mentionState = useMentionSuggestions({
                getMentionsSuggestions,
                activeWord,
            });

            const applyCurrentSuggestedMention = () => {
                const mentionEntry = mentionState.suggestions[mentionState.selectedEntryIndex];
                if (mentionEntry) {
                    addMention(mentionEntry);
                    setActiveWord('');
                }
            };

            const applyEmoji = (emojiData: EmojiDataT) => {
                addEmoji(emojiData);
                setActiveWord('');
            };

            const applyCurrentSuggestedEmoji = () => {
                const emojiData = emojiState.suggestions[emojiState.selectedEntryIndex];
                if (emojiData) {
                    applyEmoji(emojiData);
                }
            };

            const { keyBinding, onHandleKey } = useDraftKeyHandling({
                updateEditorStateFromTextAndMentions,
                onSubmit,
                mentionState,
                emojiState,
                applyCurrentSuggestedMention,
                applyCurrentSuggestedEmoji,
            });

            return (
                <EditorContainer
                    {...props}
                    onSubmit={onSubmit}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    emojiState={emojiState}
                    onEmojiPicked={onEmojiPicked}
                    finalAddEmoji={applyEmoji}
                    mentionState={mentionState}
                    onMentionPicked={(mentionEntry: UserShort) => {
                        if (mentionEntry) {
                            addMention(mentionEntry);
                            setActiveWord('');
                        }
                    }}
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
                            mentionState.handleUp(event);
                            emojiState.handleUp(event);
                        }}
                        stripPastedStyles={true}
                        editorState={editorState}
                        onChange={handleEditorChange}
                    />
                </EditorContainer>
            );
        },
    ),
);
