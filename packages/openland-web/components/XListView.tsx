import * as React from 'react';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';
import { XView } from 'react-mental';
import { XScrollView } from 'openland-x/XScrollView';
import throttle from 'lodash/throttle';
import { XScrollValues, XScrollView3 } from 'openland-x/XScrollView3';

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

export const XListView = React.memo(function <T extends DataSourceItem>(props: XListViewProps<T>) {
    let [items, completed] = useDataSource(props.dataSource);
    const needMore = React.useMemo(() => throttle(() => {
        props.dataSource.needMore()
    }, 500), [props.dataSource]);
    let onScroll = React.useCallback((values: XScrollValues) => {
        let d = (values.scrollHeight - (values.clientHeight + values.scrollTop));
        if (d < 1000) {
            needMore();
        }
    }, [needMore])

    return (
        <XScrollView3 onScroll={onScroll} width="100%" height="100%" flexGrow={1} flexShrink={0}>
            <XView flexDirection="column">
                {items.map((v) => (
                    <XView key={'item-' + v.key}>
                        {props.renderItem(v)}
                    </XView>
                ))}
                {!completed && props.renderLoading()}
            </XView>
        </XScrollView3>
    );
});
