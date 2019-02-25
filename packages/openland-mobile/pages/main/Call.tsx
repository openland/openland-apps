import * as React from 'react';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { View, Text, TouchableOpacity, Image, BackHandler, Platform } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { useWatchCall } from 'openland-mobile/calls/useWatchCall';
import { CallController } from 'openland-mobile/calls/CallController';
import { XMemo } from 'openland-y-utils/XMemo';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ZModalController, showModal } from 'openland-mobile/components/ZModal';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import LinearGradient from 'react-native-linear-gradient';
import InCallManager from 'react-native-incall-manager';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';

let Content = XMemo<{ id: string, hide: () => void }>((props) => {
    let room = getClient().useRoomTiny({ id: props.id }).room!!;
    let conference = getClient().useConference({ id: props.id }).conference!!
    useWatchCall(conference && conference.id);

    let title = room.__typename === 'PrivateRoom' ? room.user.name : room.title;
    let placeholderKey = room.id

    React.useLayoutEffect(() => {
        SStatusBar.setBarStyle('light-content');
        InCallManager.start({ media: 'audio' });
        return () => {
            InCallManager.stop();
            SStatusBar.setBarStyle('dark-content');
        }
    }, []);

    return (
        <ASSafeAreaView flexDirection="column" alignItems="stretch" flexGrow={1}>
            <View alignItems="center" justifyContent="center" paddingTop={82} paddingHorizontal={16}>
                {/* <ZAvatar size={80} placeholderKey={placeholderKey} placeholderTitle={title} /> */}
                {/* <View style={{ marginLeft: 16 }}>
                    <Text style={{ fontSize: 32, height: 36, color: 'white' }} numberOfLines={1}>{title}</Text>
                </View> */}
                <Text style={{ fontSize: 28, height: 34, fontWeight: '600', color: 'white' }} numberOfLines={1}>{title}</Text>
            </View>
            <View flexGrow={1} />
            <View justifyContent="center" alignItems="center" marginBottom={56}>
                <TouchableOpacity
                    onPress={() => {
                        SStatusBar.setBarStyle('dark-content');
                        props.hide();
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

class CallContainer extends React.Component<{ id: string, modal: ZModalController }> {

    private key = randomKey();
    private ended = false;
    private container = new SAnimatedShadowView(this.key + '--bg', { opacity: 0 })

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        SAnimated.beginTransaction();
        SAnimated.setDefaultPropertyAnimator();
        this.container.opacity = 1;
        SAnimated.commitTransaction();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.ended) {
            return false;
        }
        this.hide();
        return true;
    }

    hide = () => {
        if (this.ended) {
            return;
        }
        this.ended = true;

        SAnimated.beginTransaction();
        SAnimated.setDefaultPropertyAnimator();
        this.container.opacity = 0;
        SAnimated.commitTransaction(() => { this.props.modal.hide(); });
    }

    render() {
        return (
            <SAnimated.View
                name={this.key + '--bg'}
                style={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    opacity: 0
                }}
            >
                <LinearGradient colors={['#0084fe', '#004280']} style={{ flexGrow: 1, flexDirection: 'column' }}>
                    <React.Suspense fallback={<ZLoader transparent={true} />}>
                        <Content id={this.props.id} hide={this.hide} />
                    </React.Suspense>
                </LinearGradient>
            </SAnimated.View>
        )
    }
}

export function showCallModal(id: string) {
    showModal((ctx) => {
        return (
            <CallContainer id={id} modal={ctx} />
        )
    })
}