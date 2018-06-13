declare module 'react-map-gl' {
    interface StaticMapProps {
        mapboxApiAccessToken: string;
        width: number | string;
        height: number | string;
        latitude: number;
        longitude: number;
        zoom?: number;
        mapStyle?: string;
        pitch?: number;
        bearing?: number;
        transitionDuration?: number;
        transitionInterpolator?: FlyToInterpolator;
    }

    interface InteractiveMapProps extends StaticMapProps {
        maxZoom?: number;
        dragPan?: boolean;
        dragRotate?: boolean;
        touchRotate?: boolean;
        onViewportChange?: (viewport: ViewPortChanged) => void
    }

    interface ViewPortChanged {
        latitude: number;
        longitude: number;
        zoom: number;
        pitch: number;
        bearing: number;
    }

    export let NavigationControl: React.ComponentClass<{ onViewportChange?: (viewport: ViewPortChanged) => void }>;

    export class FlyToInterpolator { }
    export let StaticMap: React.ComponentClass<StaticMapProps>;
    export let InteractiveMap: React.ComponentClass<InteractiveMapProps>;
}

declare module 'mixpanel-browser' {
    export function init(token: string): void;
    export function track(event: string, params?: { [key: string]: any }): void;
    export function identify(id: string): void;
    export let people: {
        set(keys: { [key: string]: any }): void;
    }
}

declare module 'isomorphic-unfetch' {
    export default function (input: RequestInfo, init?: RequestInit): Promise<Response>
}

declare module 'deck.gl' {
    interface DeckGLProps {
        latitude: number;
        longitude: number;
        zoom: number;
        pitch: number;
        bearing: number;
        width: number;
        height: number;
        layers: Layer<LayerProps>[];
        useDevicePixels?: boolean
    }

    interface LayerProps {
        id?: string;
        data?: any;
        visible?: boolean;
        opacity?: number;

        pickable?: boolean;
        highlightColor?: number[];
        autoHighlight?: boolean;

        fp64?: boolean;
    }

    interface Layer<T extends LayerProps> {
        new(props: T): Layer<T>;
        context: any;
        state: any;
        props: T;
    }

    interface GeoJsonLayerProps extends LayerProps {
        filled?: boolean;
        stroked?: boolean;
        extruded?: boolean;
        wireframe?: boolean;

        getLineColor?: (src: any) => number[];
        getFillColor?: (src: any) => number[];
        onHover?: (src: any) => void;
        onClick?: (src: any) => void;
        updateTriggers?: any;
    }

    export let GeoJsonLayer: Layer<GeoJsonLayerProps>;

    let clazz: React.ComponentClass<DeckGLProps>;
    export default clazz;
}

declare module 'next-routes' {
    interface Routes {
        // tslint:disable-next-line:unified-signatures
        add(name: string, pattern?: string, page?: string): Routes;
        // tslint:disable-next-line:unified-signatures
        add(pattern: string, page?: string): Routes;
        // tslint:disable-next-line:unified-signatures
        add(obj: { name?: string, page?: string, pattern?: string }): Routes;

        findAndGetUrls(nameOrUrl?: string, params?: any): { route: any, urls: { as: string, href: string } };

        getRequestHandler(app: any): any;

        Link: React.ComponentClass<{ route: string, onClick?: React.MouseEventHandler<HTMLAnchorElement> }>;
        Router: {
            pushRoute(route: string): Promise<any>;
            replaceRoute(route: string): Promise<any>;
        };
    }

    const builder: () => Routes;
    export = builder
}

declare module 'glamor/server' {
    export interface ServerRule {
        cssText: string;
    }

    export interface ServerResult {
        html: string;
        css: string;
        ids: string[];
        rules: ServerRule[];
    }

    export function renderStatic(fn: () => string): ServerResult;
    export function renderStaticOptimized(fn: () => string | undefined): ServerResult;
}

declare module 'emotion-server' {
    export function extractCritical(body: string | undefined): any;
}

declare namespace Humanize {
    function relativeTime(timestamp: number): string;
}

declare module 'humanize' {
    export = Humanize
}

declare module 'markdown' {
    var markdown: {
        toHTML(markdown: string): string;
    };
}

declare module 'lodash.flowright' {

}

