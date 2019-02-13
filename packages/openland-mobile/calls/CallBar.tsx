import * as React from 'react';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { View, TouchableOpacity, Text } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useWatchCall } from './useWatchCall';
import { XMemo } from 'openland-y-utils/XMemo';

export const CallBarComponent = XMemo<{ id: string }>((props) => {
    let conference = getClient().useWithoutLoaderConference({ id: props.id })

    useWatchCall(conference && conference.conference.id);
    
    if (conference && conference.conference && conference.conference.peers.length > 0) {
        return (
            <View alignSelf="stretch" alignItems="center" justifyContent="center" height={56} backgroundColor="green" flexDirection="row">
                <SRouterContext.Consumer>
                    {r => (
                        <TouchableOpacity
                            onPress={() => r!!.present('Call', { id: props.id })}
                            style={{ height: 48, paddingHorizontal: 16, marginHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 24, alignItems: 'center' }}
                            delayPressIn={0}
                        >
                            <Text style={{ fontSize: 18, color: '#fff' }} >Join</Text>
                        </TouchableOpacity>
                    )}
                </SRouterContext.Consumer>
            </View>
        );
    }
    return null;
});