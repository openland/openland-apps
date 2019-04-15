import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { DataSource } from 'openland-y-utils/DataSource';
import { XView } from 'react-mental';

export function useInfiniteScroll({
    initialLoadFunction,
    queryOnNeedMore,
}: {
    initialLoadFunction: any;
    queryOnNeedMore: any;
}) {
    const [currentPage, setCurrentPage] = React.useState(1);

    const data = initialLoadFunction();

    const renderLoading = React.useMemo(() => {
        return () => {
            return (
                <XView height={50} justifyContent="center">
                    <XLoader loading={true} />
                </XView>
            );
        };
    }, []);

    let dataSource = React.useMemo(() => {
        const ds = new DataSource<any>(() => setCurrentPage((curPage: number) => curPage + 1));
        ds.initialize(data.items.edges.map(({ node }: any) => ({ ...node, key: node.id })), false);

        return ds;
    }, []);

    React.useEffect(() => {
        (async () => {
            const loadedData = await queryOnNeedMore({ currentPage });

            dataSource.loadedMore(
                loadedData.items.edges.map(({ node }: any) => ({ ...node, key: node.id })),
                false,
            );
        })();
    }, [currentPage]);

    return { dataSource, renderLoading };
}
