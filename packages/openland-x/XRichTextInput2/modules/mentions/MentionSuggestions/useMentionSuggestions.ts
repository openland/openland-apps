import * as React from 'react';
import { useKeyupDown } from '../../../modules/useKeyupDown';
import { UserShort } from 'openland-api/Types';

export type useMentionSuggestionsT = {
    activeWord: string;
    getMentionsSuggestions: () => Promise<UserShort[]>;
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
    getMentionsSuggestions,
    activeWord,
}: useMentionSuggestionsT): MentionSuggestionsStateT => {
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [finalFilteredSuggestions, setFilteredSuggestions] = React.useState<UserShort[]>([]);
    const [initialSuggestions, setInitialSuggestions] = React.useState<UserShort[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: finalFilteredSuggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
        isSelecting,
    });

    React.useEffect(() => {
        (async () => {
            if (
                activeWord.startsWith('@') &&
                activeWord.length === 1 &&
                initialSuggestions.length === 0
            ) {
                setInitialSuggestions(await getMentionsSuggestions());
            }
        })();
    }, [getMentionsSuggestions, activeWord]);

    React.useLayoutEffect(() => {
        const alphabetSort = activeWord.startsWith('@') && activeWord.length === 1;
        const searchText = activeWord.slice(1).toLowerCase();

        let filteredSuggestions = (initialSuggestions ? initialSuggestions : [])
            .filter(({ name }: { name: string }) => {
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
            .sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));

        if (alphabetSort) {
            filteredSuggestions = (initialSuggestions ? initialSuggestions : []).sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
            );
        }

        setIsSelecting(activeWord.startsWith('@') && !!filteredSuggestions.length);
        setFilteredSuggestions(filteredSuggestions);
    }, [initialSuggestions, activeWord]);

    return {
        isSelecting,
        handleUp,
        handleDown,
        suggestions: finalFilteredSuggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
    };
};
