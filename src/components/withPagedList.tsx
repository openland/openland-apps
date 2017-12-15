import { ListQueryPagedData } from '../utils/graphqlList';
import * as React from 'react';

export function withPagedList<TResult extends { id: string }>(WrappedComponent: React.ComponentType<{
    items: TResult[],
    itemsCount: number,
    pagesCount: number,
    currentPage: number,
    loading: boolean
}>): React.ComponentType<ListQueryPagedData<TResult>> {
    return function (props: ListQueryPagedData<TResult>) {
        if (props.data.items) {
            return (
                <WrappedComponent
                    items={props.data.items!!.edges.map((p) => p.node)}
                    loading={props.data.loading}
                    itemsCount={props.data.items.pageInfo.itemsCount}
                    currentPage={props.data.items.pageInfo.currentPage}
                    pagesCount={props.data.items.pageInfo.pagesCount}
                />
            );
        } else {
            return <WrappedComponent items={[]} loading={true} itemsCount={0} currentPage={0} pagesCount={0} />;
        }
    };
}