import * as React from 'react';
import { useKeyupDown } from './useKeyupDown';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UserShort } from 'openland-api/Types';

export type useMentionSuggestionsT = {
    activeWord: string;
    mentionsData?: UserWithOffset[];
};

export type MentionSuggestionsStateT = {
    handleUp: Function;
    handleDown: Function;
    suggestions: UserShort[];
    setSelectedEntryIndex: (a: number) => void;
    selectedEntryIndex: number;
    isSelecting: boolean;
};

export const useMentionSuggestions = ({
    mentionsData,
    activeWord,
}: useMentionSuggestionsT): MentionSuggestionsStateT => {
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<UserShort[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: suggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
        isSelecting,
    });

    React.useLayoutEffect(() => {
        const alphabetSort = activeWord.startsWith('@') && activeWord.length === 1;
        const searchText = activeWord.slice(1).toLowerCase();

        let filteredSuggestions = (mentionsData ? mentionsData : [])
            .filter(({ user: { name } }: { user: { name: string } }) => {
                const validator = activeWord !== '' && activeWord[0] === '@';
                const user = name.split(' ');
                const finedFirstName = user[0].toLowerCase().startsWith(searchText);
                const finedLastName = user[1] ? user[1].toLowerCase().startsWith(searchText) : null;
                if (finedFirstName) {
                    return 1 && validator;
                } else if (finedLastName) {
                    return 1 && validator;
                } else {
                    return name.toLowerCase().startsWith(searchText) && validator;
                }
            })
            .sort((a, b) => b.user.name.toLowerCase().localeCompare(a.user.name.toLowerCase()));
        if (alphabetSort) {
            filteredSuggestions = (mentionsData ? mentionsData : []).sort((a, b) =>
                a.user.name.toLowerCase().localeCompare(b.user.name.toLowerCase()),
            );
        }

        setIsSelecting(activeWord.startsWith('@') && !!filteredSuggestions.length);
        setSuggestions(filteredSuggestions.map(({ user }: { user: UserShort }) => user));
    }, [mentionsData, activeWord]);

    return {
        isSelecting,
        handleUp,
        handleDown,
        suggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
    };
};
