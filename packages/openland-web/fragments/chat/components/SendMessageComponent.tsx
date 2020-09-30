import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import {
    URickInput,
    URickInputInstance,
    URickTextValue,
} from 'openland-web/components/unicorn/URickInput';
import AllIcon from 'openland-icons/s/ic-channel-16.svg';
import AtIcon from 'openland-icons/s/ic-at-24.svg';
import SendIcon from 'openland-icons/s/ic-send-24.svg';
import DoneIcon from 'openland-icons/s/ic-done-24.svg';
import { UNavigableListRef } from 'openland-web/components/unicorn/UNavigableReactWindow';
import { useClient } from 'openland-api/useClient';
import { StickerFragment, ChatMentionSearch_mentions_items } from 'openland-api/spacex.types';
import { emojiSuggest } from 'openland-y-utils/emojiSuggest';
import { emojiComponent } from 'openland-y-utils/emojiComponent';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UNavigableReactWindow } from 'openland-web/components/unicorn/UNavigableReactWindow';
import { emojiWordMap } from 'openland-y-utils/emojiWordMap';
import { TextLabel1, TextDensed, TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { AttachConfirmButton } from './AttachConfirm';
import { useDonationModal } from './showDonation';
import { XLoader } from 'openland-x/XLoader';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { onEmojiSent } from 'openland-web/components/unicorn/emoji/Recent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { detectOS } from 'openland-x-utils/detectOS';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { isFileImage } from 'openland-web/utils/UploadCareUploading';

interface MentionItemComponentProps {
    id: string;
    photo: string | null;
    title: string;
    subtitle?: string;
}

const mentionContainer = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    justify-content: start;
    overflow: hidden;
`;

const mentionUserDataWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`;

const userName = css`
    color: var(--foregroundPrimary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const placeholderContainer = css`
    height: 56px;
`;

const placeholderText = css`
    color: var(--foregroundSecondary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const allMention = css`
    font-weight: bold;
`;

const userOrg = css`
    margin-left: 8px;
    margin-top: 2px;
    color: var(--foregroundTertiary);
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-shrink: 0;
`;

const listItemIcon = css`
    flex-grow: 0;
    width: 20px;
    height: 20px;
    margin-right: 18px;
    margin-left: 2px;
`;

export const MentionItemComponent = (props: MentionItemComponentProps) => (
    <div className={mentionContainer}>
        <UAvatar id={props.id} title={props.title} photo={props.photo} size="x-small" />
        <div className={mentionUserDataWrap}>
            <div className={cx(userName, TextLabel1)}>{props.title}</div>
            {!!props.subtitle && (
                <div className={cx(userOrg, TextDensed)}>{props.subtitle}</div>
            )}
        </div>
    </div>
);

const EmojiSuggestionComponent = (props: { name: string; value: string; display: string }) => (
    <div className={mentionContainer}>
        <XView fontSize={24} width={24} height={28} alignItems="center" justifyContent="center">
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
    box-shadow: var(--boxShadowPopper);
    background-color: var(--backgroundSecondary);
    border-radius: 8px;
    opacity: 0;
    transform: translateY(10px);
    will-change: opacity;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),
        transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    z-index: 2;
`;

const sendMessageMentions = css`
    left: 56px;
    right: 56px;
`;

export interface AutoCompleteComponentRef {
    onPressUp(): boolean;
    onPressDown(): boolean;
    onPressEnter(): boolean;
    isActive(): boolean;
}

interface Cursor {
    __typename: 'cursor';
    after: string;
}

interface Divider { __typename: 'divider'; }

interface Placeholder { __typename: 'placeholder'; }

type ListItem = (ChatMentionSearch_mentions_items | { __typename: 'AllMention' } | Cursor | Divider | Placeholder) & { selectable?: boolean };

export const AutoCompleteComponent = React.memo(
    React.forwardRef(
        (
            props: {
                groupId?: string;
                isChannel?: boolean;
                isPrivate?: boolean;
                membersCount?: number | null;
                activeWord: string | null;
                containerClassName?: string;
                onSelected: (mention: MentionToSend) => void;
                onEmojiSelected: (emoji: { name: string; value: string }) => void;
            },
            ref: React.Ref<AutoCompleteComponentRef>,
        ) => {
            const client = useClient();
            const listRef = React.useRef<UNavigableListRef>(null);
            const fallbackRender = React.useRef<any>(<div className={cx(mentionsContainer, props.containerClassName)} />);
            const containerRef = React.useRef<HTMLDivElement>(null);

            const lastActiveWord = React.useRef(props.activeWord);
            const isActive = React.useRef<boolean>(false);

            const forceClose = React.useRef<boolean>(false);
            // Store word in state for nice disappear animation
            const [word, setWord] = React.useState(props.activeWord);
            if (word !== props.activeWord && !forceClose.current) {
                setWord(props.activeWord);
            }
            if (props.activeWord !== lastActiveWord.current) {
                forceClose.current = false;
            }

            isActive.current = false;
            lastActiveWord.current = props.activeWord;

            const [users, setUsers] = React.useState<ListItem[]>([]);
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
                },
            }));
            useShortcuts([
                {
                    keys: ['Escape'],
                    callback: () => {
                        if (isActive.current) {
                            forceClose.current = true;
                            setWord(null);
                            return true;
                        }
                        return false;
                    },
                },
            ]);

            const itemRender = React.useCallback(
                (v: ListItem) => {
                    if (v.__typename === 'cursor') {
                        (async () => {
                            const lastq = lastQuery.current;
                            const { items, cursor } = (await client.queryChatMentionSearch({
                                cid: props.groupId!,
                                query: lastQuery.current,
                                first: 20,
                                after: v.after,
                            })).mentions;
                            if (lastq !== lastQuery.current) {
                                return;
                            }

                            const dataLocalItems = items.filter((mention) => mention.__typename === 'MentionSearchUser' && mention.fromSameChat);
                            const dataGlobalItems = items.filter((mention) => mention.__typename === 'MentionSearchUser' ? !mention.fromSameChat : true);

                            setUsers(currentUsers => {
                                let res: ListItem[] = currentUsers.filter(c => c.__typename !== 'cursor');

                                if (currentUsers.filter(c => c.__typename === 'divider').length > 0 || props.isPrivate) {
                                    res.push(...dataGlobalItems);
                                } else {
                                    res.push(...dataLocalItems);

                                    if (dataGlobalItems.length > 0) {
                                        res.push({ __typename: 'divider', selectable: false });
                                        res.push(...dataGlobalItems);
                                    }
                                }

                                if (!!cursor) {
                                    res.push({
                                        __typename: 'cursor',
                                        after: cursor,
                                    });
                                }

                                return res;
                            });
                        })();
                    }

                    if (v.__typename === 'divider') {
                        return (
                            <XView height={40} flexGrow={1} justifyContent="center" alignItems="center" flexDirection="row">
                                <XView height={1} backgroundColor="var(--border)" flexGrow={1} marginHorizontal={16} />
                                <XView {...TextStyles.Caption} color="var(--foregroundTertiary)">
                                    Not in this group
                                </XView>
                                <XView height={1} backgroundColor="var(--border)" flexGrow={1} marginHorizontal={16} />
                            </XView>
                        );
                    } else if (v.__typename === 'placeholder') {
                        return (
                            <div className={cx(mentionContainer, placeholderContainer)}>
                                <UIcon className={listItemIcon} color="var(--foregroundSecondary)" icon={<AtIcon />} />
                                <span className={cx(TextBody, placeholderText)}>
                                    Type to search anyone or anything
                                </span>
                            </div>
                        );
                    } else if (v.__typename === 'AllMention') {
                        return (
                            <div className={mentionContainer}>
                                <UIcon className={listItemIcon} color="var(--foregroundSecondary)" icon={<AllIcon />} />
                                <span className={userName}>
                                    <span className={allMention}>
                                        All
                                    </span>
                                    <span style={{ opacity: 0.4, marginLeft: 7 }}>
                                        Notify everyone in this {props.isChannel ? 'channel' : 'group'}
                                    </span>
                                </span>
                            </div>
                        );
                    } else if (v.__typename === 'MentionSearchUser') {
                        return (
                            <MentionItemComponent
                                id={v.user.id}
                                photo={v.user.photo}
                                title={v.user.name}
                                subtitle={v.user.isBot ? 'Bot' : v.user.primaryOrganization ? v.user.primaryOrganization.name : undefined}
                            />
                        );
                    } else if (v.__typename === 'MentionSearchOrganization') {
                        return (
                            <MentionItemComponent
                                id={v.organization.id}
                                photo={v.organization.photo}
                                title={v.organization.name}
                                subtitle={v.organization.isCommunity ? 'Community' : 'Organization'}
                            />
                        );
                    } else if (v.__typename === 'MentionSearchSharedRoom') {
                        return (
                            <MentionItemComponent
                                id={v.room.id}
                                photo={v.room.photo}
                                title={v.room.title}
                                subtitle="Group"
                            />
                        );
                    }

                    return (
                        <XView height={40} flexGrow={1} justifyContent="center" alignItems="center">
                            <XLoader loading={true} transparentBackground={true} size="medium" />
                        </XView>
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

            let matched: ListItem[] | undefined = [];
            let currentWord = word;
            if (props.groupId) {
                let query = currentWord && currentWord.startsWith('@') ? currentWord.substring(1) : undefined;
                const mentions = client.useChatMentionSearch({
                    cid: props.groupId,
                    query,
                    first: 20,
                }, { suspense: false });

                if (mentions && query !== lastQuery.current) {
                    lastQuery.current = query;

                    const { items, cursor } = mentions.mentions;

                    const dataLocalItems = items.filter((mention) => mention.__typename === 'MentionSearchUser' && mention.fromSameChat);
                    const dataGlobalItems = items.filter((mention) => mention.__typename === 'MentionSearchUser' ? !mention.fromSameChat : true);

                    let res: ListItem[] = props.isPrivate
                        ? [...dataGlobalItems]
                        : [...dataLocalItems, ...(dataGlobalItems.length > 0 ? [{ __typename: 'divider', selectable: false } as Divider, ...dataGlobalItems] : [])];

                    if (!!cursor) {
                        res.push({
                            __typename: 'cursor',
                            after: cursor,
                        });
                    }

                    if (res.length && currentWord && currentWord.startsWith('@') && !props.isPrivate) {
                        if ('@all'.startsWith(currentWord.toLowerCase())) {
                            res.unshift({ __typename: 'AllMention' });
                        }
                    }

                    if (res.length === 0 && currentWord === '@') {
                        res = [{ __typename: 'placeholder', selectable: false }];
                    }
                    setUsers(res);
                }
                if (users && currentWord && currentWord.startsWith('@')) {
                    matched = [...users];
                }
            }
            let filtered: { name: string; value: string; shortcode: string; selectable?: boolean; }[] = [];
            if (currentWord) {
                filtered.push(...emojiSuggest(currentWord));
            }

            isActive.current = !!filtered.length || !!matched.length;

            let onSelected = React.useCallback((mention: ListItem & { selectable?: boolean }) => {
                if (isActive.current) {
                    if (mention.__typename === 'MentionSearchUser') {
                        props.onSelected(mention.user);
                    } else if (mention.__typename === 'MentionSearchOrganization') {
                        props.onSelected(mention.organization);
                    } else if (mention.__typename === 'MentionSearchSharedRoom') {
                        props.onSelected(mention.room);
                    } else if (mention.__typename === 'AllMention') {
                        props.onSelected(mention);
                    }
                }
            }, [props.membersCount]);

            let onEmojiSelected = React.useCallback((emoji: { name: string; value: string; selectable?: boolean }) => {
                if (isActive.current) {
                    onEmojiSent(emoji.name);
                    props.onEmojiSelected(emoji);
                }
            }, []);

            React.useEffect(
                () => {
                    if (containerRef.current) {
                        let show = (matched && matched.length) || (filtered && filtered.length);
                        containerRef.current.style.opacity = show ? '1' : '0';
                        containerRef.current.style.transform = `translateY(${show ? 0 : 10}px)`;
                        containerRef.current.style.pointerEvents = show ? 'auto' : 'none';
                    }
                    if (listRef.current) {
                        listRef.current.reset();
                    }
                },
                [matched, filtered],
            );

            if (matched.length) {
                const isPlaceholder = matched[0].__typename === 'placeholder';
                fallbackRender.current = (
                    <div
                        ref={containerRef}
                        className={cx(mentionsContainer, props.containerClassName)}
                        onMouseDown={e => e.preventDefault()}
                    >
                        <UNavigableReactWindow
                            width={'100%'}
                            height={isPlaceholder ? 56 : Math.min(matched.length * 40, 250)}
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
                        className={cx(mentionsContainer, props.containerClassName)}
                        onMouseDown={e => e.preventDefault()}
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

export const useInputAutocompleteHanlders = ({ inputRef, suggestRef }: {
    inputRef: React.RefObject<URickInputInstance>;
    suggestRef: React.RefObject<AutoCompleteComponentRef>;
}) => {
    const prefixes = ['@', ':', ...Object.keys(emojiWordMap)];
    const [activeWord, setActiveWord] = React.useState<string | null>(null);
    const onWordChange = React.useCallback((word: string) => {
        setActiveWord(word);
    }, []);
    const onUserPicked = React.useCallback((mention: MentionToSend) => {
        inputRef.current!.commitSuggestion('mention', mention);
    }, []);
    const onEmojiPicked = React.useCallback((emoji: { name: string; value: string }) => {
        inputRef.current!.commitSuggestion('emoji', emoji);
    }, []);

    let onPressUp = React.useCallback(() => {
        let s = suggestRef.current;
        if (s && s.isActive()) {
            s.onPressUp();
            return true;
        }
        return false;
    }, []);
    let onPressDown = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressDown();
        }
        return false;
    }, []);
    let onPressTab = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressEnter();
        }
        return false;
    }, []);
    let onPressEnter = () => {
        let s = suggestRef.current;
        if (s) {
            if (s.onPressEnter()) {
                return true;
            }
        }
        return false;
    };

    return {
        prefixes,
        activeWord,
        onWordChange,
        onUserPicked,
        onEmojiPicked,
        onPressUp,
        onPressDown,
        onPressTab,
        onPressEnter,
    };
};

interface SendMessageComponentProps {
    groupId?: string;
    isChannel?: boolean;
    isPrivate?: boolean;
    chatTitle?: string;
    membersCount?: number | null;
    onTextSent?: (text: URickTextValue) => boolean;
    onTextSentAsync?: (text: URickTextValue) => Promise<boolean>;
    onContentChange?: (text: URickTextValue) => void;
    onStickerSent?: (sticker: StickerFragment) => void;
    onStickerSentAsync?: (sticker: StickerFragment) => void;
    onTextChange?: (text: string) => void;
    onEmojiPickerShow?: (stickers: boolean) => void;
    onEmojiPickerHide?: () => void;
    placeholder?: string;
    initialText?: URickTextValue;
    rickRef?: React.RefObject<URickInputInstance>;
    onPressUp?: () => boolean;
    onAttach?: (files: File[], isImage: boolean) => void;
    autoFocus?: boolean;
    ownerName?: string;
    isEditing?: boolean;
    hideDonation: boolean;
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

const hideScrollStyle = css`
    margin-right: -17px;
    
    .emojiPickerIcon {
        right: 17px;
    }

    .ql-editor {
        padding-right: 49px;
    }
`;

export const SendMessageComponent = React.memo((props: SendMessageComponentProps) => {
    const os = detectOS();
    const isWindows = os === 'Windows';
    const isLinux = os === 'Linux';

    const ref = props.rickRef || React.useRef<URickInputInstance>(null);
    const showDonation = useDonationModal({ name: props.ownerName, chatId: props.groupId, chatTitle: props.chatTitle });
    const suggestRef = React.useRef<AutoCompleteComponentRef>(null);
    const {
        prefixes,
        activeWord,
        onWordChange,
        onUserPicked,
        onEmojiPicked,
        onPressUp,
        onPressDown,
        onPressTab,
        onPressEnter,
    } = useInputAutocompleteHanlders({ inputRef: ref, suggestRef });
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

    const lockRef = React.useRef(false);

    const handlePressEnter = React.useCallback(
        async () => {
            let handled = onPressEnter();
            if (handled) {
                return true;
            }
            let ed = ref.current;
            if (ed && !lockRef.current) {
                lockRef.current = true;

                let text = ed.getText();

                if (text.length > 0) {
                    if (props.onTextSentAsync) {
                        setLoading(true);
                        // clear input only if onTextSentAsync return true
                        if (await props.onTextSentAsync(text)) {
                            ed.clear();
                        }
                        setLoading(false);
                        ed.focus();
                    } else if (props.onTextSent) {
                        // clear input only if onTextSent return true
                        if (props.onTextSent(text)) {
                            ed.clear();
                        }
                        ed.focus();
                    }
                }

                lockRef.current = false;
            }
            return true;
        },
        [props.onTextSent, props.onTextSentAsync],
    );

    const handlePressUp = React.useCallback(() => {
        let handled = onPressUp();
        if (handled) {
            return true;
        } else if (props.onPressUp) {
            return props.onPressUp();
        }
        return false;
    }, []);

    const onDonateClick = React.useCallback(() => {
        showDonation();
    }, [showDonation]);
    const handleFilePaste = React.useCallback((files: File[]) => {
        if (props.onAttach) {
            props.onAttach(files, files.every(x => isFileImage(x)));
        }
    }, []);

    return (
        <div className={sendMessageContainer}>
            <Deferred>
                <AutoCompleteComponent
                    onSelected={onUserPicked}
                    onEmojiSelected={onEmojiPicked}
                    groupId={props.groupId}
                    membersCount={props.membersCount}
                    activeWord={activeWord}
                    isChannel={props.isChannel}
                    isPrivate={props.isPrivate}
                    ref={suggestRef}
                    containerClassName={sendMessageMentions}
                />
            </Deferred>
            {!!props.onAttach && (
                <AttachConfirmButton
                    hideDonation={props.hideDonation}
                    onAttach={props.onAttach}
                    onDonate={onDonateClick}
                />
            )}
            <XView
                flexGrow={1}
                flexShrink={1}
                marginRight={16}
                marginLeft={!!props.onAttach ? 16 : 0}
                maxHeight={250}
                flexDirection="column"
                overflow={(isWindows || isLinux) ? 'hidden' : undefined}
                borderRadius={(isWindows || isLinux) ? 8 : undefined}
            >
                <URickInput
                    ref={ref}
                    initialContent={props.initialText}
                    autocompletePrefixes={prefixes}
                    onAutocompleteWordChange={onWordChange}
                    onPressEnter={handlePressEnter}
                    onPressUp={handlePressUp}
                    onPressDown={onPressDown}
                    onPressTab={onPressTab}
                    onTextChange={props.onTextChange}
                    onContentChange={props.onContentChange}
                    onStickerSent={
                        props.onStickerSent || props.onStickerSentAsync ? onStickerSent : undefined
                    }
                    autofocus={props.autoFocus}
                    placeholder={props.placeholder || 'Write a message...'}
                    onFilesPaste={handleFilePaste}
                    className={(isWindows || isLinux) ? hideScrollStyle : undefined}
                    onEmojiPickerShow={props.onEmojiPickerShow}
                    onEmojiPickerHide={props.onEmojiPickerHide}
                />
            </XView>
            {!loading && (
                <div className={actionButtonContainer}>
                    <UIconButton icon={props.isEditing ? <DoneIcon /> : <SendIcon />} onClick={handlePressEnter} />
                </div>
            )}
            {loading && (
                <div className={loaderContainer}>
                    <XLoader loading={true} size="medium" />
                </div>
            )}
        </div>
    );
});
