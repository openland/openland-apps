import * as React from 'react';
import Glamorous from 'glamorous';
import { XView, XViewRouterContext } from 'react-mental';
import { DialogViewCompact } from './DialogViewCompact';
import { XVertical } from 'openland-x-layout/XVertical';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { XShortcuts } from 'openland-x/XShortcuts';
import { GlobalSearch_items } from 'openland-api/Types';
import { DialogView } from './DialogView';
import { emoji } from '../../../../openland-y-utils/emoji';
import { extractPlaceholder } from '../../../../openland-y-utils/extractPlaceholder';
import { XWithRole } from 'openland-x-permissions/XWithRole';

const NoResultWrapper = Glamorous(XVertical)({
    marginTop: 34,
});

const Image = Glamorous.div({
    width: 178,
    height: 155,
    backgroundImage: "url('/static/X/messenger/channels-search-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
});

type DialogSearchResultsT = {
    onClick: () => void;
    onSelect?: () => void;
    variables: { query: string };
    onSearchItemPress?: (a: string) => void;
    onSearchItemSelected: (a: GlobalSearch_items) => void;
};

const DialogSearchResultsInner = (props: DialogSearchResultsT) => {
    let router = React.useContext(XViewRouterContext);

    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    const client = useClient();

    const data = client.useGlobalSearch(props.variables, {
        fetchPolicy: 'cache-and-network',
    });

    const messagesSearch = client.useMessagesSearch(
        {
            query: JSON.stringify({
                $and: [{ text: props.variables.query }, { isService: false }],
            }),
            sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
            first: 100,
        },
        {
            fetchPolicy: 'network-only',
        },
    );
    const messages = messagesSearch.messagesSearch.edges;
    const me = client.useAccount();

    if (!data || !data.items) {
        return <XLoader loading={true} />;
    }

    // Why?
    let items = data.items.reduce(
        (p, x) => {
            if (!p.find(c => c.id === x.id)) {
                p.push(x);
            }
            return p;
        },
        [] as any[],
    );

    const handleOptionUp = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex - 1, 0), items.length - 1));

        return;
    };

    const handleOptionDown = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex + 1, 0), items.length - 1));

        return;
    };

    React.useEffect(() => {
        if (selectedIndex !== null) {
            props.onSearchItemSelected(items[selectedIndex]);
            return;
        }
    }, [selectedIndex]);

    if (items.length === 0 && messages.length === 0) {
        return (
            <NoResultWrapper separator={10} alignItems="center">
                <Image />
                <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
            </NoResultWrapper>
        );
    }

    return (
        <XShortcuts
            supressOtherShortcuts
            handlerMap={{
                SHIFT_COMMAND_UP: handleOptionUp,
                SHIFT_COMMAND_DOWN: handleOptionDown,
            }}
            keymap={{}}
        >
            {items.map((i, index) => {
                let item;

                if (i.__typename === 'SharedRoom') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.title,
                        fallback: i.title,
                        photo: i.roomPhoto,
                        isChannel: i.isChannel,
                        unread: 0,
                    };
                } else if (i.__typename === 'Organization') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.name || '',
                        fallback: i.name || '',
                        photo: i.photo,
                        unread: 0,
                        isOrganization: true,
                    };
                } else if (i.__typename === 'User') {
                    item = {
                        key: i.id,
                        flexibleId: i.id,
                        kind: i.kind,
                        title: i.name || '',
                        fallback: i.name || '',
                        photo: i.photo,
                        unread: 0,
                    };
                } else {
                    return null;
                }

                return (
                    <DialogViewCompact
                        selected={selectedIndex === index}
                        key={i.id}
                        onSelect={props.onSelect}
                        onClick={() => props.onSearchItemPress ? props.onSearchItemPress(i.id) : props.onClick}
                        item={item}
                    />
                );
            })}
            <XWithRole role="feature-non-production">
                {messages.length > 0 && (
                    <XView height={1} alignSelf="stretch" backgroundColor="#ececec" />
                )}
                {messages.map(i => {
                    const { message, chat } = i.node;
                    const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
                    const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;

                    const emojifyText = (msg: string) => emoji(msg);

                    return (
                        <DialogView
                            item={{
                                titleEmojify: emoji(title),
                                titlePlaceholderEmojify: emoji(extractPlaceholder(title)),
                                senderEmojify: message.sender && emojifyText(message.sender.name),
                                messageEmojify: message.message && emojifyText(message.message),
                                message: message.message || undefined,
                                title,
                                key: chat.id,
                                flexibleId: chat.id,
                                kind: chat.__typename === 'PrivateRoom' ? 'PRIVATE' : 'GROUP',
                                unread: 0,
                                fallback: message.fallback,
                                date: message.date,
                                photo: photo || undefined,
                                attachments:
                                    message.__typename === 'GeneralMessage'
                                        ? message.attachments
                                        : undefined,
                                isService: false,
                                isOut: me.me ? message.sender.id === me.me.id : false,
                                sender: message.sender.name,
                            }}
                            key={message.id}
                            onPress={() => props.onSearchItemPress ? props.onSearchItemPress(chat.id) : router!.navigate(`/mail/${chat.id}`)}
                        />
                    );
                })}
            </XWithRole>
        </XShortcuts>
    );
};

export const DialogSearchResults = (props: DialogSearchResultsT) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <DialogSearchResultsInner {...props} />
        </React.Suspense>
    );
};
