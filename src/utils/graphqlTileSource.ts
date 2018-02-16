import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DocumentNode } from 'graphql';
import { XMapSubscriber } from '../components/X/XMapLight';

export function graphqlTileSource(document: DocumentNode) {
    class GraphQLTileSource extends React.Component {
        static contextTypes = {
            mapSubscribe: PropTypes.func.isRequired,
            mapUnsubscribe: PropTypes.func.isRequired
        }

        listener: XMapSubscriber = (src) => {
            console.warn(src);
        }

        componentDidMount() {
            this.context.mapSubscribe(this.listener);
        }

        componentWillUnmount() {
            this.context.mapUnsubscribe(this.listener);
        }
    }

    return GraphQLTileSource;
}