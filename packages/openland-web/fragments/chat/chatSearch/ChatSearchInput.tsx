import React from 'react';
import { XView } from 'react-mental';

import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { ChatSearchEngine } from 'openland-engines/messenger/ChatSearchEngine';
import { ChatSearchContext } from 'openland-web/fragments/chat/MessengerFragment';
import { plural } from 'openland-y-utils/plural';

import CloseIcon from 'openland-icons/s/ic-close-24.svg';

interface ChatSearchInputProps {
    engine: ChatSearchEngine;
    queryInProgress: boolean;
    onSearchChange: (query: string) => void;
    onSearchClose: () => void;
}

export const ChatSearchInput = React.memo(
    ({ engine, queryInProgress, onSearchClose, onSearchChange }: ChatSearchInputProps) => {
        const [state, setState] = React.useState(() => engine.getState());
        const searchInputRef = React.useRef<USearchInputRef>(null);
        const chatSearchContext = React.useContext(ChatSearchContext);
        const { initialQuery } = chatSearchContext!.chatSearchState;

        React.useEffect(() => engine.subscribe(setState), []);
        React.useEffect(() => searchInputRef?.current?.focus(), [searchInputRef.current]);

        React.useEffect(() => {
            if (initialQuery) {
                onSearchChange(initialQuery);
            }
        }, []);

        let message;
        if (!queryInProgress) {
            const nothingFound = state.historyFullyLoaded && engine.dataSource.getSize() === 0;
            message = nothingFound ? 'Nothing found' : `${plural(state.itemsCount, ['result', 'results'])}`;
        }

        return (
            <XView width="100%" maxWidth={824} flexDirection="row" alignItems="center" padding={8}>
                <USearchInput
                    loading={state.loading}
                    message={message}
                    ref={searchInputRef}
                    flexShrink={1}
                    width="100%"
                    hideClear={true}
                    value={initialQuery || ''}
                    marginRight={30}
                    placeholder="Search messages"
                    onChange={onSearchChange}
                />
                <UIconButton
                    icon={<CloseIcon fill="var(--foregroundSecondary)" />}
                    onClick={onSearchClose}
                />
            </XView>
        );
    },
);
