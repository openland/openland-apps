import * as React from 'react';
import { cx, css } from 'linaria';
import { XView } from 'react-mental';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MinimizeIcon from 'openland-icons/s/ic-size-down-glyph-24.svg';
import EndIcon from 'openland-icons/s/ic-call-end-glyph-24.svg';
import MuteIcon from 'openland-icons/s/ic-mute-glyph-24.svg';
import CameraIcon from 'openland-icons/s/ic-camera-video-glyph-24.svg';
import ScreenIcon from 'openland-icons/s/ic-screen-glyph-24.svg';
import SettingsIcon from 'openland-icons/s/ic-settings-glyph-24.svg';
import MagicIcon from 'openland-icons/s/ic-magic-glyph-24.svg';
import MessageIcon from 'openland-icons/s/ic-message-glyph-24.svg';
import { TextStyles } from 'openland-web/utils/TextStyles';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';
import { showModalBox } from 'openland-x/showModalBox';
import { USelect, OptionType } from 'openland-web/components/unicorn/USelect';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalController } from 'openland-x/showModal';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { VideoComponent } from './ScreenShareModal';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';

export const CONTROLS_WIDTH = 64;

const ContainerStyle = css`
    will-change: transform;
    width: ${CONTROLS_WIDTH}px;
    height: 100%;
    position: relative;
    z-index: 5;

    .desktop-minimize {
        display: flex;
    }

    .mobile-minimize {
        display: none;
    }

    @media (max-height: 520px) {
        .desktop-minimize {
            display: none;
        }

        .mobile-minimize {
            display: flex;
        }        
    }
`;
const wrapper = css`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 16px 0;
    background-color: var(--overlayTotal);
    transition: width 0.3s;
    /* will-change: width, transform; */
    width: ${CONTROLS_WIDTH}px;
    overflow: hidden;

    &:hover {
        width: 192px;
    }
`;

const buttonsWrapper = cx('x', css`
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow: auto;
    
    @media (max-height: 520px) {
       justify-content: flex-start;      
    }
`);

const controlTextWrapper = css`
    will-change: transform;
`;

const controlHover = cx(
    'x',
    'control-hover',
    css`
        background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        cursor: pointer;
    `,
);

const controlWrapper = cx(
    'x',
    css`
        position: relative;
        z-index: 3;

        &:hover {
            cursor: pointer;

            .control-hover {
                opacity: 0.16;
            }
        }
    `,
);

const ControlItem = (props: {
    icon: JSX.Element;
    text: string;
    className?: string;
    onClick: React.MouseEventHandler;
}) => {
    return (
        <div className={cx(controlWrapper, props.className)} onClick={props.onClick}>
            <div className={controlHover} />
            <XView
                paddingVertical={8}
                paddingHorizontal={12}
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <XView {...TextStyles.Label1} color="var(--foregroundContrast)" marginRight={12}>
                    <div className={controlTextWrapper}>{props.text}</div>
                </XView>
                <XView zIndex={4}>{props.icon}</XView>
            </XView>
        </div>
    );
};

const SettingsModal = React.memo((props: { ctx: XModalController }) => {
    let {
        devices,
        input,
        output,
        videoInput,
        selectInput,
        selectOutput,
        selectVideoInput,
    } = MediaDevicesManager.instance().useMediaDevices();

    input = input || devices.find(d => d.kind === 'audioinput' && d.deviceId === 'default') || devices.find(d => d.kind === 'audioinput');
    output = output || devices.find(d => d.kind === 'audiooutput' && d.deviceId === 'default') || devices.find(d => d.kind === 'audiooutput');
    videoInput = videoInput || devices.find(d => d.kind === 'videoinput' && d.deviceId === 'default') || devices.find(d => d.kind === 'videoinput');

    const prevValues = React.useRef<{
        input?: MediaDeviceInfo;
        output?: MediaDeviceInfo;
        videoInput?: MediaDeviceInfo;
    }>({ input, output, videoInput }).current;

    const outputs = devices.filter((d) => d.kind === 'audiooutput');
    const inputs = devices.filter((d) => d.kind === 'audioinput');
    const videoInputs = devices.filter((d) => d.kind === 'videoinput');

    const [localVideoInput, setLocalVideoInput] = React.useState<MediaDeviceInfo | undefined>(
        videoInput,
    );
    const [localVideoStream, setLocalVideoStream] = React.useState<
        AppMediaStreamTrack | undefined
    >();

    const setOutputDevice = React.useCallback(
        (val: OptionType) => {
            const dev = devices.find((d) => d.deviceId === val.value);
            selectOutput(dev);
        },
        [devices],
    );
    const setInputDevice = React.useCallback(
        (val: OptionType) => {
            const dev = devices.find((d) => d.deviceId === val.value);
            selectInput(dev);
        },
        [devices],
    );
    const setVideoInputDevice = React.useCallback(
        async (val: OptionType) => {
            const dev = devices.find((d) => d.deviceId === val.value);
            setLocalVideoInput(dev);
            if (localVideoStream) {
                localVideoStream.stop();
            }
            const v = await AppUserMedia.getUserVideo(dev?.deviceId);
            setLocalVideoStream(v);
        },
        [devices, localVideoStream],
    );

    const resetSettings = () => {
        selectInput(prevValues.input);
        selectOutput(prevValues.output);
    };

    const handleSave = () => {
        if (localVideoInput?.deviceId !== videoInput?.deviceId) {
            selectVideoInput(localVideoInput);
        }
        props.ctx.hide();
    };

    React.useEffect(() => {
        if (!localVideoStream) {
            (async () => {
                let v = await AppUserMedia.getUserVideo(videoInput?.deviceId);
                setLocalVideoStream(v);
            })();
        }
        return () => {
            if (localVideoStream) {
                localVideoStream.stop();
            }
        };
    }, [localVideoStream]);

    const videoTrack = (localVideoStream as AppUserMediaTrackWeb | undefined)?.track;

    return (
        <XView>
            <XView paddingHorizontal={24} flexDirection="row" paddingTop={12}>
                <XView
                    width={170}
                    height={128}
                    borderRadius={8}
                    backgroundColor="var(--backgroundTertiaryTrans)"
                >
                    {videoTrack && (
                        <VideoComponent
                            track={videoTrack}
                            cover={true}
                            compact={true}
                            mirror={true}
                        />
                    )}
                </XView>
                <XView flexDirection="column" marginLeft={16} flexGrow={1} flexShrink={1}>
                    {!!(output || outputs.length) && <XView marginBottom={16}>
                        <USelect
                            useMenuPortal={true}
                            onChange={setOutputDevice}
                            label="Speakers"
                            value={output ? { value: output.deviceId, label: output.label } : null}
                            options={outputs.map((d) => ({ value: d.deviceId, label: d.label }))}
                        />
                    </XView>}
                    {!!(input || inputs.length) && <XView marginBottom={16}>
                        <USelect
                            useMenuPortal={true}
                            onChange={setInputDevice}
                            label="Microphone"
                            value={input ? { value: input?.deviceId, label: input?.label } : null}
                            options={inputs.map((d) => ({ value: d.deviceId, label: d.label }))}
                        />
                    </XView>}
                    {!!(localVideoInput || videoInputs.length) && <XView marginBottom={24}>
                        <USelect
                            useMenuPortal={true}
                            onChange={setVideoInputDevice}
                            label="Camera"
                            value={
                                localVideoInput
                                    ? {
                                        value: localVideoInput?.deviceId,
                                        label: localVideoInput?.label,
                                    }
                                    : null
                            }
                            options={videoInputs.map((d) => ({
                                value: d.deviceId,
                                label: d.label,
                            }))}
                        />
                    </XView>}
                </XView>
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => {
                        resetSettings();
                        props.ctx.hide();
                    }}
                />
                <UButton text="Save" style="primary" size="large" onClick={handleSave} />
            </XModalFooter>
        </XView>
    );
});

