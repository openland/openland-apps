import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { css } from 'linaria';

const container = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

interface UFlatListProps<T> {
    track?: string;
    loadMore: () => void;
    loading: boolean;
    loadingHeight?: number;
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
    padded?: boolean;
    children?: any;
    title?: string;
    grid?: boolean;
    gap?: number;
    listMinHeight?: number;
}

export const UFlatList: <T>(props: UFlatListProps<T>) => any = React.memo((props) => {
    const { loadMore, loading, loadingHeight = 200, children, items, track, padded, listMinHeight } = props;
    const onScroll = (values: XScrollValues) => {
        const d = values.scrollHeight - (values.clientHeight + values.scrollTop);

        if (d < loadingHeight) {
            loadMore();
        }
    };

    return (
        <Page onScroll={onScroll} track={track} padded={padded}>
            {!!props.title && <UHeader documentTitle={props.title} />}
            {props.gap && (
                <XView height={props.gap} />
            )}
            {children}

            <XView minHeight={listMinHeight}>
                {!props.grid &&
                    items.map((item, index) => (
                        <XView key={'item-' + index}>{props.renderItem(item, index)}</XView>
                    ))
                }

                {props.grid && (
                    <div className={container}>
                        {items.map((item, index) => (
                            <XView key={'item-' + index}>{props.renderItem(item, index)}</XView>
                        ))}
                    </div>
                )}
            </XView>

            <XView height={56} alignItems="center" justifyContent="center">
                {loading && <XLoader loading={true} />}
            </XView>
        </Page>
    );
});