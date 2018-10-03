import * as React from 'react';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { getClient } from '../utils/apolloClient';
import { backoff } from 'openland-y-utils/timer';
import { DataSource } from 'openland-y-utils/DataSource';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASListView } from 'react-native-async-view/ASListView';
import { StyleProp, ViewStyle, Animated, View, Text } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { ZLoader } from './ZLoader';
import { randomEmptyPlaceholderEmoji } from '../utils/tolerance';

type ListQuery<Q> = {
    items: {
        edges: {
            node: Q
            cursor: string
        }[],
        pageInfo: {
            hasNextPage: boolean,
            hasPreviousPage: boolean,
            itemsCount: number,
            currentPage: number,
            pagesCount: number,
            openEnded: boolean,
        },
    }
};

export interface ZAsyncRoutedListProps<Q, V> {
    renderItem: (item: Q) => React.ReactElement<{}>;
    query: GraphqlTypedQuery<ListQuery<Q>, V>;
    variables?: V;
    style?: StyleProp<ViewStyle>;
    emptyText?: string;
}

export class ZAsyncRoutedList<Q, V> extends React.PureComponent<ZAsyncRoutedListProps<Q, V>, { loading?: boolean, empty?: boolean }> {

    constructor(props: ZAsyncRoutedListProps<Q, V>) {
        super(props);
        this.state = {};
    }

    private contentOffset = new STrackedValue();

    private isLoading = false;
    private nextCursor: string | undefined;
    private nextPage: number = 1;
    private dataSource = new DataSource<{ key: string, value: Q }>(() => {
        this.handleLoadMore();
    });
    private dataView = new ASDataView(this.dataSource, (itm: { key: string, value: Q }) => {
        return this.renderItem(itm.value);
    });

    private handleLoadMore = () => {
        if (!this.isLoading) {
            (async () => {
                this.isLoading = true;
                let loaded = await backoff(async () => await getClient().query(this.props.query, { ...(this.props.variables as any), page: this.nextPage }));
                let items = loaded.data.items.edges.map((v) => ({ key: (v.node as any).id, value: v.node }));
                if (items.length > 0) {
                    this.nextCursor = loaded.data.items.edges[loaded.data.items.edges.length - 1].cursor;
                }
                this.nextPage++;
                this.isLoading = false;
                this.dataSource.loadedMore(items, items.length === 0);
            })();
        }
    }

    private renderItem = (value: Q) => {
        return (
            <ASFlex flexDirection="column" alignItems="stretch">
                {this.props.renderItem(value)}
            </ASFlex>
        );
    }

    componentWillMount() {
        (async () => {
            this.isLoading = true;
            this.setState({ loading: true });
            let loaded = await backoff(async () => await getClient().query(this.props.query, this.props.variables));
            let items = loaded.data.items.edges.map((v) => ({ key: (v.node as any).id, value: v.node }));
            if (items.length > 0) {
                this.nextCursor = loaded.data.items.edges[loaded.data.items.edges.length - 1].cursor;
            } else {
                this.setState({ empty: true });
            }
            this.isLoading = false;
            this.setState({ loading: false });
            this.dataSource.initialize(items, items.length === 0);
        })();
    }
    render() {
        return (
            <ASSafeAreaContext.Consumer>
                {area => {
                    return this.state.empty ? (
                        <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{this.props.emptyText || ('Nothing found' + randomEmptyPlaceholderEmoji())}</Text>
                        </View>
                    ) : this.state.loading ? (<ZLoader />) : (
                        <>
                            <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                            <ASListView
                                style={[this.props.style, {
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                } as any]}
                                dataView={this.dataView}
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                headerPadding={4}
                                onScroll={this.contentOffset.event}
                            />
                        </>
                    );
                }}
            </ASSafeAreaContext.Consumer>
        );
    }
}