import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';

interface UFlatListProps<T> {
    track: string;
    loadMore: () => void;
    loading: boolean;
    loadingHeight?: number;
    items: T[];
    renderItem: (item: T) => JSX.Element;
    padded?: boolean;
    children?: any;
}

export const UFlatList: <T>(props: UFlatListProps<T>) => any = React.memo((props) => {
    const { loadMore, loading, loadingHeight = 200, children, items, padded, track } = props;
    const onScroll = (values: XScrollValues) => {
        const d = values.scrollHeight - (values.clientHeight + values.scrollTop);

        if (d < loadingHeight) {
            loadMore();
        }
    };

    return (
        <Page onScroll={onScroll} padded={padded} track={track}>
            {children}
            {items.map((item, index) => (
                <XView key={'item-' + index}>{props.renderItem(item)}</XView>
            ))}
            {loading && (
                <XView height={56} alignItems="center" justifyContent="center">
                    <XLoader />
                </XView>
            )}
        </Page>
    );
});