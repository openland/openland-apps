import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import {
    URickInput,
    URickInputInstance,
    URickTextValue,
    AllMention
} from 'openland-web/components/unicorn/URickInput';
import AttachIcon from 'openland-icons/s/ic-attach-24.svg';
import AllIcon from 'openland-icons/s/ic-channel-16.svg';
import SendIcon from 'openland-icons/s/ic-send-24.svg';
import { UNavigableListRef } from 'openland-web/components/unicorn/UNavigableReactWindow';
import { useClient } from 'openland-web/utils/useClient';
import { StickerFragment, RoomMembers_members_user } from 'openland-api/Types';
import { SearchUser } from 'openland-engines/mentions/searchMentions';
import { emojiSuggest } from 'openland-y-utils/emojiSuggest';
import { emojiComponent } from 'openland-y-utils/emojiComponent';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UNavigableReactWindow } from 'openland-web/components/unicorn/UNavigableReactWindow';
import { emojiWordMap } from 'openland-y-utils/emojiWordMap';
import { TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';
import { fileListToArray } from './DropZone';
import { XLoader } from 'openland-x/XLoader';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { onEmojiSent } from 'openland-web/components/unicorn/emoji/Recent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { detectOS } from 'openland-x-utils/detectOS';

interface MentionUserComponentProps {
    id: string;
    name: string;
    photo: string | null;
    primaryOrganization: {
        name: string;
    } | null;
}

const mentionContainer = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    justify-content: start;
`;

const mentionUserDataWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`;

const userName = css`
    color: var(--foregroundPrimary);
`;

const userOrg = css`
    margin-left: 8px;
    margin-top: 2px;
    color: var(--foregroundTertiary);
`;

const allMentionIcon = css`
    flex-grow: 0;
    width: 28px;
    height: 28px;
    margin-right: 12px;
`;

export const MentionUserComponent = (props: MentionUserComponentProps) => (
    <div className={mentionContainer}>
        <UAvatar id={props.id} title={props.name} photo={props.photo} size="x-small" />
        <div className={mentionUserDataWrap}>
            <div className={cx(userName, TextLabel1)}>{props.name}</div>
            {props.primaryOrganization && (
                <div className={cx(userOrg, TextDensed)}>{props.primaryOrganization.name}</div>
            )}
        </div>
    </div>
);

const EmojiSuggestionComponent = (props: { name: string; value: string; display: string }) => (
    <div className={mentionContainer}>
        <XView fontSize={24} width={24} height={28} alignItems="center" justifyContent="center" >
            {emojiComponent(props.name)}
        </XView>
        <div className={mentionUserDataWrap}>
            <div className={cx(userName, TextLabel1)}>{props.display}</div>
        </div>
    </div>
);

const mentionsContainer = css`
    position: absolute;
    bottom: calc(100% + 16px);
    left: 56px;
    right: 56px;
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

interface Cursor {
    __typename: 'cursor';
    after: string;
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
            const client = useClient();
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

            const [users, setUsers] = React.useState<(SearchUser | AllMention | Cursor)[]>([]);
            const lastQuery = React.useRef<string>();

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
                (v: SearchUser | AllMention | Cursor) => {
                    if (v.__typename === 'cursor') {
                        (async () => {
                            let lastq = lastQuery.current;
                            let members = await client.queryChatMembersSearch({ cid: props.groupId!, query: lastQuery.current, first: 20, after: v.after });
                            if (lastq !== lastQuery.current) {
                                return;
                            }
                            let res: (SearchUser | AllMention | Cursor)[] = members.members.edges.map(e => e.user);
                            if (members && members.members.pageInfo.hasNextPage) {
                                res.push({ __typename: 'cursor', after: members.members.edges[members.members.edges.length - 1].cursor });
                            }
                            setUsers([...users.filter(u => u.__typename !== 'cursor'), ...res]);
                        })();
                    }
                    return v.__typename === 'cursor' ? (
                        <XView height={40} flexGrow={1} justifyContent="center" alignItems="center">
                            <XLoader transparentBackground={true} size="small" />
                        </XView>
                    ) :
                        v.__typename === 'AllMention' ? (
                            <div className={mentionContainer}>
                                <UIcon className={allMentionIcon} icon={<AllIcon />} />
                                <span className={userName}>@All<span style={{ opacity: 0.4, marginLeft: 7 }}>Notify everyone in this group</span></span>
                            </div>
                        ) : (
                                <MentionUserComponent
                                    name={v.name}
                                    id={v.id}
                                    photo={v.photo}
                                    primaryOrganization={v.primaryOrganization}
                                />
                            );
                },
                [users],
            );

            const emojiItemRender = React.useCallback(
                (v: any) => (
                    <EmojiSuggestionComponent name={v.name} value={v.value} display={v.shortcode} />
                ),
                [],
            );

            let matched: (SearchUser | AllMention | Cursor)[] | undefined = [];
            if (props.groupId) {
                let query = word && word.startsWith("@") ? word.substring(1) : undefined;
                let members = client.useWithoutLoaderChatMembersSearch({ cid: props.groupId, first: 20, query });

                if (members && query !== lastQuery.current) {
                    lastQuery.current = query;
                    let res: (SearchUser | AllMention | Cursor)[] = members ? members.members.edges.map(e => e.user) : [];
                    if (members && members.members.pageInfo.hasNextPage) {
                        res.push({ __typename: 'cursor', after: members.members.edges[members.members.edges.length - 1].cursor });
                    }
                    setUsers(res);
                }
                if (users && word && word.startsWith('@')) {
                    matched = [...users];
                    if ('@all'.startsWith(word.toLowerCase())) {
                        matched.unshift({ __typename: 'AllMention' });
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
                    onEmojiSent(emoji.name);
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
                            height={Math.min(filtered.length * 40, 250)}
                            data={filtered}
                            itemSize={40}
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
    onTextSentAsync?: (text: URickTextValue) => void;
    onContentChange?: (text: URickTextValue) => void;
    onStickerSent?: (sticker: StickerFragment) => void;
    onStickerSentAsync?: (sticker: StickerFragment) => void;
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
    align-items: flex-end;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    align-self: stretch;
`;

const actionButtonContainer = css`
    flex-shrink: 0;
`;

const loaderContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    position: relative;
`;

const urickWindowsStyle = css`
    margin-right: -17px;
`;

export const SendMessageComponent = React.memo((props: SendMessageComponentProps) => {
    const isWindows = detectOS() === 'Windows';
    const ref = props.rickRef || React.useRef<URickInputInstance>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const suggestRef = React.useRef<AutoCompleteComponentRef>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const onStickerSent = React.useCallback(
        async (sticker: StickerFragment) => {
            if (props.onStickerSentAsync) {
                setLoading(true);
                await props.onStickerSentAsync(sticker);
                setLoading(false);
            } else if (props.onStickerSent) {
                props.onStickerSent(sticker);
            }
        },
        [props.onStickerSent],
    );

    const onPressEnter = React.useCallback(
        async () => {
            let s = suggestRef.current;
            if (s) {
                if (s.onPressEnter()) {
                    return true;
                }
            }
            let ed = ref.current;
            if (ed) {
                let text = ed.getText();

                if (text.length > 0) {
                    if (props.onTextSentAsync) {
                        setLoading(true);
                        await props.onTextSentAsync(text);
                        setLoading(false);
                    } else if (props.onTextSent) {
                        props.onTextSent(text);
                    }

                    ed.clear();
                    ed.focus();
                }
            }
            return true;
        },
        [props.onTextSent, props.onTextSentAsync],
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
            <Deferred>
                <AutoCompleteComponent
                    onSelected={onUserPicked}
                    onEmojiSelected={onEmojiPicked}
                    groupId={props.groupId}
                    activeWord={activeWord}
                    ref={suggestRef}
                />
            </Deferred>
            <input ref={fileInputRef} type="file" multiple={true} style={{ display: 'none' }} onChange={onFileInputChange} />
            {!!props.onAttach && (
                <div className={actionButtonContainer} >
                    <UIconButton icon={<AttachIcon />} onClick={onAttachPress} />
                </div>
            )}
            <XView
                flexGrow={1}
                flexShrink={1}
                marginRight={16}
                marginLeft={!!props.onAttach ? 16 : 0}
                maxHeight={250}
                flexDirection="column"
                overflow={isWindows ? 'hidden' : undefined}
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
                    onStickerSent={(props.onStickerSent || props.onStickerSentAsync) ? onStickerSent : undefined}
                    autofocus={true}
                    placeholder={props.placeholder || 'Write a message...'}
                    onFilesPaste={props.onAttach}
                    withShortcutsButton={true}
                    className={isWindows ? urickWindowsStyle : undefined}
                />
            </XView>
            {!loading && (
                <div className={actionButtonContainer}>
                    <UIconButton icon={<SendIcon />} onClick={onPressEnter} />
                </div>
            )}
            {loading && (
                <div className={loaderContainer}>
                    <XLoader size="small" />
                </div>
            )}
        </div>
    );
});
