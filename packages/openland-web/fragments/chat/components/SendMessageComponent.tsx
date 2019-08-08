import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import {
    URickInput,
    URickInputInstance,
    URickTextValue
} from 'openland-web/components/unicorn/URickInput';
import AttachIcon from 'openland-icons/s/ic-attach-24.svg';
import SendIcon from 'openland-icons/s/ic-send-24.svg';
import { UNavigableListRef } from 'openland-web/components/unicorn/UNavigableReactWindow';
import { useClient } from 'openland-web/utils/useClient';
import { RoomMembers_members_user } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { searchMentions } from 'openland-engines/mentions/searchMentions';
import { emojiSuggest } from 'openland-y-utils/emojiSuggest';
import { emojiComponent } from 'openland-y-utils/emojiComponent';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UNavigableReactWindow } from 'openland-web/components/unicorn/UNavigableReactWindow';
import { emojiWordMap } from 'openland-y-utils/emojiWordMap';
import { fileListToArray } from './DropZone';

interface MentionUserComponentProps {
    id: string;
    name: string;
    photo: string | null;
    primaryOrganization: {
        name: string;
    } | null;
}

const mentionUserContainer = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
`;

const mentionEmojiContainer = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 28px;
    padding-left: 16px;
    padding-right: 16px;
    transform: translateY(-0.1em);
`;

const mentionUserDataWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 12px;
`;

const userName = css`
    font-size: 13px;
    font-weight: 600;
    line-height: 1.54;
    color: #171b1f;
`;

const userOrg = css`
    margin-left: 7px;
    padding-top: 4px;
    font-size: 12px;
    line-height: 1.5;
    color: #676d7a;
`;

const MentionUserComponent = (props: MentionUserComponentProps) => (
    <div className={mentionUserContainer}>
        <XAvatar2 id={props.id} title={props.name} src={props.photo} size={28} />
        <div className={mentionUserDataWrap}>
            <div className={userName}>{props.name}</div>
            {props.primaryOrganization && (
                <div className={userOrg}>{props.primaryOrganization.name}</div>
            )}
        </div>
    </div>
);

const EmojiSuggestionComponent = (props: { name: string; value: string; display: string }) => (
    <div className={mentionEmojiContainer}>
        <XView fontSize={18} width={28} height={28} marginRight={6} alignItems="center" justifyContent="center" >
            {emojiComponent(props.name)}
        </XView>
        <div className={userName}>{props.display}</div>
    </div>
);

const mentionsContainer = css`
    position: absolute;
    bottom: calc(100% + 16px);
    left: 0px;
    right: 0px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    background-color: white;
    border-radius: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    opacity: 0;
    transform: translateY(10px);
    will-change: opacity;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    /* overflow-y: scroll; */
    overflow-x: none;
    z-index: 2;
