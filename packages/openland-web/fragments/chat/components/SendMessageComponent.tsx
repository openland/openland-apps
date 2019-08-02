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
import { UNavigableList, UNavigableListRef } from 'openland-web/components/unicorn/UNavigableList';
import { useClient } from 'openland-web/utils/useClient';
import { RoomMembers_members_user } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { searchMentions } from 'openland-engines/mentions/searchMentions';
import { emojiSuggest } from 'openland-y-utils/emojiSuggest';
import { emojiComponent } from 'openland-y-utils/emojiComponent';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

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
    <div className={mentionUserContainer}>
        <XView fontSize={18} width={28} height={28} marginRight={6}>
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
    will-change: opacity;
    transition: opacity, transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: scroll;
    overflow-x: none;
    max-height: 250px;
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

            // Store word in state for nice disappear animation
            const [word, setWord] = React.useState(props.activeWord);
            const lastActiveWord = React.useRef(props.activeWord);
            lastActiveWord.current = props.activeWord;
            if (props.activeWord) {
                if (word !== props.activeWord) {
                    setWord(props.activeWord);
                }
            }
            React.useImperativeHandle(ref, () => ({
                onPressDown: () => {
                    if (!lastActiveWord.current) {
                        return false;
                    }
                    let r = listRef.current;
                    if (r) {
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
                    if (r) {
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
                    if (r) {
                        return r.onPressEnter();
                    }
                    return false;
                },
                onPressTab: () => {
                    let r = listRef.current;
                    if (r) {
                        return r.onPressEnter();
                    }
                    return false;
                },
                isActive: () => {
                    return !!word && word.startsWith(':');
                }
            }));

            const itemRender = React.useCallback(
                (v: any) => (
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

            if (props.groupId) {
                const client = useClient();
                let members = client.useWithoutLoaderRoomMembers({ roomId: props.groupId });
                if (!members || !members.members) {
                    return null;
                }

                if (word && !word.startsWith(':')) {
                    // Mentions
                    let matched: any[];
                    if (word) {
                        matched = searchMentions(word, members.members).map(v => ({
                            key: v.user.id,
                            data: v.user,
                        }));
                    } else {
                        matched = [];
                    }

                    return (
                        <div
                            className={mentionsContainer}
                            style={{
                                opacity: props.activeWord ? 1 : 0,
                                transform: `translateY(${props.activeWord ? 0 : 10}px)`,
                                pointerEvents: props.activeWord ? 'auto' : 'none',
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <UNavigableList
                                data={matched}
                                render={itemRender}
                                onSelected={props.onSelected}
                                ref={listRef}
                            />
                        </div>
                    );
                }
            }
            if (word && word.startsWith(':')) {
                let filtered = emojiSuggest(word).map(v => ({ key: v.name, data: v }));
                return (
                    <div
                        className={mentionsContainer}
                        style={{
                            opacity: props.activeWord ? 1 : 0,
                            transform: `translateY(${props.activeWord ? 0 : 10}px)`,
                            pointerEvents: props.activeWord ? 'auto' : 'none',
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {/* <UButton text={'filtered-' + filtered.length} onClick={() => props.onEmojiSelected({ name: '1f923', value: '🤣' })} /> */}
                        <UNavigableList
                            data={filtered}
                            render={emojiItemRender}
                            onSelected={props.onEmojiSelected}
                            ref={listRef}
                        />
                    </div>
                );
            }
            return null;
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
    onPressUp?: () => void;
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
        } else if (props.onPressUp) {
            props.onPressUp();
        }
        return true;
    }, []);

    const onPressDown = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            s.onPressDown();
        }
        return true;
    }, []);

    const onPressTab = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressEnter();
        }
        return true;
    }, []);

    const onAttachPress = React.useCallback(() => {
        //
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const onFileInputChange = React.useCallback((e) => {
        let files: FileList | undefined = e.target.files;
        if (files && files.length && props.onAttach) {
            let res = [];
            for (let i = 0; i < files.length; i++) {
                res.push(files[i]);
            }
            props.onAttach(res);
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
                    autocompletePrefixes={['@', ':']}
                    onAutocompleteWordChange={onAutocompleteWordChange}
                    onPressEnter={onPressEnter}
                    onPressUp={onPressUp}
                    onPressDown={onPressDown}
                    onPressTab={onPressTab}
                    onTextChange={props.onTextChange}
                    onContentChange={props.onContentChange}
                    autofocus={true}
                    placeholder={props.placeholder || 'Write a message...'}
                />
            </XView>
            <div className={actionButtonContainer} onClick={onPressEnter}>
                <UIcon icon={<SendIcon />} color={'#676d7a'} />
            </div>
        </div>
    );
});
