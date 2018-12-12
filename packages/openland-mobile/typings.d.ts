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

