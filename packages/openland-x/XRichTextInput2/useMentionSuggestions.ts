import * as React from 'react';
import { MentionDataT } from './components/MentionSuggestionsEntry';
import { useKeyupDown } from './useKeyupDown';

export type useMentionSuggestionsT = {
    activeWord: string;
    mentionsData?: MentionDataT[];
};

export type MentionSuggestionsStateT = {
    handleUp: Function;
    handleDown: Function;
    suggestions: MentionDataT[];
    setSelectedEntryIndex: (a: number) => void;
    selectedEntryIndex: number;
    isSelecting: boolean;
};

export const useMentionSuggestions = ({
    mentionsData,
    activeWord,
}: useMentionSuggestionsT): MentionSuggestionsStateT => {
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<MentionDataT[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: suggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
        isSelecting,
    });

    React.useLayoutEffect(
        () => {
            const alphabetSort = activeWord.startsWith('@') && activeWord.length === 1;
            const searchText = activeWord.slice(1).toLowerCase();
            let filteredSuggestions = (mentionsData ? mentionsData : []).filter(
                ({ name }: { name: string }) =>
                    name.toLowerCase().startsWith(searchText) &&
                    activeWord !== '' &&
                    activeWord[0] === '@',
            );
            if (alphabetSort) {
                filteredSuggestions = (mentionsData ? mentionsData : []).sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
                );
            }

            setIsSelecting(activeWord.startsWith('@') && !!filteredSuggestions.length);
            setSuggestions(filteredSuggestions);
        },
        [mentionsData, activeWord],
    );

    return {
        isSelecting,
        handleUp,
        handleDown,
        suggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
    };
};