declare namespace UploadCare {
    interface Dialog {
        done: (callback: (result: File) => void) => Dialog
        fail: (callback: (result: File | null) => void) => Dialog
        always: (callback: (result: File | null) => void) => Dialog
    }

    interface File {
        done: (callback: (result: FileInfo) => void) => File
        fail: (callback: (result: any) => void) => File
        progress: (callback: (progress: UploadInfo) => void) => File
    }

    interface FileInfo {
        uuid: string;
        name: string;
        size: string;
        isStored: boolean;
        isImage: boolean;
        cdnUrl: string;
        originalUrl: string;
        crop?: {
            left: number;
            top: number;
            width: number;
            height: number;
        }
    }

    interface UploadInfo {
        state: 'uploading' | 'uploaded' | 'ready'
        uploadProgress: number;
        progress: number;
    }

    interface Settings {
        publicKey: string;
        imagesOnly?: boolean;
        crop?: any
        imageShrink?: any;
    }

    export function openDialog(file: any | null, settings: Settings): Dialog
    export function fileFrom(type: any, data: any): any
}

declare module 'uploadcare-widget' {
    export = UploadCare;
}

declare module '@typeform/embed' {
    function makeWidget(element: any, url: string, options: any): void;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module 'react-lottie' {
    /**
     * @param loop if the animation must be continue after the animation has fully executed
     * @param autoplay if the animation needs to be started when the react component requests rendering
     * @param animationData require here the animation data in format JSON
     * @param rendererSettings
     */
    interface LottieBodymovinOptionProps {
        loop?: boolean,
        autoplay?: boolean,
        animationData: any,
        rendererSettings?: {
            preserveAspectRatio?: any
            context?: any, // the canvas context
            scaleMode?: 'noScale' | any,
            clearCanvas?: boolean,
            progressiveLoad?: boolean, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent?: boolean, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className?: string,
        }
    }

    /**
     * @param eventName the event sent by bodymovin
     * @param callback a callback execute when this eventName is received.
     */
    interface BodymovinEvent {
        eventName: 'complete' | 'loopComplete' | 'enterFrame' | 'segmentStart' | 'config_ready' | 'data_ready' | 'loaded_images' |
        'DOMLoaded' | 'destroy',
        callback: () => void,
    }

    /**
     * Props of Lottie component
     * @param options the object representing the animation settings that will be instantiated by bodymovin.
     * @param height height size of the animation in pixel, default value is 100%
     * @param width width size of the animation in pixel, default value is 100%
     * @param isStopped must be stocked in a state, boolean that describe if the animation must be in stopped mode
     * @param isPaused must be stocked in a state, boolean that describe if the animation must be in paused mode
     * @param eventListeners optional [default: []], This is an array of objects containing a eventName and callback function that will be registered as eventlisteners on the animation object. refer to bodymovin#events where the mention using addEventListener, for a list of available custom events.
     */
    interface LottiePropsType {
        options: LottieBodymovinOptionProps,
        height?: number | string,
        width?: number | string,
        isStopped: boolean,
        isPaused: boolean,
        eventListeners?: Array<BodymovinEvent>
        segments?: Array<number>
        speed?: number | 1,
        direction?: number,
        ariaRole?: string | 'button',
        ariaLabel?: string | 'animation',
        isClickToPauseDisabled?: boolean,
        title?: string,
    }
    /**
     * @component Lottie is a component that allow you to use animation from JSON file that created by
     * Bodymovin on Adobe After Effect
     */
    class Lottie extends React.Component<LottiePropsType, any> { }
    export default Lottie;
}

declare module 'react-lorem-component' {
    class Lorem extends React.Component<{ count: number }, any> { }
    export default Lorem
}

declare module '@mapbox/mapbox-gl-geocoder' {
    class Geocoder {
        constructor(args: {
            accessToken: string
            country?: string,
            zoom?: number,
            filter?: (item: any) => boolean;
            bbox?: number[];
            types?: string;
        })

        on(type: string, listener: Function): this;

        on(type: string, layer: string, listener: Function): this;

        off(type?: string | any, listener?: Function): this;

        off(type?: string | any, layer?: string, listener?: Function): this;

        once(type: string, listener: Function): this;

        fire(type: string, data?: mapboxgl.EventData | Object): this;

        listens(type: string): boolean;

        onAdd(map: any): any;
        setProximity(location: { latitude: number, longitude: number } | null): void;
    }
    export = Geocoder;
}