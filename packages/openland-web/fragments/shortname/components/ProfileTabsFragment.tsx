import * as React from 'react';
import { XView } from 'react-mental';

import { useClient } from 'openland-api/useClient';
import {
    RoomChat_room_SharedRoom, SharedMediaCounters,
    SharedMediaCounters_counters,
    SharedMediaType,
} from 'openland-api/spacex.types';
import { useTabs, Tabs, TabItem } from 'openland-web/components/unicorn/UTabs';
import { SharedMedia } from 'openland-web/fragments/chat/sharedMedia/SharedMediaFragment';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import { GroupMembers } from 'openland-web/fragments/group/components/GroupMembers';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

import DropIcon from 'openland-icons/s/ic-dropdown-16.svg';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import GroupIcon from 'openland-icons/s/ic-group-24.svg';

interface Paginated {
    loadMore: () => void;
}

interface ProfileSharedMediaProps {
    chatId: string;
    group?: RoomChat_room_SharedRoom;
}

const MenuIcons = {
    Members: <GroupIcon />,
    Media: <MediaIcon />,
    Files: <FileIcon />,
    Links: <LinkIcon />,
};

const getCountersSum = (counters: SharedMediaCounters | null) => {
    if (!counters) {
        return 0;
    }

    const { images, documents, links, videos } = counters.counters;

    return images + documents + links + videos;
};

const getNotEmptyTab = (counters: SharedMediaCounters_counters) => {
    if (counters.images > 0) {
        return 'Media';
    } else if (counters.documents + counters.videos) {
        return 'Files';
    } else {
        return 'Links';
    }
};

const TabsMenuMobile = React.memo(
    (props: {
        items: (TabItem & { icon: React.ReactElement })[];
        selectTab: (tab: string) => void;
        ctx: UPopperController;
    }) => {
        const builder = new UPopperMenuBuilder();
        props.items
            .filter(({ counter }) => counter)
            .map((i) => ({
                ...i,
                title: (
                    <XView flexDirection="row">
                        {i.title}
                        <XView color="var(--foregroundTertiary)" marginLeft={8}>
                            {i.counter}
                        </XView>
                    </XView>
                ),
                onClick: () => props.selectTab(i.title),
            }))
            .map(builder.item);
        return builder.build(props.ctx);
    },
);

const TabsMenuMobileButton = (props: {
    menu: (ctx: UPopperController) => JSX.Element;
    selected: string;
}) => {
    const [, menuShow] = usePopper(
        { placement: 'bottom-end', marginTop: -56, marginRight: -8, updatedDeps: props.selected },
        props.menu,
    );
    return (
        <XView
            {...TextStyles.Label1}
            color="var(--foregroundSecondary)"
            flexDirection="row"
            onClick={menuShow}
            marginLeft={8}
            paddingVertical={16}
            alignItems="center"
        >
            <XView marginRight={10}>{props.selected}</XView>
            <UIcon size={16} icon={<DropIcon />} />
        </XView>
    );
};

export const ProfileTabsFragment = React.memo(({ chatId, group }: ProfileSharedMediaProps) => {
    const client = useClient();
    const { bottomReached } = React.useContext(ProfileLayoutContext);
    const layout = useLayout();
    const counters = client.useSharedMediaCounters({ chatId }, { suspense: false });
    const countersSum = getCountersSum(counters);

    const tabs: [string, number | null][] = [
        ['Media', counters && counters.counters.images],
        ['Files', counters && counters.counters.documents + counters.counters.videos],
        ['Links', counters && counters.counters.links],
    ];

    if (group) {
        tabs.unshift(['Members', group.membersCount]);
    }

    const [items, selected, setSelected] = useTabs(tabs);
    const paginatedMedia = React.useRef<Paginated>(null);
    const paginatedFiles = React.useRef<Paginated>(null);
    const paginatedLinks = React.useRef<Paginated>(null);

    let paginated: Paginated | null;
    if (selected === 'Media') {
        paginated = paginatedMedia.current;
    } else if (selected === 'Files') {
        paginated = paginatedFiles.current;
    } else {
        paginated = paginatedLinks.current;
    }

    React.useEffect(() => {
        if (!group && counters) {
            setSelected(getNotEmptyTab(counters.counters));
        }
    }, [counters]);
    React.useEffect(() => {
        if (bottomReached && paginated) {
            paginated.loadMore();
        }
    }, [bottomReached]);

    return (
        <XView marginLeft={7} width="100%">
            <XView flexDirection="row" height={56} flexGrow={1}>
                {layout === 'desktop' && (
                    <Tabs
                        tabs={items}
                        setSelected={setSelected}
                        justifyContent="flex-end"
                        hideEmpty={true}
                    />
                )}
                {counters && countersSum > 0 && layout === 'mobile' && (
                    <TabsMenuMobileButton
                        selected={selected}
                        menu={(ctx) => (
                            <TabsMenuMobile
                                selectTab={setSelected}
                                items={items.map((i) => ({
                                    ...i,
                                    icon: MenuIcons[i.title],
                                }))}
                                ctx={ctx}
                            />
                        )}
                    />
                )}
            </XView>
            {selected === 'Members' && group && <GroupMembers group={group} />}
            <SharedMedia
                active={selected === 'Media'}
                mediaTypes={[SharedMediaType.IMAGE]}
                ref={paginatedMedia}
                chatId={chatId}
                profileView={true}
            />
            {/* keep video in files until backend start sending video previews */}
            <SharedMedia
                active={selected === 'Files'}
                mediaTypes={[SharedMediaType.DOCUMENT, SharedMediaType.VIDEO]}
                ref={paginatedFiles}
                chatId={chatId}
                profileView={true}
            />
            <SharedMedia
                active={selected === 'Links'}
                mediaTypes={[SharedMediaType.LINK]}
                ref={paginatedLinks}
                chatId={chatId}
                profileView={true}
            />
        </XView>
    );
});
