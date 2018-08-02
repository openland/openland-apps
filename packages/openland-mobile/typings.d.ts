/// <resources type="react" />
/// <resources type="react-native" />
declare module 'rn-fetch-blob' {
    const instance: {
        fetch: (method: string, url: string, options: any, args: any[]) => any
        wrap: (src: any) => any
    };
    export default instance;
}

declare module 'react-native-view-overflow' {
    class ViewOverflow extends React.Component<any> {}
    export default ViewOverflow;
}

declare module 'react-native-super-ellipse-mask' {
    class Mask extends React.Component<any> {}
    export default Mask;
}