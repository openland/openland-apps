import * as React from 'react';

type State<ItemType> = {
    items: ItemType[],
    cursor: string | null,
    loading: boolean,
    allFetched?: boolean,
};

type Action<ItemType> = { type: 'start' } | { type: 'inited' } | { type: 'success', items: ItemType[], cursor: string | null };

export const usePagination = <ItemType>(
    {
        fetchItems,
        initialItems,
        initialCursor,
        initialAllFetched,
    }:
        {
            fetchItems: (cursor: string | null) => Promise<{ items: ItemType[], cursor: string | null, hasNext?: boolean }>,
            initialItems: ItemType[],
            initialCursor: string | null,
            initialAllFetched?: boolean,
        }
) => {
    let [{ items, cursor, loading, allFetched }, dispatch] = React.useReducer<React.Reducer<State<ItemType>, Action<ItemType>>>(
        (oldState, action) => {
            if (action.type === 'start') {
                return { ...oldState, loading: true };
            }
            if (action.type === 'success') {
                return { ...oldState, loading: false, items: oldState.items.concat(action.items), cursor: action.cursor };
            }
            return oldState;
        },
        { loading: false, cursor: initialCursor, items: initialItems || [], allFetched: initialAllFetched }
    );
    return {
        items,
        cursor,
        loading: loading && !allFetched,
        loadMore: async () => {
            if (loading || (!cursor && items.length > 0) || allFetched) {
                return;
            }
            dispatch({ type: 'start' });

            let fetchedData = await fetchItems(cursor);

            dispatch({ type: 'success', items: fetchedData.items || [], cursor: fetchedData.cursor });
        },
    };
};
