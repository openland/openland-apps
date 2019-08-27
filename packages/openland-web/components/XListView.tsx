import * as React from 'react';
import { DataSourceItem, ReadableDataSource } from 'openland-y-utils/DataSource';
import { XView } from 'react-mental';
import { XScrollValues, XScrollView3 } from 'openland-x/XScrollView3';
import { throttle } from 'openland-y-utils/timer';

function useDataSource<T extends DataSourceItem>(dataSource: ReadableDataSource<T>): [T[], boolean] {
    let [items, setItems] = React.useState<T[]>([]);
    let [completed, setCompleted] = React.useState<boolean>(false);
    let [completedForward, setCompletedForward] = React.useState<boolean>(false);
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
                onDataSourceLoadedMoreForward: (ndata: T[], isCompleted: boolean) => {
                    let data = [...ndata, ...lastData];
                    lastData = data;
                    setItems(data);
                    setCompletedForward(isCompleted);
                },
                onDataSourceCompleted: () => {
                    setCompleted(true);
                },
                onDataSourceCompletedForward: () => {
                    setCompletedForward(true);
                },
                onDataSourceScrollToKeyRequested: () => {
                    //
                },
            });
            return w;
        },
        [dataSource],
    );
    return [items, completed];
}

export interface XListViewProps<T extends DataSourceItem> {
    dataSource: ReadableDataSource<T>;
    itemHeight: number;
    loadingHeight: number;
    renderItem: (item: T) => React.ReactElement<any>;
    renderLoading: () => React.ReactElement<any>;
    beforeChildren?: any;
    afterChildren?: any;
    WrapChildrenComponent?: any;
}

const DefaultWrapChildrenComponent = ({ children }: { children: any }) => {
    return <XView flexDirection="column">{children}</XView>;
};

export const XListView = React.memo(function <T extends DataSourceItem>(props: XListViewProps<T>) {
    let [items, completed] = useDataSource(props.dataSource);

    const needMore = React.useMemo(
        () =>
            throttle(() => {
                props.dataSource.needMore();
            }, 500),

        [props.dataSource],
    );
    let onScroll = React.useCallback(
        (values: XScrollValues) => {
            let d = values.scrollHeight - (values.clientHeight + values.scrollTop);
            if (d < props.loadingHeight) {
                needMore();
            }
        },
        [needMore],
    );

    const WrapChildrenComponent = props.WrapChildrenComponent
        ? props.WrapChildrenComponent
        : DefaultWrapChildrenComponent;

    return (
        <XScrollView3 onScroll={onScroll} flexGrow={1} flexShrink={1}>
            <WrapChildrenComponent>
                {props.beforeChildren}
                {items.map(v => (
                    <XView key={'item-' + v.key}>{props.renderItem(v)}</XView>
                ))}
                {!completed && props.renderLoading()}
                {props.afterChildren}
            </WrapChildrenComponent>
        </XScrollView3>
    );
});
