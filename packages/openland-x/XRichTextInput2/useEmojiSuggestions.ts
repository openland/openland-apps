import * as React from 'react';
import { useKeyupDown } from './useKeyupDown';
import { emojiList } from './utils/emojiList';
import { getSplittedEmoji, isShortNameEmoji } from './dataConversion';

export type useEmojiSuggestionsT = {
    activeWord: string;
};

const myEmojiList: any[] = emojiList.list;

export type EmojiDataT = {
    shortName: string;
    unified: string;
};

export type EmojiSuggestionsStateT = {
    isSelecting: boolean;
    handleUp: Function;
    handleDown: Function;
    suggestions: EmojiDataT[];
    setSelectedEntryIndex: (a: number) => void;
    selectedEntryIndex: number;
};

export const useEmojiSuggestions = ({
    activeWord,
}: useEmojiSuggestionsT): EmojiSuggestionsStateT => {
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<EmojiDataT[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    React.useEffect(() => {
        if (!activeWord.includes(':')) {
            setIsSelecting(false);
            setSuggestions([]);
            return;
        }

        let finalActiveWord = activeWord;

        // this is to make consequence emoji selection work
        if (activeWord.length > 1) {
            const splitted = getSplittedEmoji(activeWord.slice(0, -1));

            if (
                activeWord[activeWord.length - 1] === ':' &&
                isShortNameEmoji(splitted[splitted.length - 1])
            ) {
                finalActiveWord = activeWord.slice(activeWord.length - 1);
            }
        }

        const emojiValue = finalActiveWord.toLowerCase();

        const filteredValues = Object.keys(myEmojiList)
            .filter(
                (emojiShortName: string) => !emojiValue || emojiShortName.indexOf(emojiValue) > -1,
            )
            .map(shortName => {
                return {
                    shortName,
                    unified: myEmojiList[shortName],
                };
            });

        const nextSelectedEntryIndex = Math.min(selectedEntryIndex, filteredValues.length - 1);
        if (nextSelectedEntryIndex !== selectedEntryIndex) {
            setSelectedEntryIndex(nextSelectedEntryIndex);
        }

        setIsSelecting(finalActiveWord.startsWith(':') && !!filteredValues.length);
        setSuggestions(filteredValues.slice(0, 9));
    }, [activeWord]);

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: suggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
        isSelecting,
    });

    return {
        isSelecting,
        handleUp,
        handleDown,
        suggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
    };
};
