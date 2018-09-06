import * as React from 'react';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { getClient } from '../utils/apolloClient';
import { backoff } from 'openland-y-utils/timer';
import { DataSource } from 'openland-y-utils/DataSource';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASListView } from 'react-native-async-view/ASListView';
import { StyleProp, ViewStyle, Animated } from 'react-native';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { ZSafeAreaContext } from './layout/ZSafeAreaContext';
import { FastScrollValue } from 'react-native-fast-navigation/FastScrollValue';

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
}

export class ZAsyncRoutedList<Q, V> extends React.PureComponent<ZAsyncRoutedListProps<Q, V>> {
    private contentOffset = new FastScrollValue();

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
            let loaded = await backoff(async () => await getClient().query(this.props.query, this.props.variables));
            let items = loaded.data.items.edges.map((v) => ({ key: (v.node as any).id, value: v.node }));
            if (items.length > 0) {
                this.nextCursor = loaded.data.items.edges[loaded.data.items.edges.length - 1].cursor;
            }
            this.isLoading = false;
            this.dataSource.initialize(items, items.length === 0);
        })();
    }
    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {area => {
                    return (
                        <>
                            <FastHeaderConfigRegistrator config={new FastHeaderConfig({ contentOffset: this.contentOffset })} />
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
            </ZSafeAreaContext.Consumer>
        );
    }
}