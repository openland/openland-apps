import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { MessagesSearch } from './MessagesSearch';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { plural } from 'openland-y-utils/plural';
import { GlobalSearch_items, GlobalSearchVariables } from 'openland-api/Types';

const NoResultWrapper = Glamorous(XVertical)({
    marginTop: 34,
});

const Image = Glamorous.div({
    width: 178,
    height: 155,
    backgroundImage: "url('/static/X/messenger/channels-search-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
});

type DialogSearchResultsT = {
    variables: GlobalSearchVariables;
    onPick: (item: GlobalSearch_items) => void;
    onMessagePick?: (chatId: string) => void;
    paddingHorizontal?: number;
    isForwarding?: boolean;
};

const DialogSearchResultsInner = React.memo((props: DialogSearchResultsT) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const client = useClient();
    const data = client.useGlobalSearch(props.variables, {
        fetchPolicy: 'cache-and-network',
    });

    if (!data || !data.items) {
        return <XLoader loading={true} />;
    }

    let items = data.items;

    const handleOptionUp = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex - 1, 0), items.length - 1));

        return;
    };

    const handleOptionDown = () => {
        if (selectedIndex === null) {
            setSelectedIndex(0);
            return;
        }
        setSelectedIndex(Math.min(Math.max(selectedIndex + 1, 0), items.length - 1));

        return;
    };

    useShortcuts([
        { keys: ['ArrowUp'], callback: handleOptionUp },
        { keys: ['ArrowDown'], callback: handleOptionDown },
        {
            keys: ['Enter'], callback: () => {
                let d = items[selectedIndex];
                if (d) {
                    props.onPick(d);
                }
            }
        },
    ]);

    if (items.length === 0) {
        return (
            <NoResultWrapper separator={10} alignItems="center">
                <Image />
                <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
            </NoResultWrapper>
        );
    }

    return (
        <>
            {items.map((i, index) => {
                let selected = index === selectedIndex;
                if (i.__typename === 'SharedRoom') {
                    if (!props.isForwarding || i.canSendMessage) {
                        return <UListItem key={i.id} onClick={() => props.onPick(i)} hovered={selected} title={i.title} description={plural(i.membersCount || 0, ['member', 'members'])} avatar={({ id: i.id, photo: i.roomPhoto, title: i.title })} useRadius={false} paddingHorizontal={props.paddingHorizontal} />;
                    }
                    return null;
                } else if (i.__typename === 'Organization') {
                    return <UListItem key={i.id} onClick={() => props.onPick(i)} hovered={selected} title={i.name} description={i.about} avatar={({ id: i.id, photo: i.photo, title: i.name })} useRadius={false} paddingHorizontal={props.paddingHorizontal} />;
                } else if (i.__typename === 'User') {
                    if (!props.isForwarding || !i.isBot) {
                        return <UUserView key={i.id} onClick={() => props.onPick(i)} hovered={selected} user={i} useRadius={false} paddingHorizontal={props.paddingHorizontal} />;
                    }
                    return null;
                } else {
                    return null;
                }
            })}
            {props.onMessagePick && (
                <XWithRole role="feature-non-production">
                    <MessagesSearch variables={props.variables} onPick={props.onMessagePick} />
                </XWithRole>
            )}
        </>
    );
});

export const DialogSearchResults = (props: DialogSearchResultsT) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <DialogSearchResultsInner {...props} />
        </React.Suspense>
    );
};
