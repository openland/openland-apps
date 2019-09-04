import * as React from 'react';
import { DataSourceItem, ReadableDataSource, useDataSource } from 'openland-y-utils/DataSource';
import { throttle } from 'openland-y-utils/timer';
import { SScrollView } from 'react-native-s/SScrollView';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export interface DataSourceRenderProps<T extends DataSourceItem> {
    dataSource: ReadableDataSource<T>;
    renderItem: React.ComponentClass<{ item: T }> | React.StatelessComponent<{ item: T }>;
    renderLoading: React.ComponentClass<any> | React.StatelessComponent<any>;
    renderEmpty: () => JSX.Element;
    loadingHeight?: number;
}

export const DataSourceRender = React.memo(function <T extends DataSourceItem>(
    props: DataSourceRenderProps<T>,
) {
    const { dataSource, renderEmpty, loadingHeight = 200 } = props;
    let [items, completed, completedForward] = useDataSource(dataSource);

    const needMore = React.useMemo(
        () =>
            throttle(() => {
                dataSource.needMore();
            }, 500),
        [dataSource],
    );
    let onScroll = React.useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const scrollHeight = event.nativeEvent.contentSize.height;
            const clientHeight = event.nativeEvent.layoutMeasurement.height;
            const scrollTop = event.nativeEvent.contentOffset.y;

            let d = scrollHeight - (clientHeight + scrollTop);
            if (d < loadingHeight) {
                needMore();
            }
        },
        [needMore],
    );

    let renderedItems = (completedForward && completed && items.length <= 0) ? renderEmpty() : items.map((item, i) => {
        return (
            <props.renderItem
                key={item.key}
                item={item}
            />
        );
    });

    return (
        <SScrollView onScrollListener={onScroll}>
            {!completedForward && <props.renderLoading />}
            {renderedItems}
            {!completed && <props.renderLoading />}
        </SScrollView>
    );
});