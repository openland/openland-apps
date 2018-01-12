//import * as React from 'react';

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

declare module 'graphiql' {
    class GraphiQL extends React.Component<{ fetcher: any }, {}> {
    }

    export = GraphiQL
}

declare module 'react-simplemde-editor' {
    class SimpleMDE extends React.Component<{ value: string, onChange: (value: string) => void }, {}> {
    }

    export = SimpleMDE
}

declare module 'react-handsontable' {
    interface HotTableProps {
        stretchH?: 'all'
        stretchV?: 'all'
        width?: string | number
        height?: string | number
        data?: any[][]
        autoColumnSize?: boolean
        colWidths?: number
        rowHeaders?: boolean
        colHeaders?: boolean
    }

    class HotTable extends React.Component<HotTableProps, {}> {
    }

    export = HotTable
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