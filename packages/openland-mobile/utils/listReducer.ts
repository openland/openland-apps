
import * as React from 'react';

type State<ItemType> = {
    items: ItemType[],
    cursor: string | null,
    loading: boolean,
    inited: boolean,
};

type Action<ItemType> = { type: 'start' } | { type: 'inited' } | { type: 'success', items: ItemType[], cursor: string | null };

export const useListReducer = <ItemType>(
    {
        fetchItems,
        initialItems,
        initialCursor,
    }:
        {
            fetchItems: (cursor: string | null) => Promise<{ items: ItemType[], cursor: string | null }>,
            initialItems: ItemType[],
            initialCursor: string | null,
        }
) => {
    let [{ items, cursor, loading, inited }, dispatch] = React.useReducer<React.Reducer<State<ItemType>, Action<ItemType>>>(
        (oldState, action) => {
            if (action.type === 'inited') {
                return { ...oldState, inited: true };
            }
            if (action.type === 'start') {
                return { ...oldState, loading: true };
            }
            if (action.type === 'success') {
                return { ...oldState, loading: false, inited: true, items: oldState.items.concat(action.items), cursor: action.cursor };
            }
            return oldState;
        },
        { inited: false, loading: false, cursor: initialCursor, items: initialItems || [] }
    );
    return {
        items,
        cursor,
        loading,
        inited,
        loadMore: async () => {
            if (loading || (!cursor && items.length > 0)) {
                return dispatch({ type: 'inited' });
            }
            dispatch({ type: 'start' });

            let fetchedData = await fetchItems(cursor);

            dispatch({ type: 'success', items: fetchedData.items || [], cursor: fetchedData.cursor });
        },
    };
};
