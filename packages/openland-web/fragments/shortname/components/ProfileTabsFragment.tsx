import * as React from 'react';
import { XView } from 'react-mental';

import { useClient } from 'openland-api/useClient';
import { RoomChat_room_SharedRoom, SharedMediaType } from 'openland-api/spacex.types';
import { useTabs, Tabs } from 'openland-web/components/unicorn/UTabs';
import { SharedMedia } from 'openland-web/fragments/chat/sharedMedia/SharedMediaFragment';
import { ProfileScrollContext } from 'openland-web/components/ProfileLayout';
import { GroupMembers } from 'openland-web/fragments/group/components/GroupMembers';

interface Paginated {
    loadMore: () => void;
}

interface ProfileSharedMediaProps {
    chatId: string;
    group?: RoomChat_room_SharedRoom;
}

export const ProfileTabsFragment = React.memo(({ chatId, group }: ProfileSharedMediaProps) => {
    const client = useClient();
    const bottomReached = React.useContext(ProfileScrollContext);
    const counters = client.useSharedMediaCounters({ chatId }, { suspense: false });

    const tabs: [string, (number | null)][] = [
        ['Media', counters && (counters.counters.images)],
        ['Files', counters && counters.counters.documents + counters.counters.videos],
        ['Links', counters && counters.counters.links]
    ];

    if (group) {
        tabs.unshift(['Members', group.membersCount]);
    }

    const [items, selected, setSelected] = useTabs(tabs);
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
                <Tabs tabs={items} setSelected={setSelected} justifyContent="flex-end" hideEmpty={true} />
            </XView>
            {selected === 'Members' && group && <GroupMembers group={group} />}
            <SharedMedia active={selected === 'Media'} mediaTypes={[SharedMediaType.IMAGE]} ref={paginatedMedia} chatId={chatId} profileView={true} />
            {/* keep video in files until backend start sending video previews */}
            <SharedMedia active={selected === 'Files'} mediaTypes={[SharedMediaType.DOCUMENT, SharedMediaType.VIDEO]} ref={paginatedFiles} chatId={chatId} profileView={true} />
            <SharedMedia active={selected === 'Links'} mediaTypes={[SharedMediaType.LINK]} ref={paginatedLinks} chatId={chatId} profileView={true} />
        </XView>
    );
});
