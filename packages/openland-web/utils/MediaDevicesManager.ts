
import * as React from 'react';
import { AppUserMedia, AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
let mediaDevicesManagerInstance: MediaDevicesManager | undefined;

class MediaDevicesManager {
    private devices: MediaDeviceInfo[] = [];
    private selectedInput: MediaDeviceInfo | undefined;
    private selectedOutput: MediaDeviceInfo | undefined;
    private devicesListeners = new Set<((devices: MediaDeviceInfo[]) => void)>();
    private selectedOutputListeners = new Set<((output: MediaDeviceInfo | undefined) => void)>();
    private selectedInputListeners = new Set<((input: MediaDeviceInfo | undefined) => void)>();
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

    listenOutputDevice = (listener: (device: MediaDeviceInfo | undefined) => void) => {
        this.selectedOutputListeners.add(listener);
        listener(this.selectedOutput);
        return () => {
            this.selectedOutputListeners.delete(listener);
        };
    }

    useMediaDevices: () => [MediaDeviceInfo[], MediaDeviceInfo | undefined, MediaDeviceInfo | undefined, (input: MediaDeviceInfo | undefined) => void, (output: MediaDeviceInfo | undefined) => void] = () => {
        const [devices, setDevices] = React.useState(this.devices);
        const [input, setInput] = React.useState(this.selectedInput);
        const [output, setOutput] = React.useState(this.selectedInput);

        React.useEffect(() => {
            let d1 = this.listenDevices(setDevices);
            let d2 = this.listenInputDevice(setInput);
            let d3 = this.listenOutputDevice(setOutput);
            return () => {
                d1();
                d2();
                d3();
            };
        }, []);

        return [devices, input, output, this.selectInput, this.selectOutput];
    }

    getSelectedInput = () => {
        return this.selectedInput;
    }

    currentAudioStream: AppMediaStream | undefined;
    setAudioOutputStream = (stream: AppMediaStream) => {
        this.currentAudioStream = stream;
    }

    updateAudioOutStreamDevice = async (newDevice: MediaDeviceInfo) => {
        if (this.currentAudioStream) {
            let media = await AppUserMedia.getUserAudio(newDevice.deviceId);
            let str = (this.currentAudioStream as AppUserMediaStreamWeb)._stream;
            for (let t of str.getAudioTracks()) {
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