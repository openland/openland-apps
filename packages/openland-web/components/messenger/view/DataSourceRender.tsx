import * as React from 'react';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';

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
    renderItem: (item: T) => React.ReactElement<any>;
    renderLoading: () => React.ReactElement<any>;
    reverce?: boolean;
    wrapWith?: any;
}

export const DataSourceRender = React.memo(function<T extends DataSourceItem>(
    props: XListViewProps<T>,
) {
    let [items, completed] = useDataSource(props.dataSource);
    if (props.reverce) {
        items = [...items];
        items.reverse();
    }
    return (
        <>
            {items && props.wrapWith && (
                <props.wrapWith>
                    {!completed && props.reverce && props.renderLoading()}
                    {items.map(i => props.renderItem(i))}
                    {!completed && !props.reverce && props.renderLoading()}
                </props.wrapWith>
            )}
            {items && !props.wrapWith && (
                <>
                    {!completed && props.reverce && props.renderLoading()}
                    {items.map(i => props.renderItem(i))}
                    {!completed && !props.reverce && props.renderLoading()}
                </>
            )}
        </>
    );
});

DataSourceRender.displayName = 'DataSourceRender';
