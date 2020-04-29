import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { BackHandler } from 'react-native';
// import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { XMemo } from 'openland-y-utils/XMemo';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ZModalController, showModal } from 'openland-mobile/components/ZModal';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import LinearGradient from 'react-native-linear-gradient';
import InCallManager from 'react-native-incall-manager';
import { SAnimated } from 'react-native-fast-animations';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-fast-animations';
// import { ZAvatar, getPlaceholderColors } from 'openland-mobile/components/ZAvatar';
import { RNSDevice } from 'react-native-s/RNSDevice';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
// import { CallsEngine } from 'openland-engines/CallsEngine';
// import { formatTimerTime } from 'openland-y-utils/formatTime';
// import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { useWatchCall } from 'openland-mobile/calls/useWatchCall';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
// import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
// import { Conference_conference_peers } from 'openland-api/spacex.types';
// import { RTCView, MediaStreamTrack, MediaStream } from 'react-native-webrtc';
// import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
// import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
// import { AppUserMediaStreamTrackNative } from 'openland-y-runtime-native/AppUserMedia';

// const VideoView = React.memo((props: { peer: Conference_conference_peers, mediaSession: MediaSessionManager, calls: CallsEngine, h: number, mirror?: boolean }) => {
//     let [mainStream, setMainStream] = React.useState<AppMediaStreamTrack>();
//     // @ts-ignore
//     let [miniStream, setMiniStream] = React.useState<AppMediaStream>();
//     const [videoPaused, setVideoPaused] = React.useState<boolean | null>(true);

//     // const [localPeer, setLocalPeer] = React.useState(props.mediaSession.getPeerId());
//     // let isLocal = props.peer.id === props.mediaSession.getPeerId();
//     // React.useEffect(() => {
//     //     // mediaSession initiating without peerId. Like waaat
//     //     let d0 = props.calls.listenState(() => setLocalPeer(props.mediaSession.getPeerId()));
//     //     let d1: () => void;
//     //     let d2: (() => void) | undefined;
//     //     if (isLocal) {
//     //         d1 = props.mediaSession.outVideoVM.listen(streams => {
//     //             let cam = streams[0];
//     //             let screen = streams[1];
//     //             setMainStream(screen ? screen : cam);
//     //             setMiniStream(screen ? cam : undefined);
//     //             setVideoPaused(!cam?.enabled);
//     //         });
//     //     } else {
//     //         d1 = props.mediaSession.peerVideoVM.listen(props.peer.id, streams => {
//     //             let cam = streams[0];
//     //             let screen = streams[1];
//     //             setMainStream(screen ? screen : cam);
//     //             setMiniStream(screen ? cam : undefined);
//     //         });
//     //         d2 = props.mediaSession.peerStreamMediaStateVM.listen(props.peer.id, s => {
//     //             let camState = [...s.values()].find(c => c.videoSource === MediaStreamVideoSource.camera);
//     //             if (camState) {
//     //                 setVideoPaused(camState.videoPaused);
//     //             }
//     //         });
//     //     }
//     //     return () => {
//     //         d0();
//     //         d1();
//     //         if (d2) {
//     //             d2();
//     //         }
//     //     };
//     // }, [localPeer]);
//     let colors = getPlaceholderColors(props.peer.user.id);
//     let track: MediaStreamTrack | null = null;
//     if (!videoPaused || mainStream) {
//         track = (mainStream as AppUserMediaStreamTrackNative).track;
//     }
//     const stream = React.useMemo(() => {
//         if (track) {
//             let res = new MediaStream(undefined);
//             res.addTrack(track);
//             return res;
//         } else {
//             return null;
//         }
//     }, [track]);
//     // let mainStreamNative = (!videoPaused || mainStream?.source === 'screen_share') && (mainStream as AppUserMediaStreamNative | undefined)?._stream;
//     // @ts-ignore
//     // let miniStreamNative = (mainStream as AppUserMediaStreamNative | undefined)?._stream;
//     return (
//         <View flexGrow={1} height={props.h} backgroundColor="gray">
//             {stream && <RTCView streamURL={stream.toURL()} style={{ flexGrow: 1 }} objectFit="cover" mirror={props.mirror} />}
//             {stream && <View position="absolute" left={6} top={6}>
//                 <ZAvatar size="medium" id={props.peer.user.id} title={props.peer.user.name} photo={props.peer.user.photo} />
//             </View>}
//             {!stream &&
//                 <ZLinearGradient
//                     flexGrow={1}
//                     alignSelf="stretch"
//                     fallbackColor={colors.placeholderColor}
//                     colors={[colors.placeholderColorStart, colors.placeholderColorEnd]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                 >
//                     <View alignSelf="stretch" flexGrow={1} justifyContent="center" alignItems="center">
//                         <ZAvatar size="x-large" id={props.peer.user.id} title={props.peer.user.name} photo={props.peer.user.photo} />
//                     </View>

