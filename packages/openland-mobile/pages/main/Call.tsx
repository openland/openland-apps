import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
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
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { RNSDevice } from 'react-native-s/RNSDevice';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { CallStatus } from 'openland-engines/CallsEngine';
import { formatTimerTime } from 'openland-y-utils/formatTime';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { useWatchCall } from 'openland-mobile/calls/useWatchCall';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

let Content = XMemo<{ id: string, hide: () => void }>((props) => {
    let theme = React.useContext(ThemeContext);
    let [mute, setMute] = React.useState(false);
    let [speaker, setSpeaker] = React.useState(false);
    let [status, setStatus] = React.useState<CallStatus>('initial');
    let [timer, setTimer] = React.useState(0);
    let [initialTime, setInitialTime] = React.useState(0);
    let room = getClient().useRoomTiny({ id: props.id }).room!!;

    let title = room.__typename === 'PrivateRoom' ? room.user.name : room.title;
    let photo = room.__typename === 'PrivateRoom' ? room.user.photo : room.photo;
    let placeholderKey = room.id;

    React.useLayoutEffect(() => {
        SStatusBar.setBarStyle('light-content');
        InCallManager.start({ media: 'audio' });
        RNSDevice.proximityEnable();
        return () => {
            RNSDevice.proximityDisable();
            SStatusBar.setBarStyle(theme.statusBar);

        };
    }, []);

    React.useLayoutEffect(() => {
        InCallManager.setForceSpeakerphoneOn(speaker);
    }, [speaker]);

    let calls = getMessenger().engine.calls;
    let callsState = calls.useState();

    let conference = getClient().useWithoutLoaderConference({ id: props.id });
    useWatchCall(conference && conference.conference.id);

    let onCallEnd = React.useCallback(() => {
        InCallManager.stop({ busytone: '_BUNDLE_' });
        calls.leaveCall();
        setStatus('end');

        setTimeout(() => {
            SStatusBar.setBarStyle(theme.statusBar);
            props.hide();
        }, 2000);
    }, []);

    React.useEffect(() => {
        if (callsState.status === 'connected') {
            if (callsState.private) {
                setInitialTime(new Date().getTime());
            } else if (callsState.startTime) {
                setInitialTime(callsState.startTime);
            }
            setStatus('connected');
            ReactNativeHapticFeedback.trigger('impactMedium', { ignoreAndroidSystemSettings: false });
        } else if (callsState.status === 'end') {
            onCallEnd();
        } else if (callsState.status === 'waiting') {
            setStatus('waiting');
        }

    }, [callsState.status]);

    React.useEffect(() => {
        if (status === 'connected') {
            setTimeout(() => {
                setTimer(initialTime ? Date.now() - initialTime : 0);
            }, 100);
        }

    }, [timer, initialTime, status]);

    return (
        <ASSafeAreaView flexDirection="column" alignItems="stretch" flexGrow={1}>
            <View alignItems="center" justifyContent="center" flexDirection="column">
                <View marginTop={67} flexDirection="row" borderWidth={10} borderRadius={120} borderColor="rgba(0, 0, 0, 0.05)">
                    <ZAvatar size="xx-large" placeholderKey={placeholderKey} placeholderTitle={title} src={photo} />
                </View>
                <Text
                    style={{ fontSize: 28, fontWeight: FontStyles.Weight.Medium, color: 'white', textAlign: 'center', marginTop: 25 }}
                    numberOfLines={4}
                >
                    {title}
                </Text>
                <Text
                    style={{ fontSize: 16, color: 'white', textAlign: 'center', marginTop: 8, opacity: 0.8 }}
                >
                    {
                        status === 'end' ? 'Call ended ' :
                            status === 'waiting' ? 'Waiting...' :
                                status === 'connected' ? '' : 'Connecting...'
                    }
                    {['connected', 'end'].includes(status) ? formatTimerTime(timer) : ''}
                </Text>
            </View>

            {room.__typename === 'SharedRoom' && <View flexDirection="row" alignItems="center" flexWrap="wrap" marginHorizontal={18} marginTop={40}>
                {conference && conference.conference.peers.map(p => {
                    return <View key={p.id} margin={10}>
                        <ZAvatar size="medium" placeholderKey={p.id} placeholderTitle={p.user.name} src={p.user.photo} />
                    </View>;

                })}
            </View>}

            <View flexGrow={1} />
            <View justifyContent="center" alignItems="center" marginBottom={56} flexDirection="row">

                <TouchableOpacity
                    onPress={() => {
                        // if (theme.blurType === 'light') {
                        //     SStatusBar.setBarStyle('dark-content');
                        // }
                        // props.hide();
                        setSpeaker((s) => !s);
                    }}
                    style={{ width: 56, height: 56, marginRight: 45 }}
                >
                    <View backgroundColor={speaker ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-speaker-30.png')} style={{ tintColor: speaker ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onCallEnd}
                    style={{ width: 70, height: 70 }}
                >
                    <View backgroundColor="#f6564e" width={70} height={70} borderRadius={35} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-call-end-36.png')} style={{ tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setMute((s) => !s);
                    }}
                    style={{ width: 56, height: 56, marginLeft: 45 }}
                >
                    <View backgroundColor={mute ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={mute ? require('assets/ic-mic-off-30.png') : require('assets/ic-mic-on-30.png')} style={{ tintColor: mute ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>
            </View>
            <CallController id={props.id} mute={mute} isPrivate={room.__typename === 'PrivateRoom'} />
            {/* <View flexDirection="row" paddingHorizontal={16} paddingVertical={16}>
                {conference.peers.map((v) => (<View><Text>{v.user.name}</Text></View>))}
            </View> */}
        </ASSafeAreaView>
    );
});

class CallContainer extends React.Component<{ id: string, modal: ZModalController }> {

    private key = randomKey();
    private ended = false;
    private container = new SAnimatedShadowView(this.key + '--bg', { opacity: 0 });

    componentDidMount() {
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
                    <React.Suspense fallback={<ZLoader />}>
                        <Content id={this.props.id} hide={this.hide} />
                    </React.Suspense>
                </LinearGradient>
            </SAnimated.View>
        );
    }
}

export function showCallModal(id: string) {

    (async () => {
        if (await checkPermissions('microphone')) {
            showModal((ctx) => {
                return (
                    <CallContainer id={id} modal={ctx} />
                );
            });
        }

    })();

}