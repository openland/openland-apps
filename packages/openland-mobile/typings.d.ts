/// <resources type="react" />
/// <resources type="react-native" />
declare module 'rn-fetch-blob' {
    const instance: {
        config: (args: any) => any;
        fetch: (method: string, url: string, options: any, args: any[]) => any
        wrap: (src: any) => any
    };
    export default instance;
}

declare module 'react-native-view-overflow' {
    class ViewOverflow extends React.Component<any> { }
    export default ViewOverflow;
}

declare module 'react-native-super-ellipse-mask' {
    class Mask extends React.Component<any> { }
    export default Mask;
}

declare module 'react-native-keyboard-tracking-view' {
    export class KeyboardTrackingView extends React.Component<any> { }
}

declare module 'react-native-root-view-background' {
    export function setRootViewBackgroundColor(color: string): void
}