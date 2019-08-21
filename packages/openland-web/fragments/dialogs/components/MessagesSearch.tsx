import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { DialogView } from './DialogView';
import { emoji } from '../../../../openland-y-utils/emoji';
import { extractPlaceholder } from '../../../../openland-y-utils/extractPlaceholder';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface MessagesSearchProps {
    variables: { query: string };
    onPick: (chatId: string) => void;
}

const MessagesSearchInner = (props: MessagesSearchProps) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const messages = client.useMessagesSearch(
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
    ).messagesSearch.edges;

    return (
        <>
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
                            attachments:
                                message.__typename === 'GeneralMessage'
                                    ? message.attachments
                                    : undefined,
                            isService: false,
                            isOut: message.sender.id === messenger.user.id,
                            sender: message.sender.name,
                        }}
                        key={message.id}
                        onPress={props.onPick}
                    />
                );
            })}
        </>
    );
};

export const MessagesSearch = (props: MessagesSearchProps) => {
    return (
        <XView position="relative" minHeight={50}>
            <React.Suspense fallback={<XLoader loading={true} />}>
                <MessagesSearchInner {...props} />
            </React.Suspense>
        </XView>
    );
};
