
import * as React from 'react';
import { AppUserMedia, AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
let mediaDevicesManagerInstance: MediaDevicesManager | undefined;

class MediaDevicesManager {
    private devices: MediaDeviceInfo[] = [];
    private selectedInput: MediaDeviceInfo | undefined;
    private selectedOutput: MediaDeviceInfo | undefined;
    private selectedVideoInput: MediaDeviceInfo | undefined;
    private devicesListeners = new Set<((devices: MediaDeviceInfo[]) => void)>();
    private selectedOutputListeners = new Set<((output: MediaDeviceInfo | undefined) => void)>();
    private selectedInputListeners = new Set<((input: MediaDeviceInfo | undefined) => void)>();
    private selectedVideoInputListeners = new Set<((input: MediaDeviceInfo | undefined) => void)>();
    private streamUpdateListeners = new Set<((srteam: AppMediaStream) => void)>();

    constructor() {
        (async () => {
            navigator.mediaDevices.ondevicechange = async () => {
                this.notifyDevices(await navigator.mediaDevices.enumerateDevices());
            };
            this.notifyDevices(await navigator.mediaDevices.enumerateDevices());
        })();
    }

    private notifyDevices = (d: MediaDeviceInfo[]) => {
        this.devices = d;
        for (let l of this.devicesListeners) {
            l(this.devices);
        }
        if (!this.selectedInput) {
            this.selectInput(this.devices.find(dev => dev.kind === 'audioinput' && dev.deviceId === 'default'));
        }
        if (!this.selectedOutput) {
            this.selectOutput(this.devices.find(dev => dev.kind === 'audiooutput' && dev.deviceId === 'default'));
        }
        if (!this.selectedVideoInput) {
            let videoInputs = this.devices.filter(dev => dev.kind === 'videoinput');
            let defaultVideoInput = videoInputs.find(dev => dev.deviceId === 'default') || videoInputs[0];
            this.selectVideoInput(defaultVideoInput);
        }
    }

    listenDevices = (listener: (devices: MediaDeviceInfo[]) => void) => {
        this.devicesListeners.add(listener);
        listener(this.devices);
        return () => {
            this.devicesListeners.delete(listener);
        };
    }

    selectInput = (device: MediaDeviceInfo | undefined) => {
        if (device && this.selectedInput !== device) {
            this.updateAudioOutStreamDevice(device);
        }
        this.selectedInput = device;
        for (let l of this.selectedInputListeners) {
            l(device);
        }
    }

    listenInputDevice = (listener: (device: MediaDeviceInfo | undefined) => void) => {
        this.selectedInputListeners.add(listener);
        listener(this.selectedInput);
        return () => {
            this.selectedInputListeners.delete(listener);
        };
    }

    selectOutput = (device: MediaDeviceInfo | undefined) => {
        this.selectedOutput = device;
        for (let l of this.selectedOutputListeners) {
            l(device);
        }
    }

    selectVideoInput = (device: MediaDeviceInfo | undefined) => {
        this.selectedVideoInput = device;
        if (device && this.selectedInput !== device) {
            this.updateVideoOutStreamDevice(device);
        }
        for (let l of this.selectedVideoInputListeners) {
            l(device);
        }
    }

    listenOutputDevice = (listener: (device: MediaDeviceInfo | undefined) => void) => {
        this.selectedOutputListeners.add(listener);
        listener(this.selectedOutput);
        return () => {
            this.selectedOutputListeners.delete(listener);
        };
    }

    listenVideoInputDevice = (listener: (device: MediaDeviceInfo | undefined) => void) => {
        this.selectedVideoInputListeners.add(listener);
        listener(this.selectedVideoInput);
        return () => {
            this.selectedVideoInputListeners.delete(listener);
        };
    }

    useMediaDevices: () => {
        devices: MediaDeviceInfo[],
        input: MediaDeviceInfo | undefined,
        output: MediaDeviceInfo | undefined,
        videoInput: MediaDeviceInfo | undefined,
        selectInput: (input: MediaDeviceInfo | undefined) => void,
        selectOutput: (output: MediaDeviceInfo | undefined) => void,
        selectVideoInput: (videoInput: MediaDeviceInfo | undefined) => void,
    } = () => {
        const [devices, setDevices] = React.useState(this.devices);
        const [input, setInput] = React.useState(this.selectedInput);
        const [output, setOutput] = React.useState(this.selectedOutput);
        const [videoInput, setVideoInput] = React.useState(this.selectedVideoInput);

        React.useEffect(() => {
            let d1 = this.listenDevices(setDevices);
            let d2 = this.listenInputDevice(setInput);
            let d3 = this.listenOutputDevice(setOutput);
            let d4 = this.listenVideoInputDevice(setVideoInput);
            return () => {
                d1();
                d2();
                d3();
                d4();
            };
        }, []);

        return { devices, input, output, videoInput, selectInput: this.selectInput, selectOutput: this.selectOutput, selectVideoInput: this.selectVideoInput };
    }

    getSelectedInput = () => {
        return this.selectedInput;
    }

    getSelectedVideoInput = () => {
        return this.selectedVideoInput;
    }

    currentAudioStream: AppMediaStream | undefined;
    updateAudioOutputStreamIfeeded = (stream: AppMediaStream) => {
        if (!this.currentAudioStream) {
            this.currentAudioStream = stream;
        }
    }

    currentVideoStream: AppMediaStream | undefined;
    updateVideoOutputStreamIfNeeded = (stream: AppMediaStream) => {
        if (!this.currentVideoStream) {
            this.currentVideoStream = stream;
        }
    }

    notifyOutputStreamClosed = (stream: AppMediaStream) => {
        if (stream === this.currentAudioStream) {
            this.currentAudioStream = undefined;
        }
        if (stream === this.currentVideoStream) {
            this.currentVideoStream = undefined;
        }
    }

    updateAudioOutStreamDevice = async (newDevice: MediaDeviceInfo) => {
        if (this.currentAudioStream && (this.currentAudioStream as AppUserMediaStreamWeb)._stream) {
            let media = await AppUserMedia.getUserAudio(newDevice.deviceId);
            let str = (this.currentAudioStream as AppUserMediaStreamWeb)._stream;
            for (let t of str.getAudioTracks()) {
                t.stop();
                str.removeTrack(t);
            }
            for (let t of (media as AppUserMediaStreamWeb)._stream.getAudioTracks()) {
                str.addTrack(t);
            }
            for (let l of this.streamUpdateListeners) {
                l(this.currentAudioStream);
            }
        }
    }

    updateVideoOutStreamDevice = async (newDevice: MediaDeviceInfo) => {
        if (this.currentVideoStream && (this.currentVideoStream as AppUserMediaStreamWeb)._stream) {
            let media = await AppUserMedia.getUserVideo(newDevice.deviceId);
            let str = (this.currentVideoStream as AppUserMediaStreamWeb)._stream;
            for (let t of str.getVideoTracks()) {
                t.stop();
                str.removeTrack(t);
            }
            for (let t of (media as AppUserMediaStreamWeb)._stream.getVideoTracks()) {
                str.addTrack(t);
                (media as AppUserMediaStreamWeb)._stream.removeTrack(t);
            }
            for (let l of this.streamUpdateListeners) {
                l(this.currentVideoStream);
            }
        }
    }

    listenStreamUpdated = (listener: (stream: AppMediaStream) => void) => {
        this.streamUpdateListeners.add(listener);
        return () => {
            this.streamUpdateListeners.delete(listener);
        };
    }
}

export default {
    instance: () => {
        if (!mediaDevicesManagerInstance) {
            mediaDevicesManagerInstance = new MediaDevicesManager();
        }
        return mediaDevicesManagerInstance;
    }
};