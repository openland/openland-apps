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