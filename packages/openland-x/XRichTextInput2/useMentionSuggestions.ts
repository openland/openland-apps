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
                ({ name }: { name: string }) => {
                    const user = name.split(' ');
                    const firstName = user[0];
                    const lastName = user[1];
                    const finedFirstName = firstName.toLowerCase().startsWith(searchText);
                    const finedLastName = lastName.toLowerCase().startsWith(searchText);
                    if (finedFirstName) {
                        return (
                            name.toLowerCase().includes(searchText) &&
                            activeWord !== '' &&
                            activeWord[0] === '@'
                        );
                    } else if (finedLastName) {
                        return (
                            name.toLowerCase().includes(searchText) &&
                            activeWord !== '' &&
                            activeWord[0] === '@'
                        );
                    } else {
                        return (
                            name.toLowerCase().startsWith(searchText) &&
                            activeWord !== '' &&
                            activeWord[0] === '@'
                        );
                    }
                },
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
