import * as React from 'react';
import { useKeyupDown } from './useKeyupDown';
import { emojiList } from './utils/emojiList';

export type useEmojiSuggestionsT = {
    activeWord: string;
};

const shortNames: any[] = Object.keys(emojiList.list);

export function useEmojiSuggestions({ activeWord }: useEmojiSuggestionsT) {
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    React.useEffect(() => {
        const emojiValue = activeWord.substring(1, activeWord.length).toLowerCase();
        const filteredValues = shortNames.filter(
            (emojiShortName: string) => !emojiValue || emojiShortName.indexOf(emojiValue) > -1,
        );
        setSuggestions(filteredValues.slice(0, 9));
    }, [activeWord]);

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: suggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
    });

    return {
        handleUp,
        handleDown,
        suggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
    };
}
