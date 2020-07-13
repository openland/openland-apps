import * as React from 'react';
import { XView, XViewRouteContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import { MessagesSearch_messagesSearch } from 'openland-api/spacex.types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogView } from './DialogView';
import { emoji } from '../../../../openland-y-utils/emoji';
import { extractPlaceholder } from '../../../../openland-y-utils/extractPlaceholder';
import { DialogSearchEmptyView, DialogSearchItemRender, DialogSearchResults } from './DialogSearchResults';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { InvalidateSync } from '@openland/patterns';
import { useListSelection } from 'openland-web/utils/useListSelection';

const LOADING_HEIGHT = 200;

interface DialogSearchMessagesProps extends DialogSearchResults {
    onMessagePick: (messageId: string) => void;
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

const DialogSearchMessagesInner = React.memo((props: DialogSearchMessagesProps) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const router = React.useContext(XViewRouteContext);

    const [messagesInvalidator] = React.useState<InvalidateSync>(new InvalidateSync(async () => {
        await client.refetchMessagesSearch(constructVariables(props.variables.query), { fetchPolicy: 'network-only' });
        await client.refetchGlobalSearch({ query: props.variables.query }, { fetchPolicy: 'network-only' });
    }));

    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const { setSelectionMode, handleMouseMove, handleMouseOver } = useListSelection({ selectedIndex, onItemHover: setSelectedIndex });

    const items = client.useGlobalSearch({ query: props.variables.query }, { fetchPolicy: 'cache-and-network' }).items;
    const initialData = client.useMessagesSearch(constructVariables(props.variables.query), { fetchPolicy: 'cache-and-network' }).messagesSearch;

    const initialCursor = getCursor(initialData);

    const [loadingMore, setLoadingMore] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [messages, setMessages] = React.useState(initialData.edges);

    React.useEffect(() => {
        messagesInvalidator.invalidate();
    }, [props.variables.query]);

    const resultsLength = items.length + messages.length;

    const handleOptionUp = () => {
        setSelectionMode('keyboard');
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex - 1, 0), resultsLength - 1));

        return;
    };

    const handleOptionDown = () => {
        setSelectionMode('keyboard');
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex + 1, 0), resultsLength - 1));

        return;
    };

    useShortcuts([
        { keys: ['ArrowUp'], callback: handleOptionUp },
        { keys: ['ArrowDown'], callback: handleOptionDown },
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
        if (loadingMore || !after) {
            return;
        }

        setLoadingMore(true);

        const loaded = (await client.queryMessagesSearch(constructVariables(props.variables.query, after))).messagesSearch;
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
        return <DialogSearchEmptyView />;
    }

    return (
        <XScrollView3 onScroll={onScroll} flexGrow={1} flexShrink={1} useDefaultScroll={true}>
            {items.map((i, index) => <DialogSearchItemRender key={'item-' + i.id} item={i} index={index} onMouseOver={handleMouseOver} onMouseMove={handleMouseMove} selectedIndex={selectedIndex} {...props} />)}
            {messages.length > 0 && (
                <XView height={1} alignSelf="stretch" backgroundColor="#ececec" />
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
                        onMouseOver={() => handleMouseOver(index + items.length)}
                        onMouseMove={() => handleMouseMove(index + items.length)}
                        hovered={index === (selectedIndex - items.length)}
                        selected={selected}
                        onPress={() => props.onMessagePick(message.id)}
                        disableHover={true}
                    />
                );
            })}
            <XView height={56} alignItems="center" justifyContent="center">
                {loadingMore && <XLoader loading={true} />}
            </XView>
        </XScrollView3>
    );
});

export const DialogSearchMessages = React.memo((props: DialogSearchMessagesProps) => (
    <React.Suspense fallback={<XLoader loading={true} />}>
        <DialogSearchMessagesInner key={props.variables.query} {...props} />
    </React.Suspense>
));