interface CallControlsProps {
    muted: boolean;
    cameraEnabled: boolean;
    screenEnabled: boolean;
    spaceEnabled: boolean;
    onMinimize: React.MouseEventHandler;
    onEnd: React.MouseEventHandler;
    onMute: React.MouseEventHandler;
    onCameraClick: React.MouseEventHandler;
    onScreenClick: React.MouseEventHandler;
    onSpaceClick: React.MouseEventHandler;
    onMessageClick: React.MouseEventHandler;
}

export const CallControls = (props: CallControlsProps) => {
    let showSettings = React.useCallback(() => {
        showModalBox({ title: 'Settings', width: 560, overflowVisible: true }, (ctx) => (
            <SettingsModal ctx={ctx} />
        ));
    }, []);

    return (
        <div className={ContainerStyle}>
            <div className={cx('x', wrapper)}>
                <XView position="absolute" top={8} left={0} right={0}>
                    <ControlItem
                        text="Minimize"
                        icon={
                            <UIconButton
                                icon={<MinimizeIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="transparent"
                                disableHover={true}
                            />
                        }
                        className="desktop-minimize"
                        onClick={props.onMinimize}
                    />
                </XView>
                <div className={buttonsWrapper}>
                    <ControlItem
                        text="Minimize"
                        icon={
                            <UIconButton
                                icon={<MinimizeIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="transparent"
                                disableHover={true}
                            />
                        }
                        className="mobile-minimize"
                        onClick={props.onMinimize}
                    />
                    <ControlItem
                        text="End"
                        icon={
                            <UIconButton
                                icon={<EndIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="var(--accentNegative)"
                                active={true}
                                disableHover={true}
                            />
                        }
                        onClick={props.onEnd}
                    />
                    <ControlItem
                        text="Mute"
                        icon={
                            <UIconButton
                                icon={<MuteIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="var(--tintOrange)"
                                active={props.muted}
                                disableHover={true}
                            />
                        }
                        onClick={props.onMute}
                    />
                    <ControlItem
                        text="Camera"
                        icon={
                            <UIconButton
                                icon={<CameraIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="var(--tintBlue)"
                                active={props.cameraEnabled}
                                disableHover={true}
                            />
                        }
                        onClick={props.onCameraClick}
                    />
                    <ControlItem
                        text="Screen"
                        icon={
                            <UIconButton
                                icon={<ScreenIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="var(--tintBlue)"
                                active={props.screenEnabled}
                                disableHover={true}
                            />
                        }
                        onClick={props.onScreenClick}
                    />
                    <ControlItem
                        text="Space"
                        icon={
                            <UIconButton
                                icon={<MagicIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="var(--tintBlue)"
                                active={props.spaceEnabled}
                                disableHover={true}
                            />
                        }
                        onClick={props.onSpaceClick}
                    />
                    <ControlItem
                        text="Message"
                        icon={
                            <UIconButton
                                icon={<MessageIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="var(--tintBlue)"
                                disableHover={true}
                            />
                        }
                        onClick={props.onMessageClick}
                    />
                    <ControlItem
                        text="Settings"
                        icon={
                            <UIconButton
                                icon={<SettingsIcon />}
                                color="var(--foregroundContrast)"
                                rippleColor="transparent"
                                disableHover={true}
                            />
                        }
                        onClick={showSettings}
                    />
                </div>
            </div>
        </div>
    );
};
