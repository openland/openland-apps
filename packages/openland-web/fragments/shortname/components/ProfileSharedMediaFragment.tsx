import * as React from 'react';
import { XView } from 'react-mental';

import { useClient } from 'openland-api/useClient';
import { SharedMediaType } from 'openland-api/spacex.types';
import { useTabs, Tabs } from 'openland-web/components/unicorn/UTabs';
import { SharedMedia } from 'openland-web/fragments/chat/sharedMedia/SharedMediaFragment';

interface Paginated {
    loadMore: () => void;
}

interface ProfileSharedMediaProps {
    chatId: string;
    bottomReached: boolean;
}

export const ProfileSharedMediaFragment = React.memo(({ chatId, bottomReached }: ProfileSharedMediaProps) => {
    const client = useClient();
    const counters = client.useSharedMediaCounters({ chatId }, { suspense: false });
    const [items, selected, setSelected] = useTabs([
        ['Media', counters && (counters.counters.images)],
        ['Files', counters && counters.counters.documents + counters.counters.videos],
        ['Links', counters && counters.counters.links]
    ]);
    const paginatedMedia = React.useRef<Paginated>(null);
    const paginatedFiles = React.useRef<Paginated>(null);
    const paginatedLinks = React.useRef<Paginated>(null);
    const paginated = (selected === 'Media' ? paginatedMedia : selected === 'Files' ? paginatedFiles : paginatedLinks).current;
    React.useEffect(() => {
        if (bottomReached && paginated) {
            paginated.loadMore();
        }
    }, [bottomReached]);

    return (
        <XView marginLeft={7}>
            <XView flexDirection="row" height={56} flexGrow={1}>
                <Tabs tabs={items} setSelected={setSelected} justifyContent="flex-end" />
            </XView>
            <SharedMedia active={selected === 'Media'} mediaTypes={[SharedMediaType.IMAGE]} ref={paginatedMedia} chatId={chatId} profileView={true} />
            {/* keep video in files until backend start sending video previews */}
            <SharedMedia active={selected === 'Files'} mediaTypes={[SharedMediaType.DOCUMENT, SharedMediaType.VIDEO]} ref={paginatedFiles} chatId={chatId} profileView={true} />
            <SharedMedia active={selected === 'Links'} mediaTypes={[SharedMediaType.LINK]} ref={paginatedLinks} chatId={chatId} profileView={true} />
        </XView>
    );
});
