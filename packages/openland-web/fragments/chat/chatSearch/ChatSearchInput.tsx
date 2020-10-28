import React from 'react';
import { XView } from 'react-mental';

import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { ChatSearchEngine } from 'openland-engines/messenger/ChatSearchEngine';

import CloseIcon from 'openland-icons/s/ic-close-24.svg';

interface ChatSearchInputProps {
    engine: ChatSearchEngine;
    queryInProgress: boolean;
    onSearchChange: (query: string) => void;
    onSearchClose: () => void;
}

export const ChatSearchInput = React.memo(({ engine, queryInProgress, onSearchClose, onSearchChange }: ChatSearchInputProps) => {
    const [state, setState] = React.useState(() => engine.getState());
    React.useEffect(() => engine.subscribe(setState), []);

    const nothingFound = state.historyFullyLoaded && !queryInProgress && engine.dataSource.getSize() === 0;

    return (
        <XView width="100%" maxWidth={824} flexDirection="row" alignItems="center" padding={8}>
            <USearchInput
                loading={state.loading}
                showNothingFound={nothingFound}
                flexShrink={1}
                width="100%"
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
});
