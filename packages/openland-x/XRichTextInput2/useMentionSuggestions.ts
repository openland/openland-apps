import * as React from 'react';
import { MentionDataT } from './components/MentionSuggestionsEntry';
import { useKeyupDown } from './useKeyupDown';

export type useMentionSuggestionsT = {
    activeWord: string;
    mentionsData?: MentionDataT[];
};

export function useMentionSuggestions({ mentionsData, activeWord }: useMentionSuggestionsT) {
    const [suggestions, setSuggestions] = React.useState<MentionDataT[] | undefined>(
        mentionsData || [],
    );
    const [selectedMentionEntryIndex, setSelectedMentionEntryIndex] = React.useState(0);

    const filteredSuggestions = (suggestions ? suggestions : []).filter(
        ({ name }: { name: string }) =>
            name.includes(activeWord.slice(1)) && activeWord !== '' && activeWord[0] === '@',
    );
    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: filteredSuggestions,
        selectedEntryIndex: selectedMentionEntryIndex,
        setSelectedEntryIndex: setSelectedMentionEntryIndex,
    });

    const getSelectedMentionId = (id: number) => {
        return filteredSuggestions[id];
    };

    React.useLayoutEffect(() => {
        setSuggestions(mentionsData);
    }, [mentionsData]);

    return {
        handleUp,
        handleDown,
        filteredSuggestions,
        setSelectedMentionEntryIndex,
        selectedMentionEntryIndex,
        getSelectedMentionId,
    };
}
