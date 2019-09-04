import * as React from 'react';
import { DataSourceItem, ReadableDataSource, useDataSource } from 'openland-y-utils/DataSource';

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
