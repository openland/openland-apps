export const useKeyupDown = ({
    isSelecting,
    suggestionsList,
    selectedEntryIndex,
    setSelectedEntryIndex,
}: {
    isSelecting: boolean;
    suggestionsList: any[];
    selectedEntryIndex: number;
    setSelectedEntryIndex: Function;
}) => {
    const boundSelection = (index: number) => {
        if (index > suggestionsList.length - 1) {
            return 0;
        }
        if (index < 0) {
            return suggestionsList.length - 1;
        }
        return index;
    };

    const handleUp = (event: React.KeyboardEvent<any>) => {
        if (isSelecting) {
            event.preventDefault();
            setSelectedEntryIndex(boundSelection(selectedEntryIndex - 1));
        }
    };

    const handleDown = (event: React.KeyboardEvent<any>) => {
        if (isSelecting) {
            event.preventDefault();
            setSelectedEntryIndex(boundSelection(selectedEntryIndex + 1));
        }
    };

    return { handleUp, handleDown };
};
