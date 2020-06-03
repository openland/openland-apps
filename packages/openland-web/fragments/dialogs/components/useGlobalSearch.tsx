import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { DialogSearchResults } from './DialogSearchResults';

export const useGlobalSearch = (opts: DialogSearchResults) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const client = useClient();
    const { items } = client.useGlobalSearch(opts.variables, {
        fetchPolicy: 'cache-and-network',
    });

    const handleOptionUp = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex - 1, 0), items.length - 1));

        return;
    };

    const handleOptionDown = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex + 1, 0), items.length - 1));

        return;
    };

    useShortcuts([
        { keys: ['ArrowUp'], callback: handleOptionUp },
        { keys: ['ArrowDown'], callback: handleOptionDown },
        {
            keys: ['Enter'],
            callback: () => {
                let d = items[selectedIndex];
                if (d) {
                    opts.onPick(d);
                }
            },
        },
    ]);

    return {
        items,
        selectedIndex
    };
};