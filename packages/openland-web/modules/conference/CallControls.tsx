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
import MagicIcon from 'openland-icons/s/ic-magic-glyph-24.svg';
import ToolsIcon from 'openland-icons/s/ic-tools-glyph-24.svg';
import { TextStyles } from 'openland-web/utils/TextStyles';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';
import { showModalBox } from 'openland-x/showModalBox';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalController } from 'openland-x/showModal';
import { VideoPeer, VideoPeerProps } from './VideoPeer';

const wrapper = css`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 16px 0;
    background-color: var(--overlayTotal);
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

const SettingsModal = React.memo((props: {ctx: XModalController, videoProps?: VideoPeerProps}) => {
    let {devices, input, output, videoInput, selectInput, selectOutput, selectVideoInput} = MediaDevicesManager.instance().useMediaDevices();
    let prevValues = React.useRef<{input?: MediaDeviceInfo, output?: MediaDeviceInfo, videoInput?: MediaDeviceInfo}>({input, output, videoInput}).current;

    let outputs = devices.filter(d => d.kind === 'audiooutput');
    let inputs = devices.filter(d => d.kind === 'audioinput');
    let videoInputs = devices.filter(d => d.kind === 'videoinput');

    let setInputDevice = React.useCallback((val) => {
        let device = devices.find(d => d.deviceId === val.value);
        selectInput(device);
    }, [devices]);
    let setOutputDevice = React.useCallback((val) => {
        let dev = devices.find(d => d.deviceId === val.value);
        selectOutput(dev);
    }, [devices]);
    let setVideoInputDevice = React.useCallback((val) => {
        let dev = devices.find(d => d.deviceId === val.value);
        selectVideoInput(dev);
    }, [devices]);

    const resetSettings = () => {
        selectInput(prevValues.input);
        selectOutput(prevValues.output);
        selectVideoInput(prevValues.videoInput);
    };

    return (
        <XView>
            <XView paddingHorizontal={24} flexDirection="row" paddingTop={12}>
                <XView width={170} height={128} borderRadius={8}>
                    {props.videoProps ? <VideoPeer {...props.videoProps} compact={true} /> : null}
                </XView>
                <XView flexDirection="column" marginLeft={16} flexGrow={1}>
                <XView marginBottom={16}>
                        <USelect searchable={false} onChange={setVideoInputDevice} placeholder="Camera" value={videoInput?.deviceId} options={videoInputs.map(o => ({ value: o.deviceId, label: o.label }))} />
                    </XView>
                    <XView marginBottom={16}>
                        <USelect searchable={false} onChange={setInputDevice} placeholder="Microphone" value={input?.deviceId} options={inputs.map(o => ({ value: o.deviceId, label: o.label }))} />
                    </XView>
                    <XView marginBottom={24}>
                        <USelect searchable={false} onChange={setOutputDevice} placeholder="Speakers" value={output?.deviceId} options={outputs.map(o => ({ value: o.deviceId, label: o.label }))} />
                    </XView>
                </XView>
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => {
                        props.ctx.hide();
                        resetSettings();
                    }}
                />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={() => props.ctx.hide()}
                />
            </XModalFooter>
        </XView>
    );
});

interface CallControlsProps {
    muted: boolean;
    cameraEnabled: boolean;
    screenEnabled: boolean;
    spaceEnabled: boolean;
    toolsEnabled: boolean;
    onMinimize: React.MouseEventHandler;
    onEnd: React.MouseEventHandler;
    onMute: React.MouseEventHandler;
    onCameraClick: React.MouseEventHandler;
    onScreenClick: React.MouseEventHandler;
    onSpaceClick: React.MouseEventHandler;
    onToolsClick: React.MouseEventHandler;
    videoProps?: VideoPeerProps;
}

export const CallControls = (props: CallControlsProps) => {
    let showSettings = React.useCallback(() => {
        showModalBox({ title: 'Settings', width: 560, overflowVisible: true }, (ctx) => <SettingsModal ctx={ctx} videoProps={props.videoProps} />);
    }, [props.videoProps]);
    return (
        <XView 
            width={64} 
            height="100%" 
            position="relative"
            zIndex={3}
        >
            <div className={cx('x', wrapper)}>
                <XView 
                    position="absolute"
                    top={8}
                    left={0}
                    right={0}
                >
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
                </XView>
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
                        text="Space" 
                        icon={(
                            <UIconButton 
                                icon={<MagicIcon />} 
                                color="var(--foregroundContrast)" 
                                rippleColor="var(--tintBlue)"
                                active={props.spaceEnabled}
                            />
                        )}
                        onClick={props.onSpaceClick}
                    />
                    <ControlItem 
                        text="Tools" 
                        icon={(
                            <UIconButton 
                                icon={<ToolsIcon />} 
                                color="var(--foregroundContrast)" 
                                rippleColor="var(--tintBlue)"
                                active={props.toolsEnabled}
                            />
                        )}
                        onClick={props.onToolsClick}
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
