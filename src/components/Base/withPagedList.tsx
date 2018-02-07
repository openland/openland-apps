import * as React from 'react';
import { ListQueryPagedData } from '../../utils/graphqlList';
import { XPaging } from '../X/XPaging';

export function withPagedList<TResult extends { id: string }>(WrappedComponent: React.ComponentType<{
    items: TResult[],
    itemsCount: number,
    pagesCount: number,
    currentPage: number,
    loading: boolean,
    openEnded: boolean,
}>): React.ComponentType<ListQueryPagedData<TResult> & { filter?: boolean }> {
    return function (props: ListQueryPagedData<TResult> & { filter?: boolean }) {
        if (props.data.items) {
            return (
                <div>
                    <WrappedComponent
                        items={props.data.items!!.edges.map((p) => p.node)}
                        loading={props.data.loading}
                        itemsCount={props.data.items.pageInfo.itemsCount}
                        currentPage={props.data.items.pageInfo.currentPage}
                        pagesCount={props.data.items.pageInfo.pagesCount}
                        openEnded={props.data.items.pageInfo.openEnded}
                    />
                    <XPaging
                        totalPages={props.data.items.pageInfo.pagesCount}
                        currentPage={props.data.items.pageInfo.currentPage}
                        openEnded={props.data.items.pageInfo.openEnded}
                    />
                </div>
            );
        } else {
            return (
                // <div>
                //     <div style={{ position: 'relative' }}>
                //         <Dimmer active={props.data.loading} inverted={true}>
                //             <Loader inverted={true} content="Loading" />
                //         </Dimmer>
                <WrappedComponent items={[]}
                    loading={true}
                    itemsCount={0}
                    currentPage={0}
                    pagesCount={0}
                    openEnded={true}
                />
                //     </div>
                //     <div style={{ minHeight: 56, paddingTop: 12 }}>
                //         <XPaging
                //             totalPages={0}
                //             currentPage={0}
                //             openEnded={true} />
                //     </div>
                // </div>
            );
        }
    };
}