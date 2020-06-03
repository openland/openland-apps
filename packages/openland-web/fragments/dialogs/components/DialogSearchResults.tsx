import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { plural } from 'openland-y-utils/plural';
import { GlobalSearch_items, GlobalSearchVariables } from 'openland-api/spacex.types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogView } from './DialogView';
import { emoji } from '../../../../openland-y-utils/emoji';
import { extractPlaceholder } from '../../../../openland-y-utils/extractPlaceholder';
import { useGlobalSearch } from './useGlobalSearch';

const noResultContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 34px;
`;

const imageStyle = css`
    width: 178px;
    height: 155px;
    background-image: url(/static/X/messenger/channels-search-empty.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-bottom: 20px;
`;

export interface DialogSearchResults {
    variables: GlobalSearchVariables;
    onPick: (item: GlobalSearch_items) => void;
    onMessagePick?: (messageId: string) => void;
    paddingHorizontal?: number;
    isForwarding?: boolean;
}

const EmptyView = React.memo(() => (
    <div className={noResultContainer}>
        <div className={imageStyle} />
        <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
    </div>
));

interface ItemRenderProps extends DialogSearchResults {
    item: GlobalSearch_items;
    index: number;
    selectedIndex: number;
}

const ItemRender = React.memo((props: ItemRenderProps) => {
    const { item, index, selectedIndex, isForwarding, onPick, paddingHorizontal } = props;

    let selected = index === selectedIndex;
    if (item.__typename === 'SharedRoom') {
        if (!isForwarding || item.canSendMessage) {
            return (
                <UListItem
                    key={item.id}
                    onClick={() => onPick(item)}
                    hovered={selected}
                    title={item.title}
                    description={plural(item.membersCount || 0, ['member', 'members'])}
                    avatar={{ id: item.id, photo: item.roomPhoto, title: item.title }}
                    useRadius={false}
                    paddingHorizontal={paddingHorizontal}
                />
            );
        }
    } else if (item.__typename === 'Organization') {
        return (
            <UListItem
                key={item.id}
                onClick={() => onPick(item)}
                hovered={selected}
                title={item.name}
                description={item.about}
                avatar={{ id: item.id, photo: item.photo, title: item.name }}
                useRadius={false}
                paddingHorizontal={paddingHorizontal}
            />
        );
    } else if (item.__typename === 'User') {
        if (!isForwarding || !item.isBot) {
            return (
                <UUserView
                    key={item.id}
                    onClick={() => onPick(item)}
                    hovered={selected}
                    user={item}
                    useRadius={false}
                    paddingHorizontal={paddingHorizontal}
                />
            );
        }
    }

    return null;
});

const DialogSearch = React.memo((props: DialogSearchResults) => {
    const { items, selectedIndex } = useGlobalSearch(props);

    if (items.length === 0) {
        return <EmptyView />;
    }

    return (
        <>
            {items.map((i, index) => <ItemRender key={'item-' + i.id} item={i} index={index} selectedIndex={selectedIndex} {...props} />)}
        </>
    );
});

const DialogSearchWithMessages = React.memo((props: DialogSearchResults & { onMessagePick: (messageId: string) => void; }) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const { items, selectedIndex } = useGlobalSearch(props);
    const messages = client.useMessagesSearch(
        {
            query: JSON.stringify({
                $and: [{ text: props.variables.query }, { isService: false }],
            }),
            sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
            first: 30,
        },
        {
            fetchPolicy: 'network-only',
        },
    ).messagesSearch.edges;

    if (items.length === 0 && messages.length === 0) {
        return <EmptyView />;
    }

    return (
        <>
            {items.map((i, index) => <ItemRender key={'item-' + i.id} item={i} index={index} selectedIndex={selectedIndex} {...props} />)}
            {messages.length > 0 && (
                <XView height={1} alignSelf="stretch" backgroundColor="#ececec" />
            )}
            {messages.map(i => {
                const { message, chat } = i.node;
                const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
                const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;

                return (
                    <DialogView
                        item={{
                            titleEmojify: emoji(title),
                            titlePlaceholderEmojify: emoji(extractPlaceholder(title)),
                            senderEmojify: message.sender && emoji(message.sender.name),
                            messageEmojify: (message.message && emoji(message.message)) || undefined,
                            message: message.message || undefined,
                            title,
                            key: chat.id,
                            flexibleId: chat.id,
                            kind: chat.__typename === 'PrivateRoom' ? 'PRIVATE' : 'GROUP',
                            unread: 0,
                            fallback: message.fallback,
                            fallbackEmojify: emoji(message.fallback),
                            date: message.date,
                            photo: photo || undefined,
                            isService: false,
                            isOut: message.sender.id === messenger.user.id,
                            isMuted: !!chat.settings.mute,
                            sender: message.sender.name,
                            membership: chat.__typename === 'SharedRoom' ? chat.membership : 'NONE'
                        }}
                        key={message.id}
                        onPress={() => props.onMessagePick(message.id)}
                    />
                );
            })}
        </>
    );
});

export const DialogSearchResults = (props: DialogSearchResults) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            {props.onMessagePick && <DialogSearchWithMessages {...props} onMessagePick={props.onMessagePick} />}
            {!props.onMessagePick && <DialogSearch {...props} />}
        </React.Suspense>
    );
};