`;

interface AutoCompleteComponentRef {
    onPressUp(): boolean;
    onPressDown(): boolean;
    onPressEnter(): boolean;
    isActive(): boolean;
}

const AutoCompleteComponent = React.memo(
    React.forwardRef(
        (
            props: {
                groupId?: string;
                activeWord: string | null;
                onSelected: (user: RoomMembers_members_user) => void;
                onEmojiSelected: (emoji: { name: string; value: string }) => void;
            },
            ref: React.Ref<AutoCompleteComponentRef>,
        ) => {
            const listRef = React.useRef<UNavigableListRef>(null);
            const fallbackRender = React.useRef<any>(<div className={mentionsContainer} />);
            const containerRef = React.useRef<HTMLDivElement>(null);

            const forceClose = React.useRef<boolean>(false);
            // Store word in state for nice disappear animation
            const [word, setWord] = React.useState(props.activeWord);
            if (word !== props.activeWord && !forceClose.current) {
                setWord(props.activeWord);
            }
            forceClose.current = false;

            const lastActiveWord = React.useRef(props.activeWord);
            const isActive = React.useRef<boolean>(false);
            isActive.current = false;
            lastActiveWord.current = props.activeWord;

            React.useImperativeHandle(ref, () => ({
                onPressDown: () => {
                    if (!lastActiveWord.current) {
                        return false;
                    }
                    let r = listRef.current;
                    if (r && isActive.current) {
                        r.onPressDown();
                        return true;
                    }
                    return false;
                },
                onPressUp: () => {
                    if (!lastActiveWord.current) {
                        return false;
                    }
                    let r = listRef.current;
                    if (r && isActive.current) {
                        r.onPressUp();
                        return true;
                    }
                    return false;
                },
                onPressEnter: () => {
                    if (!lastActiveWord.current) {
                        return false;
                    }
                    let r = listRef.current;
                    if (r && isActive.current) {
                        return r.onPressEnter();
                    }
                    return false;
                },
                onPressTab: () => {
                    let r = listRef.current;
                    if (r && isActive.current) {
                        return r.onPressEnter();
                    }
                    return false;
                },
                isActive: () => {
                    return isActive.current;
                }
            }));
            useShortcuts([{
                keys: ['Escape'], callback: () => {
                    if (isActive.current) {
                        forceClose.current = true;
                        setWord(null);
                        return true;
                    }
                    return false;
                }
            }]);

            const itemRender = React.useCallback(
                (v: RoomMembers_members_user) => (
                    <MentionUserComponent
                        name={v.name}
                        id={v.id}
                        photo={v.photo}
                        primaryOrganization={v.primaryOrganization}
                    />
                ),
                [],
            );

            const emojiItemRender = React.useCallback(
                (v: any) => (
                    <EmojiSuggestionComponent name={v.name} value={v.value} display={v.shortcode} />
                ),
                [],
            );

            let matched: RoomMembers_members_user[] | undefined = [];
            if (props.groupId) {
                const client = useClient();
                let members = client.useWithoutLoaderRoomMembers({ roomId: props.groupId });

                if (members && members.members && word && !word.startsWith(':')) {
                    // Mentions
                    if (word) {
                        matched = searchMentions(word, members.members).map(u => u.user);
                    } else {
                        matched = [];
                    }

                }
            }
            let filtered: { name: string, value: string, shortcode: string }[] = [];
            if (word) {
                filtered.push(...emojiSuggest(word));
            }

            isActive.current = !!filtered.length || !!matched.length;

            let onSelected = React.useCallback((user: RoomMembers_members_user) => {
                if (isActive.current) {
                    props.onSelected(user);
                }
            }, []);

            let onEmojiSelected = React.useCallback((emoji: { name: string; value: string }) => {
                if (isActive.current) {
                    props.onEmojiSelected(emoji);
                }
            }, []);

            React.useEffect(() => {
                if (containerRef.current) {
                    let show = (matched && matched.length) || (filtered && filtered.length);
                    containerRef.current.style.opacity = show ? '1' : '0';
                    containerRef.current.style.transform = `translateY(${show ? 0 : 10}px)`;
                    containerRef.current.style.pointerEvents = show ? 'auto' : 'none';
                }
                if (listRef.current) {
                    listRef.current.reset();
                }
            }, [matched, filtered]);

            if (matched.length) {
                fallbackRender.current = (
                    <div
                        ref={containerRef}
                        className={mentionsContainer}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <UNavigableReactWindow
                            width={'100%'}
                            height={Math.min(matched.length * 40, 250)}
                            data={matched}
                            itemSize={40}
                            renderItem={itemRender}
                            onSelected={onSelected}
                            ref={listRef}
                        />
                    </div>
                );
            } else if (filtered.length) {
                fallbackRender.current = (
                    <div
                        ref={containerRef}
                        className={mentionsContainer}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {/* <UButton text={'filtered-' + filtered.length} onClick={() => props.onEmojiSelected({ name: '1f923', value: '🤣' })} /> */}
                        <UNavigableReactWindow
                            width={'100%'}
                            focusedByDefault={!!(word && word.startsWith(':'))}
                            height={Math.min(filtered.length * 28, 250)}
                            data={filtered}
                            itemSize={28}
                            renderItem={emojiItemRender}
                            onSelected={onEmojiSelected}
                            ref={listRef}
                        />
                    </div>
                );
            }

            return fallbackRender.current;
        },
    ),
);

interface SendMessageComponentProps {
    groupId?: string;
    onTextSent?: (text: URickTextValue) => void;
    onContentChange?: (text: URickTextValue) => void;
    onTextChange?: (text: string) => void;
    placeholder?: string;
    initialText?: URickTextValue;
    rickRef?: React.RefObject<URickInputInstance>;
    onPressUp?: () => boolean;
    onAttach?: (files: File[]) => void;
}

const sendMessageContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    align-self: stretch;
`;

const actionButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
        background-color: #f2f3f5;
    }
`;

export const SendMessageComponent = React.memo((props: SendMessageComponentProps) => {
    const ref = props.rickRef || React.useRef<URickInputInstance>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const suggestRef = React.useRef<AutoCompleteComponentRef>(null);
    const onPressEnter = React.useCallback(
        () => {
            let s = suggestRef.current;
            if (s) {
                if (s.onPressEnter()) {
                    return true;
                }
            }
            let ed = ref.current;
            if (ed) {
                let text = ed.getText();
                if (props.onTextSent) {
                    if (text.length > 0) {
                        props.onTextSent(text);
                    }
                }
                ed.clear();
                ed.focus();
            }
            return true;
        },
        [props.onTextSent],
    );

    const onPressUp = React.useCallback(() => {
        let s = suggestRef.current;
        if (s && s.isActive()) {
            s.onPressUp();
            return true;
        } else if (props.onPressUp) {
            return props.onPressUp();
        }
        return false;
    }, []);

    const onPressDown = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressDown();
        }
        return false;
    }, []);

    const onPressTab = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressEnter();
        }
        return false;
    }, []);

    const onAttachPress = React.useCallback(() => {
        //
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const onFileInputChange = React.useCallback((e) => {
        if (props.onAttach) {
            props.onAttach(fileListToArray(e.target.files));
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const [activeWord, setActiveWord] = React.useState<string | null>(null);
    const onAutocompleteWordChange = React.useCallback((word: string) => {
        setActiveWord(word);
    }, []);
    const onUserPicked = React.useCallback((user: RoomMembers_members_user) => {
        ref.current!.commitSuggestion('mention', user);
    }, []);
    const onEmojiPicked = React.useCallback((emoji: { name: string; value: string }) => {
        ref.current!.commitSuggestion('emoji', emoji);
    }, []);

    return (
        <div className={sendMessageContainer}>
            <AutoCompleteComponent
                onSelected={onUserPicked}
                onEmojiSelected={onEmojiPicked}
                groupId={props.groupId}
                activeWord={activeWord}
                ref={suggestRef}
            />
            <input ref={fileInputRef} type="file" multiple={true} style={{ display: 'none' }} onChange={onFileInputChange} />
            <div className={actionButtonContainer} onClick={onAttachPress}>
                <UIcon icon={<AttachIcon />} color={'#676d7a'} />
            </div>
            <XView
                flexGrow={1}
                flexShrink={1}
                marginHorizontal={16}
                maxHeight={250}
                flexDirection="column"
            >
                <URickInput
                    ref={ref}
                    initialContent={props.initialText}
                    autocompletePrefixes={['@', ':', ...Object.keys(emojiWordMap)]}
                    onAutocompleteWordChange={onAutocompleteWordChange}
                    onPressEnter={onPressEnter}
                    onPressUp={onPressUp}
                    onPressDown={onPressDown}
                    onPressTab={onPressTab}
                    onTextChange={props.onTextChange}
                    onContentChange={props.onContentChange}
                    autofocus={true}
                    placeholder={props.placeholder || 'Write a message...'}
                    onFilesPaste={props.onAttach}
                />
            </XView>
            <div className={actionButtonContainer} onClick={onPressEnter}>
                <UIcon icon={<SendIcon />} color={'#676d7a'} />
            </div>
        </div>
    );
});