//                 </ZLinearGradient>
//             }
//         </View>
//     );
// });

let Content = XMemo<{ id: string, hide: () => void }>((props) => {
    let theme = React.useContext(ThemeContext);
    // let [mute, setMute] = React.useState(false);
    let [speaker] = React.useState(false);
    // let [status, setStatus] = React.useState<CallStatus>('initial');
    let [timer, setTimer] = React.useState(0);
    let [initialTime] = React.useState(0);
    // let room = getClient().useRoomTiny({ id: props.id }).room!!;

    // let title = room.__typename === 'PrivateRoom' ? room.user.name : room.title;
    // let photo = room.__typename === 'PrivateRoom' ? room.user.photo : room.photo;

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
    // let callState = calls.useState();

    let conference = getClient().useConference({ id: props.id }, { suspense: false });
    useWatchCall(conference && conference.conference.id);

    React.useEffect(() => {
        calls.joinCall(props.id);
    }, []);

    // let onCallEnd = React.useCallback(() => {
    //     InCallManager.stop({ busytone: '_BUNDLE_' });
    //     calls.leaveCall();
    //     setStatus('end');

    //     setTimeout(() => {
    //         SStatusBar.setBarStyle(theme.statusBar);
    //         props.hide();
    //     }, 2000);
    // }, []);

    // React.useEffect(() => {

    //     if (callState.status === 'connected') {
    //         if (callState.private) {
    //             setInitialTime(new Date().getTime());
    //         } else if (callState.startTime) {
    //             setInitialTime(callState.startTime);
    //         }
    //         setStatus('connected');
    //         ReactNativeHapticFeedback.trigger('impactMedium', { ignoreAndroidSystemSettings: false });
    //     } else if (callState.status === 'end') {
    //         onCallEnd();
    //     } else if (callState.status === 'waiting') {
    //         setStatus('waiting');
    //     }

    // }, [callState.status]);

    React.useEffect(() => {
        if (status === 'connected') {
            setTimeout(() => {
                setTimer(initialTime ? Date.now() - initialTime : 0);
            }, 100);
        }

    }, [timer, initialTime, status]);

    // layout video order
    // let peers = conference ? conference.conference.peers : [];
    // let peerSlice = peers.reduce((all, peer, i, array) => {
    //     let index =
    //         i === 1 ? 0
    //             : i === 2 && array.length > 3 ? 1
    //                 : i % 2;
    //     all[index].push(peer);
    //     return all;
    // }, [[], []] as Conference_conference_peers[][]);
    // let w = Dimensions.get('screen').width;
    // let h = Dimensions.get('screen').height;
    // let h1 = h / peerSlice[0].length;
    // let h2 = h / peerSlice[1].length;

    // let mediaSession = calls.getMediaSession();
    // let videoEnabled = !!(callState.videoEnabled && mediaSession);

    // animate controls hide/show
    const [uiHidden] = React.useState(false);
    const uiHiddenRef = React.useRef(false);
    // let switchUi = React.useCallback(() => setHideUi(v => !v), []);
    const key = React.useMemo(() => randomKey(), []);
    React.useEffect(() => {
        if (uiHiddenRef.current === uiHidden) {
            return;
        }
        uiHiddenRef.current = uiHidden;
        SAnimated.beginTransaction();
        if (uiHidden) {
            SAnimated.timing(`call-controls-${key}`, { property: 'translateY', easing: { bezier: [0.23, 1, 0.32, 1] }, from: 0, to: 150, duration: 0.15 });
        } else {
            SAnimated.timing(`call-controls-${key}`, { property: 'translateY', easing: 'material', from: 150, to: 0, duration: 0.25 });
        }
        SAnimated.commitTransaction();
    }, [uiHidden]);

    // const [mirrorSelf, setMirrorSelf] = React.useState(true);

    return (
        // <TouchableOpacity delayPressIn={10} delayPressOut={10} activeOpacity={1} onPress={switchUi}>
        //     {Platform.OS === 'ios' && <StatusBar hidden={!!videoEnabled} />}
        //     {videoEnabled ?
        //         <View flexDirection="row" alignItems="flex-start" width={w}>
        //             <View flexDirection="column" justifyContent="flex-start" flexGrow={1}>{peerSlice[0].map(p => <VideoView key={p.id} peer={p} mediaSession={mediaSession!} calls={calls} h={h1} mirror={p.id === mediaSession?.getPeerId() && mirrorSelf} />)}</View>
        //             <View flexDirection="column" justifyContent="flex-start" flexGrow={peerSlice[1].length ? 1 : 0}>{peerSlice[1].map(p => <VideoView key={p.id} peer={p} mediaSession={mediaSession!} calls={calls} h={h2} mirror={p.id === mediaSession?.getPeerId() && mirrorSelf} />)}</View>
        //         </View> :

        //         <ASSafeAreaView flexDirection="column" alignItems="stretch" height="100%">
        //             {!videoEnabled && <View alignItems="center" justifyContent="center" flexDirection="column" marginBottom={40}>
        //                 <View marginTop={67} flexDirection="row" borderWidth={10} borderRadius={120} borderColor="rgba(0, 0, 0, 0.05)">
        //                     <ZAvatar size="xx-large" id={room.id} title={title} photo={photo} />
        //                 </View>
        //                 <Text
        //                     style={{ fontSize: 28, fontWeight: FontStyles.Weight.Medium, color: 'white', textAlign: 'center', marginTop: 25 }}
        //                     numberOfLines={4}
        //                 >
        //                     {title}
        //                 </Text>
        //                 <Text
        //                     style={{ fontSize: 16, color: 'white', textAlign: 'center', marginTop: 8, opacity: 0.8 }}
        //                 >
        //                     {
        //                         status === 'end' ? 'Call ended ' :
        //                             status === 'waiting' ? 'Waiting...' :
        //                                 status === 'connected' ? '' : 'Connecting...'
        //                     }
        //                     {['connected', 'end'].includes(status) ? formatTimerTime(timer) : ''}
        //                 </Text>
        //             </View>}

        //             {room.__typename === 'SharedRoom' &&
        //                 <View flexDirection="row" alignItems="center" flexWrap="wrap" marginHorizontal={18}>
        //                     {conference && conference.conference.peers.map(p => {
        //                         return <View key={p.id} margin={10} >
        //                             <ZAvatar size="medium" id={p.user.id} title={p.user.name} photo={p.user.photo} />
        //                         </View>;

        //                     })}
        //                     <View height={100} width={1} />
        //                 </View>
        //             }
        //         </ASSafeAreaView>}

        //     <SAnimated.View name={`call-controls-${key}`} style={{ justifyContent: 'space-around', alignItems: 'center', bottom: 56, flexDirection: 'row', position: 'absolute', width: '100%' }}>
        //         <TouchableOpacity
        //             onPress={props.hide}
        //             style={{ width: 56, height: 56 }}
        //         >
        //             <View backgroundColor="rgba(0,0,0,0.15)" width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
        //                 <Image source={require('assets/ic-close-24.png')} style={{ tintColor: 'white' }} />
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={() => {
        //                 setSpeaker((s) => !s);
        //             }}
        //             style={{ width: 56, height: 56 }}
        //         >
        //             <View backgroundColor={speaker ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
        //                 <Image source={require('assets/ic-speaker-30.png')} style={{ tintColor: speaker ? 'black' : 'white' }} />
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={onCallEnd}
        //             style={{ width: 70, height: 70 }}
        //         >
        //             <View backgroundColor="#f6564e" width={70} height={70} borderRadius={35} alignItems="center" justifyContent="center">
        //                 <Image source={require('assets/ic-call-end-36.png')} style={{ tintColor: 'white' }} />
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={() => {
        //                 calls.switchVideo();
        //             }}
        //             onLongPress={() => {
        //                 if (callState.video) {
        //                     ReactNativeHapticFeedback.trigger('notificationSuccess');
        //                     (callState.video as any)?._switchCamera();
        //                     setMirrorSelf(m => !m);
        //                 }
        //             }}
        //             style={{ width: 56, height: 56 }}
        //         >
        //             <View backgroundColor={calls.state.video ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
        //                 <Image source={calls.state.video ? require('assets/ic-camera-video-24.png') : require('assets/ic-camera-video-24.png')} style={{ tintColor: calls.state.video ? 'black' : 'white' }} />
        //             </View>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={() => {
        //                 setMute((s) => {
        //                     calls.setMute(!s);
        //                     return !s;
        //                 });
        //             }}
        //             style={{ width: 56, height: 56 }}
        //         >
        //             <View backgroundColor={mute ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
        //                 <Image source={mute ? require('assets/ic-mic-off-30.png') : require('assets/ic-mic-on-30.png')} style={{ tintColor: mute ? 'black' : 'white' }} />
        //             </View>
        //         </TouchableOpacity>
        //     </SAnimated.View>
        // </TouchableOpacity>
        null
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