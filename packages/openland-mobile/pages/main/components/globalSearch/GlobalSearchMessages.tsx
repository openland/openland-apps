import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';
import { ASView } from 'react-native-async-view/ASView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { ASFlex } from 'react-native-async-view/ASFlex';

interface GlobalSearchMessagesProps {
    query: string;
    onPress: (id: string) => void;
}

export const GlobalSearchMessages = (props: GlobalSearchMessagesProps) => {
    const messenger = getMessenger();
    const client = useClient();
    const messages = client.useMessagesSearch(
        {
            query: JSON.stringify({
                $and: [{ text: props.query }, { isService: false }],
            }),
            sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
            first: 30,
        },
        {
            fetchPolicy: 'network-only',
        },
    ).messagesSearch.edges;

    console.log('boom', messages);

    return (
        <>
            {messages.length > 0 && (
                <>
                    <ZListHeader text="Messages" />
                    <ASView style={{ height: 80 * messages.length }}>
                        <ASFlex flexDirection="column" flexGrow={1} alignItems="stretch">
                            {messages.map(i => {
                                const { message, chat } = i.node;
                                const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
                                const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;

                                return (
                                    <DialogItemViewAsync
                                        key={'msg' + message.id}
                                        item={{
                                            message: message.message || undefined,
                                            title,
                                            key: chat.id,
                                            flexibleId: chat.id,
                                            kind: chat.__typename === 'PrivateRoom' ? 'PRIVATE' : 'GROUP',
                                            unread: 0,
                                            fallback: message.fallback,
                                            date: parseInt(message.date, 10),
                                            photo: photo || undefined,
                                            isService: false,
                                            isOut: message.sender.id === messenger.engine.user.id,
                                            isMuted: !!chat.settings.mute,
                                            sender: message.sender.name,
                                            membership: chat.__typename === 'SharedRoom' ? chat.membership : 'NONE'
                                        }}
                                        showDiscover={() => false}
                                        onPress={() => props.onPress(message.id)}
                                    />
                                );
                            })}
                        </ASFlex>
                    </ASView>
                </>
            )}
        </>
    );
};