//import * as React from 'react';

declare module 'markdown' {
    var markdown: {
        toHTML(markdown: string): string;
    };
}

declare module 'graphiql' {
    class GraphiQL extends React.Component<{ fetcher: any }, {}>{ }
    export = GraphiQL
}

declare module 'react-simplemde-editor' {
    class SimpleMDE extends React.Component<{ value: string, onChange: (value: string) => void }, {}>{ }
    export = SimpleMDE
}

declare module 'react-handsontable' {
    interface HotTableProps {
        stretchH?: "all"
        stretchV?: "all"
        width?: string | number
        height?: string | number
        data?: any[][]
        autoColumnSize?: boolean
        colWidths?: number
        rowHeaders?: boolean
        colHeaders?: boolean
    }
    class HotTable extends React.Component<HotTableProps, {}>{ }
    export = HotTable
}