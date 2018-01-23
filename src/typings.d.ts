declare module 'react-map-gl' {
    interface StaticMapProps {
        mapboxApiAccessToken: string;
        width?: number | string;
        height?: number | string;
        latitude?: number;
        longitude?: number;
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

    export class FlyToInterpolator { }
    export let StaticMap: React.ComponentClass<StaticMapProps>;
    export let InteractiveMap: React.ComponentClass<InteractiveMapProps>;
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
    class Routes {
        // tslint:disable-next-line:unified-signatures
        add(name: string, pattern?: string, page?: string): Routes;
        // tslint:disable-next-line:unified-signatures
        add(pattern: string, page?: string): Routes;
        // tslint:disable-next-line:unified-signatures
        add(obj: { name?: string, page?: string, pattern?: string }): Routes;

        getRequestHandler(app: any): any;

        Link: React.ComponentClass<{ route: string }>;
        Router: {
            pushRoute(route: string): void;
            replaceRoute(route: string): void;
        };
    }

    const builder: () => Routes;
    export = builder
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
    }

    interface UploadInfo {
        state: 'uploading' | 'uploaded' | 'ready'
        uploadProgress: number;
        progress: number;
    }

    interface Settings {
        publicKey: string;
        imagesOnly?: boolean;
    }

    export function openDialog(file: any | null, settings: Settings): Dialog
}

declare module 'uploadcare-widget' {
    export = UploadCare;
}