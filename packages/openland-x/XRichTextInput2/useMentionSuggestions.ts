import * as React from 'react';

import { MentionDataT } from './';

export type useMentionSuggestionsT = {
    activeWord: string;
    mentionsData?: MentionDataT[];
};

export function useMentionSuggestions({ mentionsData, activeWord }: useMentionSuggestionsT) {
    const [suggestions, setSuggestions] = React.useState<MentionDataT[] | undefined>(
        mentionsData || [],
    );
    const [selectedMentionEntry, setSelectedMentionEntry] = React.useState(0);

    const filteredSuggestions = (suggestions ? suggestions : []).filter(
        ({ name }: { name: string }) =>
            name.includes(activeWord.slice(1)) && activeWord !== '' && activeWord[0] === '@',
    );

    const boundMentionSelection = (index: number) => {
        return Math.min(Math.max(0, index), filteredSuggestions.length - 1);
    };

    const shouldShowSuggestions = () => {
        return !!filteredSuggestions.length;
    };

    const handleUp = (event: React.KeyboardEvent<any>) => {
        if (!shouldShowSuggestions()) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();

        setSelectedMentionEntry(boundMentionSelection(selectedMentionEntry - 1));
    };

    const handleDown = (event: React.KeyboardEvent<any>) => {
        if (!shouldShowSuggestions()) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        setSelectedMentionEntry(boundMentionSelection(selectedMentionEntry + 1));
    };

    React.useLayoutEffect(() => {
        setSuggestions(mentionsData);
    }, [mentionsData]);

    return { handleUp, handleDown, filteredSuggestions, selectedMentionEntry };
}
