import * as React from 'react';

let mediaDevicesManagerInstance: MediaDevicesManager | undefined;

class MediaDevicesManager {
    private devices: MediaDeviceInfo[] = [];
    private selectedInput: MediaDeviceInfo | undefined;
    private selectedAudioOutput: MediaDeviceInfo | undefined;
    private selectedVideoInput: MediaDeviceInfo | undefined;
    private devicesListeners = new Set<((devices: MediaDeviceInfo[]) => void)>();
    private selectedAudioOutputListeners = new Set<((output: MediaDeviceInfo | undefined) => void)>();
    private selectedInputListeners = new Set<((input: MediaDeviceInfo | undefined) => void)>();
    private selectedVideoInputListeners = new Set<((input: MediaDeviceInfo | undefined) => void)>();

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
    }

    listenDevices = (listener: (devices: MediaDeviceInfo[]) => void) => {
        this.devicesListeners.add(listener);
        listener(this.devices);
        return () => {
            this.devicesListeners.delete(listener);
        };
    }

    selectAudioInput = (device: MediaDeviceInfo | undefined) => {
        if (this.selectedInput !== device) {
            this.selectedInput = device;
            for (let l of this.selectedInputListeners) {
                l(device);
            }
        }
    }

    listenAudioInputDevice = (listener: (device: MediaDeviceInfo | undefined) => void) => {
        this.selectedInputListeners.add(listener);
        listener(this.selectedInput);
        return () => {
            this.selectedInputListeners.delete(listener);
        };
    }

    selectAudioOutputDevice = (device: MediaDeviceInfo | undefined) => {
        if (this.selectedAudioOutput !== device) {
            this.selectedAudioOutput = device;
            for (let l of this.selectedAudioOutputListeners) {
                l(device);
            }
        }
    }

    selectVideoInputDevice = (device: MediaDeviceInfo | undefined) => {
        if (this.selectedInput !== device) {
            this.selectedVideoInput = device;
            for (let l of this.selectedVideoInputListeners) {
                l(device);
            }
        }
    }

    listenAudioOutputDevice = (listener: (device: MediaDeviceInfo | undefined) => void) => {
        this.selectedAudioOutputListeners.add(listener);
        listener(this.selectedAudioOutput);
        return () => {
            this.selectedAudioOutputListeners.delete(listener);
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
        const [output, setOutput] = React.useState(this.selectedAudioOutput);
        const [videoInput, setVideoInput] = React.useState(this.selectedVideoInput);

        React.useEffect(() => {
            let d1 = this.listenDevices(setDevices);
            let d2 = this.listenAudioInputDevice(setInput);
            let d3 = this.listenAudioOutputDevice(setOutput);
            let d4 = this.listenVideoInputDevice(setVideoInput);
            return () => {
                d1();
                d2();
                d3();
                d4();
            };
        }, []);

        return { devices, input, output, videoInput, selectInput: this.selectAudioInput, selectOutput: this.selectAudioOutputDevice, selectVideoInput: this.selectVideoInputDevice };
    }

    getSelectedAudioInput = () => {
        return this.selectedInput;
    }

    getSelectedVideoInput = () => {
        return this.selectedVideoInput;
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