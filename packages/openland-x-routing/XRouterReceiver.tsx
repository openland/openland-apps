import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XRouter } from './XRouter';

export class XRouterReceiver<TProps = {}, TState = {}> extends React.Component<TProps, TState> {
    static contextTypes = {
        xrouter: PropTypes.object.isRequired
    };

    protected get router(): XRouter {
        return this.context.xrouter;
    }
}