import * as React from 'react';
import { DataSourceItem, ReadableDataSource, useDataSource } from 'openland-y-utils/DataSource';
import { XView } from 'react-mental';
import { XScrollValues, XScrollView3 } from 'openland-x/XScrollView3';
import { throttle } from 'openland-y-utils/timer';

export interface XListViewProps<T extends DataSourceItem> {
    dataSource: ReadableDataSource<T>;
    itemHeight: number;
    loadingHeight: number;
    renderItem: (item: T) => React.ReactElement<any>;
    renderLoading: () => JSX.Element;
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
        <XScrollView3 onScroll={onScroll} flexGrow={1} flexShrink={1} useDefaultScroll={true}>
            <WrapChildrenComponent>
                {completed && props.beforeChildren}
                {items.map(v => (
                    <XView key={'item-' + v.key}>{props.renderItem(v)}</XView>
                ))}
                {!completed && props.renderLoading()}
                {completed && props.afterChildren}
            </WrapChildrenComponent>
        </XScrollView3>
    );
});
