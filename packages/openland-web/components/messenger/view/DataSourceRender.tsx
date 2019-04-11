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
    renderItem: React.ComponentClass<T> | React.StatelessComponent<T>;
    renderLoading: React.ComponentClass<any> | React.StatelessComponent<any>;
    reverce?: boolean;
    wrapWith?: any;
}

const WrapWith = React.memo(({
    WrapWithComponent,
    reverce,
    completed,
    LoadingComponent,
    children,
}: {
        WrapWithComponent: any;
        reverce?: boolean;
        completed: boolean;
        LoadingComponent: any;
        children: any;
    }) => {
    if (!WrapWithComponent) {
        return (
            <>
                {!completed && reverce && <LoadingComponent />}
                {children}
                {!completed && !reverce && <LoadingComponent />}
            </>
        );
    }
    return (
        <WrapWithComponent>
            {!completed && reverce && <LoadingComponent />}
            {children}
            {!completed && !reverce && <LoadingComponent />}
        </WrapWithComponent>
    );
});

export const DataSourceRender = React.memo(function <T extends DataSourceItem>(
    props: XListViewProps<T>,
) {
    let [items, completed] = useDataSource(props.dataSource);

    let renderedItems: any = [];
    if (props.reverce) {
        for (let i = items.length - 1; i >= 0; i--) {
            renderedItems.push(<props.renderItem {...items[i]} key={items[i].key} />);
        }
    } else {
        renderedItems = items.map((i, key) => <props.renderItem {...i} key={key} />);
    }

    return (
        <WrapWith
            LoadingComponent={props.renderLoading}
            reverce={props.reverce}
            WrapWithComponent={props.wrapWith}
            completed={completed}
        >
            {renderedItems}
        </WrapWith>
    );
});

DataSourceRender.displayName = 'DataSourceRender';
