import * as React from 'react';
import { MentionDataT } from './components/MentionSuggestionsEntry';
import { useKeyupDown } from './useKeyupDown';

export type useMentionSuggestionsT = {
    activeWord: string;
    mentionsData?: MentionDataT[];
};

export function useMentionSuggestions({ mentionsData, activeWord }: useMentionSuggestionsT) {
    const [suggestions, setSuggestions] = React.useState<MentionDataT[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: suggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
    });

    React.useLayoutEffect(() => {
        const filteredSuggestions = (mentionsData ? mentionsData : []).filter(
            ({ name }: { name: string }) =>
                name.includes(activeWord.slice(1)) && activeWord !== '' && activeWord[0] === '@',
        );

        setSuggestions(filteredSuggestions);
    }, [mentionsData]);

    return {
        handleUp,
        handleDown,
        suggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
    };
}
