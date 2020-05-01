import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../components/withApp';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { XScrollValues, XScrollView3 } from 'openland-x/XScrollView3';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';

const TracesFragment = React.memo(() => {
    const client = useClient();
    const traces = client.useDebugGqlTraces({ first: 30 }).debugGqlTraces;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(traces.cursor);
    const [displayItems, setDisplayItems] = React.useState(traces.items);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 30;

        const loaded = await client.queryDebugGqlTraces({ first, after });
        const { items, cursor } = loaded.debugGqlTraces;

        setAfter(cursor);
        setDisplayItems((prev) => prev.concat(items));
        setLoading(false);
    }, [after, loading]);

    const onScroll = async (values: XScrollValues) => {
        const loadingHeight = 200;
        const d = values.scrollHeight - (values.clientHeight + values.scrollTop);

        if (d < loadingHeight) {
            await handleLoadMore();
        }
    };
    return (
        <XView flexDirection="column" alignSelf="stretch" flexGrow={1} flexShrink={1}>
            <XScrollView3 flexGrow={1} flexShrink={1} onScroll={onScroll}>
                {displayItems.map((item, index) => (
                    <XView
                        key={'item-' + index}
                        cursor="pointer"
                        path={`/super/trace/${item.id}`}
                        hoverBackgroundColor={'#eee'}
                        borderRadius={8}
                        paddingHorizontal={16}
                        paddingVertical={16}
                        justifyContent="center"
                    >
                        <XView flexDirection="column" justifyContent="center">
                            <XView flexDirection="row" alignItems="center">
                                <span>
                                    {item.name.split(' ').map((i, j) => {
                                        if (j === 0) {
                                            return (
                                                <span
                                                    key={'word-1' + index + j}
                                                    style={{ fontWeight: 'bold' }}
                                                >
                                                    {i}
                                                </span>
                                            );
                                        }
                                        if (j === 1) {
                                            return (
                                                <span key={'word-2' + index + j}>{` ${i} `}</span>
                                            );
                                        }
                                        return (
                                            <span
                                                key={'word-3' + index + j}
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                {i}
                                            </span>
                                        );
                                    })}
                                </span>
                            </XView>
                            <XView
                                height={50}
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <XView>
                                    <span style={{ fontWeight: 'bold' }}>{item.duration}ms</span>
                                </XView>
                                <XView>{formatDateTime(Number(item.date))}</XView>
                            </XView>
                        </XView>
                    </XView>
                ))}
                <XView height={56} alignItems="center" justifyContent="center">
                    {loading && <XLoader loading={true} />}
                </XView>
            </XScrollView3>
        </XView>
    );
});

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    return (
        <DevToolsScaffold title="GQL Traces" scroll="disable">
            <TracesFragment />
        </DevToolsScaffold>
    );
});
