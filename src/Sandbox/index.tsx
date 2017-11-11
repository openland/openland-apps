/// <reference path="../typings.d.ts" />
import * as React from 'react';
import GraphiQL from 'graphiql';
import * as api from '../api';
import 'graphiql/graphiql.css';

export default function () {
    return (
        <div
            style={{
                height: '100vh'
            }}
        >
            <GraphiQL fetcher={api.sandboxResolver} />
        </div >
    );
}