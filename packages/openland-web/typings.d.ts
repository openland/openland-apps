declare module '*.handlebars' {
    const content: string;
    export = content;
}

declare module '*.svg' {
    const content: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
    export default content;
}

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
        originalImageInfo?: {
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
    export function fileFrom(type: any, data: any): File
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

interface onEveryReturn {
    /**
        * Callback function you passed to onEvery
        */
    callback: () => void;
    /**
        * Timer Id of setInterval
        */
    code: number;

    /**
        * Stop the interval, you cannot resume
        */
    stop(): boolean;

    /**
        * Pauses the interval, it's resumable
        */
    pause(): boolean;

    /**
        * Resumes paused interval
        */
    resume(): boolean;
}

interface IdleInfo {
    /**
        * if page idle now?
        */
    isIdle: boolean,

    /**
        * How long was the page idle in milliseconds
        */
    idleFor: number,

    /**
        * How much time left to become idle in milliseconds
        */
    timeLeft: number,

    /**
        * How much time left to become idle represented as percentage
        */
    timeLeftPer: string
}

interface IfVisible {
    /**
        * Registers a callback function to blur event
        * @param callback function to run when event fires
        */
    blur(callback: () => void): IfVisible;

    /**
        * Triggers the blur event
        */
    blur(): IfVisible;

    /**
        * Registers a callback function to focus event
        * @param callback function to run when event fires
        */
    focus(callback: () => void): IfVisible;

    /**
        * Triggers the focus event
        */
    focus(): IfVisible;

    /**
        * Registers a callback function to idle event
        * @param callback function to run when event fires
        */
    idle(callback: () => void): IfVisible;

    /**
        * Triggers the idle event
        */
    idle(): IfVisible;

    /**
        * Registers a callback function to wakeup event
        * @param callback function to run when event fires
        */
    wakeup(callback: () => void): IfVisible;

    /**
        * Triggers the wakeup event
        */
    wakeup(): IfVisible;

    /**
        * Register any event
        * @param name Name of the event
        * @param callback Function to run when event fires
        */
    on(name: string, callback: (status?: string) => void): number;

    /**
        * Unregister given event of name
        * @param name name of the event
        * @param handler function to remove from registered events
        */
    off(name: string, handler: Function): void;

    /**
        * Unregister all event of given name
        * @param name Name to unregister all events of
        */
    off(name: string): void;

    /**
        * Returns the current duration time in milliseconds
        */
    getIdleDuration(): number;

    /**
        * Returns detailed information about current idle status
        */
    getIdleInfo(): IdleInfo;

    /**
        * Given the event, it check if page is in that state for example
        * ifvisible.now('idle') return boolean to state if you are idle or not
        */
    now(check: string): boolean;

    /**
        * Tells if page is visible or not at the moment
        */
    now(): boolean;

    /**
        * Utility to run a given function at every given seconds intervals.
        * This method is smart and it will stop executing when the page is not active
        * @param seconds duration to wait between each interval in seconds
        * @param callback callback function run on every iteration
        */
    onEvery(seconds: number, callback: () => void): onEveryReturn;

    /**
        * Let's you change duration that page becomes idle dynamically
        * @param seconds new duration in seconds
        */
    setIdleDuration(seconds: number): number;
}

declare var ifvisible: IfVisible;

declare module 'ifvisible.js' {
    export = ifvisible;
}