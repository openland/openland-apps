import * as React from 'react';
import { Editor } from 'draft-js';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XFlexStyles } from '../basics/Flex';
import { EditorContainer } from './components/EditorContainer';
import { useMentionSuggestions } from './modules/mentions/MentionSuggestions/useMentionSuggestions';
import { UserForMention } from 'openland-api/Types';
import { useEmojiSuggestions } from './modules/emoji/EmojiSuggestions/useEmojiSuggestions';
import { useInputMethods, XRichTextInput2RefMethods } from './hooks/useInputMethods';
import { useHandleEditorChange } from './hooks/useHandleEditorChange/useHandleEditorChange';
import { useDraftKeyHandling } from './hooks/useDraftKeyHandling';
import { usePasteFiles } from './hooks/usePasteFiles';
import { useHandlePastedText } from './hooks/useHandlePastedText';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';
import { XShortcuts } from 'openland-x/XShortcuts';
export interface XRichTextInput2Props extends XFlexStyles {
    onChange?: (a: { text: string; mentions?: UserWithOffset[] }) => void;
    value: string;
    onSubmit?: () => Promise<void>;
    placeholder?: string;
    autofocus?: boolean;
    initialMentions?: UserWithOffset[];
    showAllMentionsSuggestion: boolean;
    getMentionsSuggestions: () => Promise<UserForMention[]>;
    onPasteFile?: (file: any) => void;
    onCurrentWordChanged?: (word: string | undefined) => void;
    minimal?: boolean;
    round?: boolean;
    hideAttachments?: boolean;
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
                showAllMentionsSuggestion,
            } = props;

            const editorRef = React.useRef<Editor>(null);

            const {
                plainText,
                editorState,
                setEditorState,
                updateEditorStateFromTextAndMentions,
                activeWord,
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
                showAllMentionsSuggestion,
                getMentionsSuggestions,
                activeWord,
            });

            const { keyBinding, onHandleKey } = useDraftKeyHandling({
                updateEditorStateFromTextAndMentions,
                onSubmit,
                mentionState,
                emojiState,
                addMention,
                addEmoji,
            });

            return (
                <XShortcuts
                    supressOtherShortcuts
                    handlerMap={{
                        ESC: () => {
                            emojiState.setClosed(true);
                            mentionState.setClosed(true);
                        },
                    }}
                    keymap={{
                        ESC: 'esc',
                    }}
                >
                    <EditorContainer
                        {...props}
                        showAllMentionsSuggestion={showAllMentionsSuggestion}
                        plainText={plainText}
                        onSubmit={onSubmit}
                        editorState={editorState}
                        setEditorState={setEditorState}
                        emojiState={emojiState}
                        mentionState={mentionState}
                        finalAddEmoji={addEmoji}
                        onMentionPicked={addMention}
                        onEmojiPicked={onEmojiPicked}
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
                </XShortcuts>
            );
        },
    ),
);
