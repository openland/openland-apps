import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { View, Text, TouchableOpacity, Image, BackHandler, Dimensions, ScrollView } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { XMemo } from 'openland-y-utils/XMemo';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ZModalController, showModal } from 'openland-mobile/components/ZModal';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import LinearGradient from 'react-native-linear-gradient';
import InCallManager from 'react-native-incall-manager';
import { SAnimated } from 'react-native-fast-animations';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-fast-animations';
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
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { AppUserMediaStreamNative } from 'openland-y-runtime-native/AppUserMedia';
import { RTCView } from 'react-native-webrtc';
import { AppConfig } from 'openland-y-runtime-native/AppConfig';

const VideoView = React.memo((props: { peer: Conference_conference_peers, mediaSession: MediaSessionManager }) => {
    let [stream, setStream] = React.useState<string>();
    let streamManager = props.mediaSession.useStreamManager(props.peer.id);

    React.useEffect(() => {
        if (props.peer.user.isYou) {
            return props.mediaSession.listenOutVideo(s => {
                setStream((s as AppUserMediaStreamNative)?._stream.toURL());
            });
        } else {
            return streamManager?.listenContentStream(s => {
                if (s) {
                    setStream((s as AppUserMediaStreamNative)?._stream.toURL());
                }
            });
        }

    }, [streamManager]);
    let w = Dimensions.get('window').width / 2;
    return (
        <View width={w} height={w} backgroundColor="black">
            {stream && <RTCView streamURL={stream} style={{ flex: 1 }} objectFit="cover" />}
            <View position="absolute" left={6} bottom={6}>
                <ZAvatar size="medium" id={props.peer.user.id} title={props.peer.user.name} photo={props.peer.user.photo} />
            </View>
        </View>
    );
});

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

    let conference = getClient().useConference({ id: props.id }, { suspense: false });
    useWatchCall(conference && conference.conference.id);

    React.useEffect(() => {
        calls.joinCall(props.id, room.__typename === 'PrivateRoom');
        return InCallManager.stop;
    }, []);

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

    let mediaSession = calls.getMediaSession();

    return (
        <ASSafeAreaView flexDirection="column" alignItems="stretch" height="100%">
            <ScrollView >
                <View alignItems="center" justifyContent="center" flexDirection="column" marginBottom={40}>
                    <View marginTop={67} flexDirection="row" borderWidth={10} borderRadius={120} borderColor="rgba(0, 0, 0, 0.05)">
                        <ZAvatar size="xx-large" id={room.id} title={title} photo={photo} />
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

                {room.__typename === 'SharedRoom' &&
                    <View flexDirection="row" alignItems="center" flexWrap="wrap" marginHorizontal={callsState.videoEnabled ? 0 : 18}>
                        {conference && conference.conference.peers.map(p => {
                            return <View key={p.id} margin={callsState.videoEnabled ? 0 : 10} >
                                {(!callsState.videoEnabled || !mediaSession) ? <ZAvatar size="medium" id={p.user.id} title={p.user.name} photo={p.user.photo} /> :
                                    <VideoView peer={p} mediaSession={mediaSession} />
                                }
                            </View>;

                        })}
                        <View height={100} width={1} />
                    </View>
                }
            </ScrollView>

            <View justifyContent="space-around" alignItems="center" bottom={56} flexDirection="row" position="absolute" width="100%">

                {AppConfig.isNonProduction() && <TouchableOpacity
                    onPress={props.hide}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor="rgba(0,0,0,0.15)" width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-close-24.png')} style={{ tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>}

                <TouchableOpacity
                    onPress={() => {
                        setSpeaker((s) => !s);
                    }}
                    style={{ width: 56, height: 56 }}
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

                {AppConfig.isNonProduction() && <TouchableOpacity
                    onPress={() => {
                        calls.switchVideo();
                    }}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor={calls.state.outVideo ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={calls.state.outVideo ? require('assets/ic-camera-video-24.png') : require('assets/ic-camera-video-24.png')} style={{ tintColor: calls.state.outVideo ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>}

                <TouchableOpacity
                    onPress={() => {
                        setMute((s) => {
                            calls.setMute(!s);
                            return !s;
                        });
                    }}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor={mute ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={mute ? require('assets/ic-mic-off-30.png') : require('assets/ic-mic-on-30.png')} style={{ tintColor: mute ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>
            </View>
        </ASSafeAreaView>
    );
});

class CallContainer extends React.Component<{ id: string, modal: ZModalController }> {

    private key = randomKey();
    private ended = false;
    private container = new SAnimatedShadowView(this.key + '--bg', { opacity: 0 });

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