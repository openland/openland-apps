declare module 'react-reconciler' {
    export default function (arg: any): any
}

declare namespace JSX {
    interface IntrinsicElements {
        asyncview: any
        asynctext: any
    }
}