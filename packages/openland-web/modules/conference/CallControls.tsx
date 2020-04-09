import * as React from 'react';
import { cx, css } from 'linaria';
import { XView } from 'react-mental';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MinimizeIcon from 'openland-icons/s/ic-minimize-glyph-24.svg';
import EndIcon from 'openland-icons/s/ic-call-end-glyph-24.svg';
import MuteIcon from 'openland-icons/s/ic-mute-glyph-24.svg';
import CameraIcon from 'openland-icons/s/ic-camera-video-glyph-24.svg';
import ScreenIcon from 'openland-icons/s/ic-screen-glyph-24.svg';
import SettingsIcon from 'openland-icons/s/ic-settings-glyph-24.svg';
import { TextStyles } from 'openland-web/utils/TextStyles';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';
import { showModalBox } from 'openland-x/showModalBox';
import { USelect } from 'openland-web/components/unicorn/USelect';

const wrapper = css`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 16px 0;
    background-color: var(--accentPay);
    transition: all 0.3s;
    width: 64px;
    overflow: hidden;

    &:hover {
        width: 192px;
    }
`;

const ControlItem = (props: {icon: JSX.Element, text: string, onClick: React.MouseEventHandler}) => {
    return (
        <XView position="relative" onClick={props.onClick}>
            <XView 
                hoverBackgroundColor="var(--foregroundContrast)"
                hoverOpacity={0.16}
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                zIndex={3}
                cursor="pointer"
            />
            <XView
                paddingVertical={8} 
                paddingHorizontal={12} 
                flexDirection="row" 
                justifyContent="flex-end" 
                alignItems="center"
            >
                <XView {...TextStyles.Label1} color="var(--foregroundContrast)" marginRight={12}>{props.text}</XView>
                {props.icon}
            </XView>
        </XView>
    );
};

const SettingsModal = React.memo((props: {}) => {
    let [devices, input, ouput, setInput, setOutput] = MediaDevicesManager.instance().useMediaDevices();

    let outputs = devices.filter(d => d.kind === 'audiooutput');
    let inputs = devices.filter(d => d.kind === 'audioinput');

    let setInputDevice = React.useCallback((val) => {
        let device = devices.find(d => d.deviceId === val.value);
        setInput(device);
    }, [devices]);
    let setOutputDevice = React.useCallback((val) => {
        let dev = devices.find(d => d.deviceId === val.value);
        setOutput(dev);
    }, [devices]);

    return (
        <XView height={500} justifyContent="flex-start">
            <XView paddingHorizontal={16} paddingVertical={8}>
                <USelect searchable={false} onChange={setInputDevice} placeholder="Microphone" value={input?.deviceId} options={inputs.map(o => ({ value: o.deviceId, label: o.label }))} />
            </XView>
            <XView paddingHorizontal={16} paddingVertical={8}>
                <USelect searchable={false} onChange={setOutputDevice} placeholder="Speakers" value={ouput?.deviceId} options={outputs.map(o => ({ value: o.deviceId, label: o.label }))} />
            </XView>
        </XView>
    );
});

interface CallControlsProps {
    muted: boolean;
    cameraEnabled: boolean;
    screenEnabled: boolean;
    onMinimize: React.MouseEventHandler;
    onEnd: React.MouseEventHandler;
    onMute: React.MouseEventHandler;
    onCameraClick: React.MouseEventHandler;
    onScreenClick: React.MouseEventHandler;
}

export const CallControls = (props: CallControlsProps) => {
    let showSettings = React.useCallback(() => {
        showModalBox({ title: 'Audio setting' }, () => <SettingsModal />);
    }, []);
    return (
        <XView 
            width={64} 
            height="100%" 
            position="relative"
            zIndex={3}
        >
            <div className={cx('x', wrapper)}>
                <ControlItem 
                    text="Minimize" 
                    icon={(
                        <UIconButton 
                            icon={<MinimizeIcon />} 
                            color="var(--foregroundContrast)" 
                            rippleColor="transparent"
                        />
                    )}
                    onClick={props.onMinimize}
                />
                <XView flexGrow={1} flexDirection="column" justifyContent="center">
                    <ControlItem 
                        text="End" 
                        icon={(
                            <UIconButton 
                                icon={<EndIcon />} 
                                color="var(--foregroundContrast)" 
                                rippleColor="var(--accentNegative)" 
                                active={true} 
                            />
                        )}
                        onClick={props.onEnd}
                    />
                    <ControlItem 
                        text="Mute" 
                        icon={(
                            <UIconButton 
                                icon={<MuteIcon />} 
                                color="var(--foregroundContrast)" 
                                rippleColor="var(--tintOrange)"
                                active={props.muted}
                            />
                        )}
                        onClick={props.onMute}
                    />
                    <ControlItem 
                        text="Camera"
                        icon={(
                            <UIconButton 
                                icon={<CameraIcon />} 
                                color="var(--foregroundContrast)"
                                rippleColor="var(--tintBlue)"
                                active={props.cameraEnabled}
                            />
                        )}
                        onClick={props.onCameraClick}
                    />
                    <ControlItem 
                        text="Screen" 
                        icon={(
                            <UIconButton 
                                icon={<ScreenIcon />} 
                                color="var(--foregroundContrast)" 
                                rippleColor="var(--tintBlue)"
                                active={props.screenEnabled}
                            />
                        )}
                        onClick={props.onScreenClick}
                    />
                    <ControlItem 
                        text="Settings" 
                        icon={(
                            <UIconButton 
                                icon={<SettingsIcon />} 
                                color="var(--foregroundContrast)"
                                rippleColor="transparent"
                            />
                        )}
                        onClick={showSettings}
                    />
                </XView>
            </div>
        </XView>
    );
};
