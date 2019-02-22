import * as React from 'react';
import { PageProps } from "openland-mobile/components/PageProps";
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { useWatchCall } from 'openland-mobile/calls/useWatchCall';
import { CallController } from 'openland-mobile/calls/CallController';
import { XMemo } from 'openland-y-utils/XMemo';
import { SRouter } from 'react-native-s/SRouter';
import { SStatusBar } from 'react-native-s/SStatusBar';

let Content = XMemo<{ id: string, router: SRouter }>((props) => {
    let room = getClient().useRoomTiny({ id: props.id }).room!!;
    let conference = getClient().useConference({ id: props.id }).conference!!
    useWatchCall(conference && conference.id);

    let title = room.__typename === 'PrivateRoom' ? room.user.name : room.title;
    let placeholderKey = room.id

    React.useEffect(() => {
        SStatusBar.setBarStyle('light-content');
        return () => {
            SStatusBar.setBarStyle('dark-content');
        }
    }, []);

    return (
        <ASSafeAreaView flexDirection="column" alignItems="stretch" flexGrow={1}>
            <View alignItems="center" justifyContent="center" paddingTop={40} paddingHorizontal={16}>
                {/* <ZAvatar size={80} placeholderKey={placeholderKey} placeholderTitle={title} /> */}
                {/* <View style={{ marginLeft: 16 }}>
                    <Text style={{ fontSize: 32, height: 36, color: 'white' }} numberOfLines={1}>{title}</Text>
                </View> */}
                <Text style={{ fontSize: 28, height: 34, color: 'white' }} numberOfLines={1}>{title}</Text>
            </View>
            <View flexGrow={1} />
            <View justifyContent="center" alignItems="center" marginBottom={56}>
                <TouchableOpacity
                    onPress={() => {
                        SStatusBar.setBarStyle('dark-content');
                        props.router.dismiss();
                    }}
                    style={{ width: 70, height: 70 }}
                >
                    <View backgroundColor="#f6564e" width={70} height={70} borderRadius={35} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-call-end-36.png')} style={{ tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>
            </View>
            <CallController id={conference.id} conference={conference} />
            {/* <View flexDirection="row" paddingHorizontal={16} paddingVertical={16}>
                {conference.peers.map((v) => (<View><Text>{v.user.name}</Text></View>))}
            </View> */}
        </ASSafeAreaView>
    )
});

const CallComponent = XMemo<PageProps>((props) => {

    let conf = props.router.params.id as string

    return (
        <View backgroundColor="#2a4763" flexGrow={1} flexDirection="column">
            <SHeader hidden={true} />
            <Content id={conf} router={props.router} />
        </View>
    )
});

export const Call = withApp(CallComponent);