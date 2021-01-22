/// <resources type="react" />
/// <resources type="react-native" />
declare module 'rn-fetch-blob' {
    const instance: {
        config: (args: any) => any;
        fetch: (method: string, url: string, options: any, args: any[]) => any
        wrap: (src: any) => any
        fs: any
    };
    export default instance;
}

declare module 'react-native-incall-manager' {
    const InCallManager: {
        start: (args?: { media?: 'audio' | 'video' | 'cheburek' }) => void;
        setForceSpeakerphoneOn: (flag: boolean | null) => void;
        stop: (options?: { busytone?: '_DTMF_' | '_BUNDLE_' | '_DEFAULT_' }) => void;
    }

    export default InCallManager;
}

declare module 'react-native-threads' {
    export const self: {
        onmessage: (message: string) => void;
        postMessage(message: string): void;
    };
    export class Thread {
        constructor(path: string);
        onmessage: (message: string) => void;
        postMessage(message: string): void;
        terminate(): void;
    }
}

declare module 'react-native-restart' {
    const instance: {
        Restart: () => void;
    }

    export default instance;
}

declare module 'react-native-super-ellipse-mask' {
    class Mask extends React.Component<any> { }
    export default Mask;
}
declare module 'react-native-image-capinsets' {
    class ImageViewCapInsets extends React.Component<any>{ }
    export default ImageViewCapInsets;
}
declare module 'react-native-keyboard-tracking-view' {
    export class KeyboardTrackingView extends React.Component<any> { }
}

declare module 'react-native-root-view-background' {
    export function setRootViewBackgroundColor(color: string): void
}

declare module 'react-tree-walker' {
    export default function (element: any, visitor: (element: any, instance: any) => any): any
}

declare module 'react-native-dialogs' {
    export function showPicker(title?: string | null, msessage?: string | null, options?: { items?: { label: string, id: string }[] }): Promise<{ selectedItem: { label: string, id: string } }>
    export function prompt(title?: string | null, content?: string | null, options?: { content?: string | null }): Promise<{ action: string, text: string }>
}

declare module 'react-native-media-meta' {
    const RNMediaMeta: {
        get: (path: string) => Promise<{ thumb: string, height: number, width: number, duration: string }>;
    }

    export default RNMediaMeta;
}



declare namespace JSX {
    interface IntrinsicElements {
        tview: any
        tif: any
        ttext: any
        ttextbind: any
    }
}