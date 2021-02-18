
import * as React from 'react';

type State<ItemType> = {
    items: ItemType[],
    cursor: string | null,
    loading: boolean,
};

type Action<ItemType> = { type: 'start' } | { type: 'success', items: ItemType[], cursor: string | null };

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
    let [{ items, cursor, loading }, dispatch] = React.useReducer<React.Reducer<State<ItemType>, Action<ItemType>>>(
        (oldState, action) => {
            if (action.type === 'start') {
                return { ...oldState, loading: true };
            }
            if (action.type === 'success') {
                return { ...oldState, loading: false, items: oldState.items.concat(action.items), cursor: action.cursor };
            }
            return oldState;
        },
        { loading: false, cursor: initialCursor, items: initialItems || [] }
    );
    return {
        items,
        cursor,
        loading,
        loadMore: async () => {
            if (loading || (!cursor && items.length > 0)) {
                return;
            }
            dispatch({ type: 'start' });

            let fetchedData = await fetchItems(cursor);

            dispatch({ type: 'success', items: fetchedData.items || [], cursor: fetchedData.cursor });
        },
    };
};
