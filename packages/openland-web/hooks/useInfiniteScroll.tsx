import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { DataSource } from 'openland-y-utils/DataSource';
import { XView } from 'react-mental';

export function useInfiniteScroll({
    initialLoadFunction,
    queryOnNeedMore,
    convertToDataSource,
}: {
    initialLoadFunction: any;
    queryOnNeedMore: any;
    convertToDataSource: Function;
}) {
    const [currentPage, setCurrentPage] = React.useState(0);
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
        ds.initialize(convertToDataSource(data), false);

        return ds;
    }, []);

    const getLastItem = () => {
        return dataSource.getAt(dataSource.getSize() - 1);
    };

    React.useEffect(() => {
        (async () => {
            const loadedData = await queryOnNeedMore({ currentPage, getLastItem });
            const converted = convertToDataSource(loadedData);
            const isCompleted = converted.length === 0;

            dataSource.loadedMore(convertToDataSource(loadedData), isCompleted);
        })();
    }, [currentPage]);

    return { dataSource, renderLoading };
}
