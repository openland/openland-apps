import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { withApollo } from 'react-apollo';
import * as Queries from '../../../api/queries/Blocks';
import * as Types from '../../../api/Types';
import * as Immutable from 'immutable';
import { XMapSubscriber } from '../../../components/X/XMapLight';

class GraphQLTileSource extends React.Component<{ client: ApolloClient<any> }, { elements: Immutable.List<{ id: string, title: string, geometry: any }> }> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isLoading = false;
    private pendingBox: { south: number, north: number, east: number, west: number } | null = null;

    constructor(props: { client: ApolloClient<any> }) {
        super(props);

        this.state = { elements: Immutable.List() }
    }

    listener: XMapSubscriber = (src) => {
        this.pendingBox = src;
        this.tryInvokeLoader();
    }

    tryInvokeLoader = async () => {
        if (this.isLoading) {
            return
        }
        if (this.pendingBox) {
            let box = this.pendingBox;
            this.isLoading = true;
            this.pendingBox = null;

            let response: ApolloQueryResult<Types.ParcelsTileOverlayQuery>;
            console.warn('Querying...')
            while (true) {
                try {
                    response = await this.props.client.query<Types.ParcelsTileOverlayQuery>({
                        query: Queries.ParcelsTileOverlay,
                        variables: {
                            box: { south: box.south, north: box.north, east: box.east, west: box.west }
                        }
                    });
                } catch {
                    continue;
                }
                break;
            }
            console.warn('Completed')
            this.setState(
                (src) => {
                    let res = src.elements;
                    for (let s of response.data.tiles!!) {
                        if (!res.find((r) => r!!.id === s.id)) {
                            res = res.push({ id: s.id, title: s.title, geometry: s.geometry })
                        }
                    }
                    return { elements: res };
                },
                () => {
                    this.isLoading = false;
                    this.tryInvokeLoader();
                });
        }
    }

    render() {
        console.warn('Count: ' + this.state.elements.size);
        return null;
    }

    componentDidMount() {
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this.context.mapUnsubscribe(this.listener);
    }
}

let LinkedSource = withApollo(GraphQLTileSource);

export default withApp((props) => {
    return (
        <AppContentMap>
            <LinkedSource />
        </AppContentMap>
    )
})