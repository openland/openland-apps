import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { View, Text } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASView } from 'react-native-async-view/ASView';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { AsyncMessageContentView, extractContent } from 'openland-mobile/messenger/components/AsyncMessageContentView';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { UserView } from './components/UserView';
import { formatDate } from 'openland-mobile/utils/formatDate';

const PinnedMessageComponent = XMemo<PageProps>((props) => {
    let id = props.router.params.flexibleId || props.router.params.id;
    let messenger = getMessenger();
    let engine = messenger.engine.getConversation(id);

    let room = getClient().useRoomTiny({ id });
    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room! as Room_room_SharedRoom : null;

    let message;
    if (sharedRoom && sharedRoom.pinnedMessage) {
        message = convertMessage(sharedRoom.pinnedMessage as any, room.room!.id, messenger.engine)
        message.isOut = false;
        message.attachTop = true;
    }

    let { topContnet, bottomContent } = extractContent({ message: message as any, engine, onDocumentPress: messenger.handleDocumentClick, onMediaPress: messenger.handleMediaClick, onUserPress: messenger.handleAvatarClick })
    return (
        <>
            <SHeader title="Pinned message" />
            <SScrollView>
                {sharedRoom && sharedRoom.pinnedMessage && <UserView subtitle={formatDate((message as any).date)} user={sharedRoom.pinnedMessage.sender as any} onPress={() => false} />}
                {message &&
                    <ASView style={{ width: '100%', height: '100%', marginLeft: 16, marginRight: 16 }}>
                        <ASFlex flexGrow={1} flexDirection="column">
                            {topContnet}
                            {bottomContent}
                        </ASFlex>
                    </ASView>}
            </SScrollView>
        </>
    );
});

export const PinnedMessage = withApp(PinnedMessageComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: false });
