import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { URickInput, URickInputInstance, URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { showShortcutsHelp } from '../showShortcutsHelp';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';
import { UNavigableList, UNavigableListRef } from 'openland-web/components/unicorn/UNavigableList';
import { useClient } from 'openland-web/utils/useClient';
import { RoomMembers_members_user } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { searchMentions } from 'openland-engines/mentions/searchMentions';

const attachButtonWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 32px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    line-height: 5px;
    color: #676d7a;
    cursor: pointer;
    padding-left: 12px;
    padding-right: 12px;

    &:hover {
        background-color: #f0f2f5;
    }

    & svg {
        margin-right: 10px;

        & * {
            fill: #969aa3;
        }
    }

    @media (max-width: 1230px) {
        & svg {
            margin-right: 0;
        }
        & span {
            display: none;
        }
    }
`;

interface AttachButtonProps {
    text: string;
    icon: JSX.Element;
    onClick?: () => void;
}

const AttachButton = (props: AttachButtonProps) => (
    <XView onClick={props.onClick}>
        <div className={attachButtonWrapper}>
            {props.icon}
            <span>{props.text}</span>
        </div>
    </XView>
);

const ButtonPartWrapper = (props: { leftContent: JSX.Element; rightContent: JSX.Element }) => (
    <XView flexDirection="row" alignItems="center">
        <XView flexDirection="row" alignItems="center" marginRight={6}>
            {props.leftContent}
        </XView>
        {props.rightContent}
    </XView>
);

interface MentionUserComponentProps {
    id: string;
    name: string;
    photo: string | null;
    primaryOrganization: {
        name: string;
    } | null;
}

const MentionUserComponent = (props: MentionUserComponentProps) => (
    <XView
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
        height={40}
        paddingHorizontal={16}
    >
        <XAvatar2 id={props.id} title={props.name} src={props.photo} size={28}/>
        <XView
            marginLeft={12}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            flexGrow={1}
        >
            <XView flexDirection="row" alignItems="center" flexGrow={1}>
                <XView
                    fontSize={13}
                    fontWeight="600"
                    lineHeight={1.54}
                    color="#171B1F"
                >
                    {props.name}
                </XView>
                {props.primaryOrganization && (
                    <XView
                        marginLeft={7}
                        paddingTop={4}
                        fontSize={12}
                        lineHeight={1.5}
                        color="#676D7A"
                    >
                        {props.primaryOrganization.name}
                    </XView>
                )}
            </XView>
            <XView
                fontSize={12}
                lineHeight={1.5}
                color="#676D7A"
                flexDirection="row"
            >
                <XView paddingTop={3} marginRight={5}>↵</XView>
                <XView>to select</XView>
            </XView>
        </XView>
    </XView>
);

const mentionsContainer = css`
    position: absolute;
    bottom: 100%;
    left: 0px;
    right: 0px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    background-color: white;
    border-radius: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    will-change: opacity;
    transition: opacity, transform 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
    overflow-y: scroll;
    overflow-x: none;
    max-height: 250px;
`;

interface AutoCompleteComponentRef {
    onPressUp(): boolean;
    onPressDown(): boolean;
    onPressEnter(): boolean;
}

const AutoCompleteComponent = React.memo(React.forwardRef((props: {
    groupId: string, activeWord: string | null,
    onSelected: (user: RoomMembers_members_user) => void
}, ref: React.Ref<AutoCompleteComponentRef>) => {

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
        }
    }));

    const itemRender = React.useCallback((v: any) => (
        <MentionUserComponent
            name={v.name}
            id={v.id}
            photo={v.photo}
            primaryOrganization={v.primaryOrganization}
        />
    ), []);
    const client = useClient();

    let members = client.useWithoutLoaderRoomMembers({ roomId: props.groupId });
    if (!members || !members.members) {
        return null;
    }

    let matched: any[];
    if (word) {
        matched = searchMentions(word, members.members).map(v => ({ key: v.user.id, data: v.user }));
    } else {
        matched = [];
    }

    return (
        <div
            className={mentionsContainer}
            style={{
                opacity: props.activeWord ? 1 : 0,
                transform: `translateY(${props.activeWord ? 0 : 10}px)`,
                pointerEvents: props.activeWord ? 'auto' : 'none'
            }}
        >
            <UNavigableList
                data={matched}
                render={itemRender}
                onSelected={props.onSelected}
                ref={listRef}
            />
        </div>
    );
}));

export const SendMessageComponent = React.memo((props: { groupId?: string, onTextSent?: (text: URickTextValue) => void }) => {
    const ref = React.useRef<URickInputInstance>(null);
    const suggestRef = React.useRef<AutoCompleteComponentRef>(null);
    const onPressEnter = React.useCallback(
        () => {
            console.log('enter');
            let s = suggestRef.current;
            if (s) {
                console.log('sug');
                if (s.onPressEnter()) {
                    console.log('sug:true');
                    return true;
                }
            }
            let ed = ref.current;
            if (ed) {
                let text = ed.getText();
                if (props.onTextSent) {
                    if (text.text.trim().length > 0) {
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

    const onPressUp = React.useCallback(
        () => {
            let s = suggestRef.current;
            if (s) {
                s.onPressUp();
            }
            return true;
        },
        [],
    );

    const onPressDown = React.useCallback(
        () => {
            let s = suggestRef.current;
            if (s) {
                s.onPressDown();
            }
            return true;
        },
        [],
    );

    const onPressTab = React.useCallback(
        () => {
            let s = suggestRef.current;
            if (s) {
                return s.onPressEnter();
            }
            return true;
        },
        [],
    );

    const [activeWord, setActiveWord] = React.useState<string | null>(null);
    const onAutocompleteWordChange = React.useCallback((word: string) => {
        setActiveWord(word);
    }, []);
    const onUserPicked = React.useCallback((user: RoomMembers_members_user) => {
        ref.current!.commitSuggestion(user);
    }, []);

    return (
        <XView flexGrow={1} flexShrink={1} maxHeight={250} paddingVertical={16} position="relative">
            {props.groupId && (
                <AutoCompleteComponent
                    onSelected={onUserPicked}
                    groupId={props.groupId}
                    activeWord={activeWord}
                    ref={suggestRef}
                />
            )}
            <XView flexGrow={1} flexShrink={1}>
                <URickInput
                    ref={ref}
                    autocompletePrefixes={['@']}
                    onAutocompleteWordChange={onAutocompleteWordChange}
                    onPressEnter={onPressEnter}
                    onPressUp={onPressUp}
                    onPressDown={onPressDown}
                    onPressTab={onPressTab}
                    autofocus={true}
                    placeholder="Write a message..."
                />
            </XView>
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginTop={16}
            >
                <ButtonPartWrapper
                    leftContent={<AttachButton text="Photo" icon={<PhotoIcon />} />}
                    rightContent={<AttachButton text="Document" icon={<FileIcon />} />}
                />
                <ButtonPartWrapper
                    leftContent={<AttachButton text="Shortcuts" icon={<ShortcutsIcon />} onClick={showShortcutsHelp} />}
                    rightContent={<UButton text="Send" onClick={onPressEnter} />}
                />
            </XView>
        </XView>
    );
});
