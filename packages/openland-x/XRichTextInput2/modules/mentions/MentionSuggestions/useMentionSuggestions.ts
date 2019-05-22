import * as React from 'react';
import { useKeyupDown } from '../../../modules/useKeyupDown';
import { UserForMention } from 'openland-api/Types';

export type useMentionSuggestionsT = {
    activeWord: string;
    getMentionsSuggestions: () => Promise<UserForMention[]>;
};

export type MentionSuggestionsStateT = {
    handleUp: Function;
    handleDown: Function;
    suggestions: SuggestionTypeT[];
    setSelectedEntryIndex: (a: number) => void;
    selectedEntryIndex: number;
    isSelecting: boolean;
    isLoaded: boolean;
};

export type SuggestionTypeT =
    | UserForMention
    | {
          __typename: 'AllMention';
      };

export const useMentionSuggestions = ({
    getMentionsSuggestions,
    activeWord,
}: useMentionSuggestionsT): MentionSuggestionsStateT => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isPreload, setIsPreload] = React.useState(true);
    let [isSelecting, setIsSelecting] = React.useState(false);
    let [finalFilteredSuggestions, setFilteredSuggestions] = React.useState<SuggestionTypeT[]>([]);
    const [initialSuggestions, setInitialSuggestions] = React.useState<UserForMention[]>([]);
    const [selectedEntryIndex, setSelectedEntryIndex] = React.useState(0);

    // isSelecting = true;

    // finalFilteredSuggestions = [
    //     {
    //         __typename: 'AllMention',
    //     },
    //     {
    //         id: '1pkzZ9z6YzTaxv0P6YvXCLv9yy',
    //         name: 'dev lapin 🎉',
    //         photo:
    //             'https://ucarecdn.com/f2a18548-dd22-432b-98ea-82b5c4215dfb/-/crop/1050x1050/315,0/',
    //         primaryOrganization: {
    //             id: 'g09417DZA9c1j9vKJKMmudA5nJ',
    //             name: 'test-123',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    //     {
    //         id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    //         name: 'Sergey Lapin',
    //         photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/447x447/0,0/',
    //         primaryOrganization: {
    //             id: '61gk9KRrl9ComJkvYnvdcddr4o',
    //             name: 'Openland',
    //             __typename: 'Organization',
    //         },
    //         __typename: 'User',
    //     },
    // ];

    let finalFinalSuggestions = [
        {
            __typename: 'AllMention',
        },
        ...(isPreload ? finalFilteredSuggestions.slice(0, 50) : finalFilteredSuggestions),
    ] as SuggestionTypeT[];

    const { handleUp, handleDown } = useKeyupDown({
        suggestionsList: finalFinalSuggestions,
        selectedEntryIndex,
        setSelectedEntryIndex,
        isSelecting,
    });

    React.useEffect(() => {
        setIsLoading(true);
        if (!isLoaded && !isLoading) {
            (async () => {
                const result = await getMentionsSuggestions();
                setInitialSuggestions(result);
                setIsLoaded(true);
            })();
        }
    }, []);

    // React.useEffect(() => {
    //     if (finalFilteredSuggestions.length && isPreload && isSelecting) {
    //         setTimeout(() => {
    //             setIsPreload(false);
    //         }, 1000);
    //     }
    // }, [finalFilteredSuggestions, isSelecting]);

    React.useEffect(() => {
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
        suggestions: finalFinalSuggestions,
        setSelectedEntryIndex,
        selectedEntryIndex,
        isLoaded,
    };
};
