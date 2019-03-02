export const useKeyupDown = ({
    suggestionsList,
    selectedEntryIndex,
    setSelectedEntryIndex,
}: {
    suggestionsList: any[];
    selectedEntryIndex: number;
    setSelectedEntryIndex: Function;
}) => {
    const boundSelection = (index: number) => {
        return Math.min(Math.max(0, index), suggestionsList.length - 1);
    };

    const handleUp = (event: React.KeyboardEvent<any>) => {
        if (!suggestionsList.length) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();

        setSelectedEntryIndex(boundSelection(selectedEntryIndex - 1));
    };

    const handleDown = (event: React.KeyboardEvent<any>) => {
        if (!suggestionsList.length) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        setSelectedEntryIndex(boundSelection(selectedEntryIndex + 1));
    };

    return { handleUp, handleDown };
};
