import * as React from 'react';
import { DataSourceItem, ReadableDataSource } from 'openland-y-utils/DataSource';

function useDataSource<T extends DataSourceItem>(
    dataSource: ReadableDataSource<T>,
): [T[], boolean, boolean, { scrollTo: string | undefined }] {
    let [items, setItems] = React.useState<T[]>([]);
    let [scrollToHolder, setScrollTo] = React.useState<{ scrollTo: string | undefined }>({ scrollTo: undefined });
    let [completed, setCompleted] = React.useState<boolean>(false);
    let [completedForward, setCompletedForward] = React.useState<boolean>(true);
    React.useEffect(
        () => {
            let lastData: T[] = [];
            let w = dataSource.watch({
                onDataSourceInited: (data: T[], isCompleted: boolean, isCompletedForward: boolean) => {
                    lastData = [...data];
                    setItems(data);
                    setCompleted(isCompleted);
                    setCompletedForward(isCompletedForward);
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
                    // setCompletedForward(true);
                },
                onDataSourceScrollToKeyRequested: scrollTo => {
                    setScrollTo({ scrollTo });
                },
            });
            return w;
        },
        [dataSource],
    );

    return [items, completed, completedForward, scrollToHolder];
}

export interface XListViewProps<T extends DataSourceItem> {
    dataSource: ReadableDataSource<T>;
    renderItem: React.ComponentClass<{ item: T }> | React.StatelessComponent<{ item: T }>;
    renderLoading: React.ComponentClass<any> | React.StatelessComponent<any>;
    renderEmpty?: () => JSX.Element;
    reverce?: boolean;
    wrapWith?: any;
    onUpdated?: () => void;
    onScrollToReqested?: (target: number) => void;
}

const WrapWith = React.memo(
    ({
        WrapWithComponent,
        reverce,
        completed,
        completedForward,
        LoadingComponent,
        children,
    }: {
        WrapWithComponent: any;
        reverce?: boolean;
        completed: boolean;
        completedForward: boolean;
        LoadingComponent: any;
        children: any;
    }) => {
        if (!WrapWithComponent) {
            return (
                <>
                    {(reverce ? !completed : !completedForward) && <LoadingComponent />}
                    {children}
                    {(reverce ? !completedForward : !completed) && <LoadingComponent />}
                </>
            );
        }
        return (
            <WrapWithComponent>
                {(reverce ? !completed : !completedForward) && <LoadingComponent />}
                {children}
                {(reverce ? !completedForward : !completed) && <LoadingComponent />}
            </WrapWithComponent>
        );
    },
);

export const DataSourceRender = React.memo(function <T extends DataSourceItem>(
    props: XListViewProps<T>,
) {
    let [items, completed, completedForward, scrollToHolder] = useDataSource(props.dataSource);

    if (props.reverce) {
        items = [...items];
        items.reverse();
    }

    let renderedItems = (props.renderEmpty && items.length <= 0) ? props.renderEmpty() : items.map((item, i) => {
        if (scrollToHolder.scrollTo === item.key) {
            scrollToHolder.scrollTo = undefined;

            (async () => {
                await null;
                if (props.onScrollToReqested) {
                    props.onScrollToReqested(i);

                }
            })();
        }
        return <props.renderItem
            key={item.key}
            item={item}
        />;
    });

    if (props.onUpdated) {
        props.onUpdated();
    }

    return (
        <WrapWith
            LoadingComponent={props.renderLoading}
            reverce={props.reverce}
            WrapWithComponent={props.wrapWith}
            completed={completed}
            completedForward={completedForward}
        >
            {renderedItems}
        </WrapWith>
    );
});

DataSourceRender.displayName = 'DataSourceRender';
