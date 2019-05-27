import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useWatchCall } from './useWatchCall';
import { XMemo } from 'openland-y-utils/XMemo';
import { showCallModal } from 'openland-mobile/pages/main/Call';

export const CallBarComponent = XMemo<{ id: string }>((props) => {
    let conference = getClient().useWithoutLoaderConference({ id: props.id })

    useWatchCall(conference && conference.conference.id);

    if (conference && conference.conference && conference.conference.peers.length > 0) {
        return (
            <View
                alignSelf="stretch"
                alignItems="center"
                height={40}
                marginHorizontal={10}
                marginTop={10}
                borderRadius={20}
                backgroundColor="#0084fe"
                flexDirection="row"
                shadowOpacity={0.2}
                shadowColor="black"
                shadowRadius={6}
                shadowOffset={{ width: 0, height: 4 }}
                elevation={4}
            >
                <View flexGrow={1} marginLeft={16} height={20}>
                    <Text style={{ fontSize: 16, fontWeight: Platform.OS === 'android' ? '500' : '600', color: '#fff' }} >Call in progress</Text>
                </View>
                <SRouterContext.Consumer>
                    {r => (
                        <TouchableOpacity
                            activeOpacity={0.3}
                            onPress={() => showCallModal(props.id)}
                            style={{ height: 28, paddingHorizontal: 12, marginHorizontal: 7, backgroundColor: 'white', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}
                            delayPressIn={0}
                        >
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#0084fe' }} >JOIN</Text>
                        </TouchableOpacity>
                    )}
                </SRouterContext.Consumer>
            </View>
        );
    }
    return null;
});