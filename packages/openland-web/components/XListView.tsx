import * as React from 'react';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';
import { List, AutoSizer, ListRowProps } from 'react-virtualized';

function useDataSource<T extends DataSourceItem>(dataSource: DataSource<T>): [T[], boolean] {
    let [items, setItems] = React.useState<T[]>([]);
    let [completed, setCompleted] = React.useState<boolean>(false);
    React.useEffect(
        () => {
            let lastData: T[] = [];
            let w = dataSource.watch({
                onDataSourceInited: (data: T[], isCompleted: boolean) => {
                    lastData = data;
                    setItems(data);
                    setCompleted(isCompleted);
                },
                onDataSourceItemAdded: (item: T, index: number) => {
                    let data = [...lastData];
                    data.splice(index, 0, item);
                    lastData = data;
                    setItems(data);
                },
                onDataSourceItemUpdated: (item: T, index: number) => {
                    let data = [...lastData];
                    data[index] = item;
                    lastData = data;
                    setItems(data);
                },
                onDataSourceItemRemoved: (item: T, index: number) => {
                    let data = [...lastData];
                    data.splice(index, 1);
                    lastData = data;
                    setItems(data);
                },
                onDataSourceItemMoved: (item: T, fromIndex: number, toIndex: number) => {
                    let data = [...lastData];
                    data.splice(fromIndex, 1);
                    data.splice(toIndex, 0, item);
                    lastData = data;
                    setItems(data);
                },
                onDataSourceLoadedMore: (ndata: T[], isCompleted: boolean) => {
                    let data = [...lastData, ...ndata];
                    lastData = data;
                    setItems(data);
                    setCompleted(isCompleted);
                },
                onDataSourceCompleted: () => {
                    setCompleted(true);
                },
            });
            return w;
        },
        [dataSource],
    );
    return [items, completed];
}

export interface XListViewProps<T extends DataSourceItem> {
    dataSource: DataSource<T>;
    itemHeight: number;
    loadingHeight: number;
    renderItem: (item: T) => React.ReactElement<any>;
    renderLoading: () => React.ReactElement<any>;
}

export function XListView<T extends DataSourceItem>(props: XListViewProps<T>) {
    let [items, completed] = useDataSource(props.dataSource);
    let renderer = React.useCallback(
        (renderProp: ListRowProps) => {
            // console.log('render: ' + item.index);
            // console.log(items[item.index]);
            let res: any;
            if (renderProp.index < items.length) {
                res = props.renderItem(items[renderProp.index]);
            } else {
                res = props.renderLoading();
            }
            return (
                <div key={renderProp.key} style={renderProp.style}>
                    {res}
                </div>
            );
        },
        [items, props.renderItem, props.renderLoading],
    );
    let heightFunc = React.useCallback(
        (params: { index: number }) => {
            if (params.index < items.length) {
                return props.itemHeight;
            } else {
                return props.loadingHeight;
            }
        },
        [items, completed],
    );
    let onRendered = React.useCallback(
        (info: {
            overscanStartIndex: number;
            overscanStopIndex: number;
            startIndex: number;
            stopIndex: number;
        }) => {
            if (!completed) {
                if (info.stopIndex > items.length - 10) {
                    props.dataSource.needMore();
                }
            }
        },
        [items, completed],
    );
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    onRowsRendered={onRendered}
                    width={width}
                    height={height}
                    rowCount={items.length + (completed ? 0 : 1)}
                    rowRenderer={renderer}
                    rowHeight={heightFunc}
                />
            )}
        </AutoSizer>
    );
}
