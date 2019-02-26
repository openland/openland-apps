import * as React from 'react';
import { Editor, getDefaultKeyBinding, DraftHandleValue } from 'draft-js';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XFlexStyles } from '../basics/Flex';
import { MentionSuggestionsContainer } from './MentionSuggestionsContainer';
import { emoji } from 'openland-y-utils/emoji';
import { useMentionSuggestions } from './useMentionSuggestions';
import { useInputMethods } from './useInputMethods';
import { useHandleEditorChange } from './useHandleEditorChange';

export type MentionDataT = {
    id: string;
    name: string;
    title: string;
    avatar: string;
    isYou?: boolean;
    online?: boolean;
};

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

function keyBinding(e: React.KeyboardEvent<any>): string | null {
    console.log(e);
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
}

export const MentionEntry = ({
    avatar,
    name,
    id,
    online,
    title,
    isSelected,
}: MentionDataT & { isSelected: boolean }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setIsFocused(isSelected);
    }, [isSelected]);

    const onMouseLeave = () => setIsFocused(false);
    const onMouseEnter = () => setIsFocused(true);

    const emojifiedName = React.useMemo(() => {
        return emoji({
            src: name,
            size: 15,
        });
    }, [name]);

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <XView
                position="relative"
                width="100%"
                flexDirection="row"
                flexGrow={1}
                flexShrink={1}
                paddingTop={6}
                paddingBottom={6}
                paddingRight={15}
                paddingLeft={15}
                minWidth={0}
                backgroundColor={isFocused ? '#f9f9f9' : '#ffffff'}
                hoverBackgroundColor={'#f9f9f9'}
            >
                <XAvatar
                    size={'m-small'}
                    style={'user'}
                    src={avatar}
                    objectName={name}
                    objectId={id}
                    online={online}
                />

                <XView
                    flexDirection="column"
                    alignSelf="center"
                    marginLeft={12}
                    fontSize={13}
                    fontWeight={'600'}
                    lineHeight={1.54}
                    color={'#000000'}
                >
                    {emojifiedName}
                </XView>

                <XView
                    flexDirection="column"
                    alignSelf={'center'}
                    marginLeft={7}
                    opacity={0.4}
                    fontSize={12}
                    fontWeight={'600'}
                    lineHeight={1.5}
                    color={'#000000'}
                >
                    {title}
                </XView>

                <XView flexGrow={1} />

                <XView
                    flexDirection="column"
                    alignSelf={'center'}
                    opacity={0.4}
                    fontSize={12}
                    fontWeight={'400'}
                    lineHeight={1.5}
                    color={isFocused ? '#000000' : 'transparent'}
                >
                    <div style={{ position: 'relative' }}>
                        <span style={{ top: 2, position: 'absolute', left: -16 }}>↵</span>{' '}
                        <span>to select</span>
                    </div>
                </XView>
            </XView>
        </div>
    );
};

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
};

const getRelativeParent: (element: HTMLElement) => HTMLElement | null = (element: HTMLElement) => {
    if (!element) {
        return null;
    }

    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement!!);
};

export const XRichTextInput2 = React.forwardRef<XRichTextInput2RefMethods, XRichTextInput2Props>(
    (props: XRichTextInput2Props, ref) => {
        if (!canUseDOM) {
            return null;
        }

        const editorRef = React.useRef<Editor>(null);

        const onHandleKey = (command: string) => {
            if (command === 'x-editor-submit') {
                if (props.onSubmit) {
                    props.onSubmit();
                    return 'handled';
                }
            }
            return 'not-handled';
        };

        const {
            editorState,
            setEditorState,
            activeWord,
            handleEditorChange,
        } = useHandleEditorChange({
            onChange: props.onChange,
            value: props.value,
        });

        const { resetAndFocus } = useInputMethods({
            ref,
            editorRef,
            editorState,
            setEditorState,
        });

        const onPasteFiles = (files: Blob[]): DraftHandleValue => {
            let file = files[0];
            if (!file) {
                return 'handled';
            }

            if (props.onPasteFile) {
                props.onPasteFile(file);
            }

            resetAndFocus();
            return 'handled';
        };

        const {
            handleDown,
            handleUp,
            filteredSuggestions,
            selectedMentionEntry,
        } = useMentionSuggestions({
            mentionsData: props.mentionsData,
            activeWord,
        });

        return (
            <MentionSuggestionsContainer
                {...props}
                showSuggestions={filteredSuggestions.length !== 0}
                suggestions={filteredSuggestions.map((mention, key) => {
                    return (
                        <MentionEntry
                            {...mention}
                            key={key}
                            isSelected={key === selectedMentionEntry}
                        />
                    );
                })}
            >
                <Editor
                    ref={editorRef}
                    placeholder={props.placeholder}
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
