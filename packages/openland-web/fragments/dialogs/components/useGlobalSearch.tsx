import { useClient } from 'openland-api/useClient';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { DialogSearchResults } from './DialogSearchResults';
import { useListSelection } from 'openland-web/utils/useListSelection';

export const useGlobalSearch = (opts: DialogSearchResults) => {
    const client = useClient();
    const { items } = client.useGlobalSearch(opts.variables, {
        fetchPolicy: 'cache-and-network',
    });
    const { selectedIndex, setSelectedIndex } = useListSelection({ maxIndex: items.length - 1 });

    useShortcuts([
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
        selectedIndex,
        setSelectedIndex,
    };
};
