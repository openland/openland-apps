import * as React from 'react';
import { XView, XViewRouteContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import { MessagesSearch_messagesSearch, MessagesSearch_messagesSearch_edges, GlobalSearch_items } from 'openland-api/spacex.types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogView } from './DialogView';
import { emoji } from '../../../../openland-y-utils/emoji';
import { extractPlaceholder } from '../../../../openland-y-utils/extractPlaceholder';
import { DialogSearchItemRender } from './DialogSearchResults';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useListSelection } from 'openland-web/utils/useListSelection';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';

const LOADING_HEIGHT = 200;

interface DialogSearchMessagesProps {
    onMessagePick: (messageId: string) => void;
    onLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onPick: (item: GlobalSearch_items) => void;
    paddingHorizontal?: number;
    isForwarding?: boolean;
}

const getCursor = (data: MessagesSearch_messagesSearch) => {
    if (data.pageInfo.hasNextPage && data.edges.length) {
        return data.edges[data.edges.length - 1].cursor;
    }

    return null;
};

const constructVariables = (query: string, after?: string | null) => ({
    query: JSON.stringify({
        $and: [{ text: query }, { isService: false }],
    }),
    sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
    first: 20,
    after
});

const emptyTitle = css`
    text-align: center;
    margin-bottom: 4px;
    color: var(--foregroundPrimary);
`;

const emptyText = css`
    text-align: center;
    margin-bottom: 16px;
    color: var(--foregroundSecondary);
`;

const EmptyView = React.memo(() => {
    return (
        <XView
            flexGrow={1}
            justifyContent="center"
            padding={32}
        >
            <div className={cx(TextTitle3, emptyTitle)}>
                Nothing found
            </div>
            <div className={cx(TextBody, emptyText)}>
                Didn’t find your friends at Openland? Let’s invite them to stay in touch
            </div>
            <XView alignItems="center">
                <UButton path="/settings/invites" text="Invite friends" />
            </XView>
        </XView>
    );
});

export interface DialogSearchMessagesRef {
    loadResults: (query: string) => void;
    resetResults: () => void;
}

const DialogSearchMessagesInner = React.forwardRef(
    (props: DialogSearchMessagesProps, ref: React.Ref<DialogSearchMessagesRef>) => {
        const messenger = React.useContext(MessengerContext);
        const client = useClient();
        const router = React.useContext(XViewRouteContext);

        const initialItems = client.useGlobalSearch({ query: '' }, { fetchPolicy: 'cache-and-network' }).items;
        const queryRef = React.useRef('');

        const [isRecent, setIsRecent] = React.useState(true);
        const [isHashtag, setIsHashtag] = React.useState(false);
        const [loadingMore, setLoadingMore] = React.useState(false);
        const [after, setAfter] = React.useState<string | null>(null);
        const [items, setItems] = React.useState<GlobalSearch_items[]>(initialItems);
        const [messages, setMessages] = React.useState<MessagesSearch_messagesSearch_edges[]>([]);

        const loadResults = React.useCallback(async (query: string) => {
            props.onLoading(true);
            queryRef.current = query;

            const loadedItems = (await client.queryGlobalSearch({ query }, { fetchPolicy: 'network-only' })).items;
            const loadedMessages = (await client.queryMessagesSearch(constructVariables(query), { fetchPolicy: 'network-only' })).messagesSearch;
            // avoid race condition
            if (queryRef.current !== query) {
                return;
            }
            setIsHashtag(query.startsWith('#'));
            setIsRecent(false);
            setItems(loadedItems);
            setAfter(getCursor(loadedMessages));
            setMessages(loadedMessages.edges);
            props.onLoading(false);
        }, []);

        React.useImperativeHandle(ref, () => ({
            loadResults: loadResults,
            resetResults: () => {
                queryRef.current = '';

                setItems(initialItems);
                setAfter(null);
                setMessages([]);
                setIsRecent(true);
                setIsHashtag(false);

                props.onLoading(false);
            },
        }));

        const resultsLength = items.length + messages.length;

        const { selectedIndex } = useListSelection({ maxIndex: resultsLength - 1 });

        useShortcuts([
            {
                keys: ['Enter'],
                callback: () => {
                    if (selectedIndex <= items.length - 1) {
                        const item = items[selectedIndex];

                        if (item) {
                            props.onPick(item);
                        }
                    } else {
                        const message = messages[selectedIndex - items.length];

                        if (message) {
                            props.onMessagePick(message.node.message.id);
                        }
                    }
                },
            },
        ]);

        const handleNeedMore = React.useCallback(async () => {
            if (loadingMore || !after || queryRef.current.length === 0) {
                return;
            }

            setLoadingMore(true);

            const loaded = (await client.queryMessagesSearch(constructVariables(queryRef.current, after))).messagesSearch;
            const cursor = getCursor(loaded);

            setAfter(cursor);
            setMessages(prev => prev.concat(loaded.edges));
            setLoadingMore(false);
        }, [after, loadingMore]);

        const onScroll = React.useCallback((values: XScrollValues) => {
            let d = values.scrollHeight - (values.clientHeight + values.scrollTop);
            if (d < LOADING_HEIGHT) {
                handleNeedMore();
            }
        }, [handleNeedMore, after, loadingMore]);

        if (items.length === 0 && messages.length === 0) {
            return <EmptyView />;
        }

        return (
            <XScrollView3 onScroll={onScroll} flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                {items.map((i, index) => {
                    if (isRecent && i.id === messenger.user.id && index === 0) {
                        return (
                            <>
                                <DialogSearchItemRender key={'item-' + i.id} item={i} index={index} selectedIndex={selectedIndex} savedMessages={i.id === messenger.user.id} {...props} />
                                {items.length > 1 && <UListHeader text="Recent chats" />}
                            </>
                        );
                    }
                    return <DialogSearchItemRender key={'item-' + i.id} item={i} index={index} selectedIndex={selectedIndex} savedMessages={!isHashtag && (i.id === messenger.user.id)} {...props} />;
                })}
                {messages.length > 0 && (
                    <UListHeader text="Messages" />
                )}
                {messages.map((i, index) => {
                    const { message, chat } = i.node;
                    const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
                    const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;
                    const selected = router ? (router as any).routeQuery?.messageId === message.id : false;

                    return (
                        <DialogView
                            key={message.id}
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
                            hovered={index === (selectedIndex - items.length)}
                            selected={selected}
                            onPress={() => props.onMessagePick(message.id)}
                            savedMessages={chat.__typename === 'PrivateRoom' && chat.user.id === messenger.user.id}
                        />
                    );
                })}
                <XView height={56} alignItems="center" justifyContent="center">
                    {loadingMore && <XLoader loading={true} />}
                </XView>
            </XScrollView3>
        );
    });

export const DialogSearchMessages = React.memo((props: DialogSearchMessagesProps & { listRef: React.Ref<DialogSearchMessagesRef> }) => {
    const { listRef, ...other } = props;

    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <DialogSearchMessagesInner ref={props.listRef} {...other} />
        </React.Suspense>
    );
});
