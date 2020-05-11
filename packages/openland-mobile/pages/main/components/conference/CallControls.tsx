import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';

const CallControlItem = (props: { label: string, icon: NodeRequire, backgroundColor?: string, disabled?: boolean, onPress?: () => void, onLongPress?: () => void }) => {
    let theme = React.useContext(ThemeContext);
    return (
        <View alignItems="center" opacity={props.disabled ? 0.56 : 1} pointerEvents={props.disabled ? 'none' : undefined}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={props.onPress}
                onLongPress={props.onLongPress}
                style={{ width: 56, height: 56 }}
            >
                <View backgroundColor={props.backgroundColor || 'rgba(255, 255, 255, 0.08)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                    <Image source={props.icon} style={{ tintColor: theme.foregroundContrast }} />
                </View>
            </TouchableOpacity>
            <Text style={{ ...TextStyles.Label3, color: theme.foregroundContrast, marginTop: 8, justifyContent: 'center' }}>{props.label}</Text>
        </View>
    );
};

interface CallControlsProps {
    title: string;
    mute: boolean;
    speaker: boolean;
    camera: boolean;
    onMutePress: () => void;
    onSpeakerPress: () => void;
    onCameraPress: () => void;
    onFlipPress: () => void;
    onCallEnd: () => void;
}

export const CallControls = (props: CallControlsProps) => {
    let theme = React.useContext(ThemeContext);
    let [mute, setMute] = React.useState(props.mute);
    let [speaker, setSpeaker] = React.useState(props.speaker);
    let [camera, setCamera] = React.useState(props.camera);

    return (
        <View borderRadius={18} overflow="hidden">
            <ZBlurredView
                fallbackColor={theme.overlayHeavy}
                blurType="dark"
                intensity="high"
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingBottom: 15,
                }}
            >
                <View flexDirection="column" flexGrow={1}>
                    <Text style={{ paddingVertical: 15, ...TextStyles.Title2, color: theme.foregroundContrast }}>
                        {props.title}
                    </Text>
                    <View flexGrow={1} flexDirection="row" justifyContent="space-between">
                        <CallControlItem
                            onPress={props.onCallEnd}
                            icon={require('assets/ic-call-end-glyph-24.png')}
                            label="End"
                            backgroundColor="#F23051"
                        />
                        <CallControlItem
                            onPress={() => {
                                setSpeaker(x => !x);
                                props.onSpeakerPress();
                            }}
                            icon={require('assets/ic-speaker-glyph-24.png')}
                            label="Speaker"
                            backgroundColor={speaker ? '#248BF2' : undefined}
                        />
                        <CallControlItem
                            onPress={() => {
                                setMute(x => !x);
                                props.onMutePress();
                            }}
                            icon={require('assets/ic-mute-glyph-24.png')}
                            label="Mute"
                            backgroundColor={mute ? '#FF9F1A' : undefined}
                        />
                        <CallControlItem
                            onPress={() => {
                                setCamera(x => !x);
                                props.onCameraPress();
                            }}
                            icon={require('assets/ic-camera-video-24.png')}
                            label="Camera"
                            backgroundColor={camera ? '#248BF2' : undefined}
                        />
                        <CallControlItem
                            icon={require('assets/ic-cycle-glyph-24.png')}
                            onPress={props.onFlipPress}
                            label="Flip"
                            disabled={!camera}
                        />
                    </View>
                </View>
            </ZBlurredView>
        </View>
    );
};

export const showCallControls = (props: CallControlsProps) => {
    showBottomSheet({
        containerStyle: {
            backgroundColor: 'transparent',
            marginHorizontal: 0,
            alignSelf: 'center',
            width: '100%',
            maxWidth: 450,
        },
        view: (ctx) => (
            <CallControls
                {...props}
                onCallEnd={() => {
                    props.onCallEnd();
                    ctx.hide();
                }}
            />
        )
    });
};
