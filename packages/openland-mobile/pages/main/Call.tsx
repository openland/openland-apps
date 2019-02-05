import * as React from 'react';
import { PageProps } from "openland-mobile/components/PageProps";
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { View, Text } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { useWatchCall } from 'openland-mobile/calls/useWatchCall';
import { CallController } from 'openland-mobile/calls/CallController';

let Content = React.memo<{ id: string }>((props) => {
    let room = getClient().useRoomTiny({ id: props.id }).room!!;
    let conference = getClient().useConference({ id: props.id }).conference!!
    useWatchCall(conference && conference.id);

    let title = room.__typename === 'PrivateRoom' ? room.user.name : room.title;
    let placeholderKey = room.id

    return (
        <ASSafeAreaView flexDirection="column" alignItems="stretch" flexGrow={1}>
            <View flexDirection="row" alignItems="center" paddingVertical={16} paddingHorizontal={16}>
                <ZAvatar size={80} placeholderKey={placeholderKey} placeholderTitle={title} />
                <View style={{ marginLeft: 16 }}>
                    <Text style={{ fontSize: 32, height: 36 }} numberOfLines={1}>{title}</Text>
                </View>
            </View>
            <CallController id={conference.id} conference={conference} />
            {/* <View flexDirection="row" paddingHorizontal={16} paddingVertical={16}>
                {conference.peers.map((v) => (<View><Text>{v.user.name}</Text></View>))}
            </View> */}
        </ASSafeAreaView>
    )
});

const CallComponent = React.memo<PageProps>((props) => {

    let conf = props.router.params.id as string

    return (
        <>
            <SHeader title="Call" hairline="hidden" />
            <Content id={conf} />
        </>
    )
});

export const Call = withApp(CallComponent);