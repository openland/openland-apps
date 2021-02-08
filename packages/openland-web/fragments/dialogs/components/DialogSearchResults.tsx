import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { plural } from 'openland-y-utils/plural';
import { GlobalSearch_items, GlobalSearchVariables } from 'openland-api/spacex.types';
import { useGlobalSearch } from './useGlobalSearch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextBody, TextTitle3 } from 'openland-web/utils/TextStyles';
import { showCreatingGroupFragment } from 'openland-web/fragments/create/CreateEntityFragment';

const titleFeaturedStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    width: calc(100% - 20px);
`;

const featuredIcon = css`
    display: var(--featured-icon-display);
    align-self: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-left: 4px;
`;

const emptyTitle = css`
    text-align: center;
    margin-bottom: 4px;
    color: var(--foregroundPrimary);
`;

const emptyText = css`
    text-align: center;
    margin-bottom: 16px;
    color: var(--foregroundSecondary);
`;

export const DialogSearchEmptyView = React.memo(() => {
    const handleGroupClick = React.useCallback(() => {
        showCreatingGroupFragment({ entityType: 'group' });
    }, []);

    return (
        <XView
            flexGrow={1}
            justifyContent="center"
            padding={32}
        >
            <div className={cx(TextTitle3, emptyTitle)}>Nothing found</div>
            <div className={cx(TextBody, emptyText)}>
                Didn't find the right group at Openland?<br />
                Create your own
            </div>
            <XView alignItems="center">
                <UButton text="Create group" onClick={handleGroupClick} />
            </XView>
        </XView>
    );
});

export interface DialogSearchResults {
    variables: GlobalSearchVariables;
    onPick: (item: GlobalSearch_items) => void;
    paddingHorizontal?: number;
    isForwarding?: boolean;
    hideChats?: string[];
}
interface DialogSearchItemRenderProps {
    item: GlobalSearch_items;
    index: number;
    selectedIndex: number;
    savedMessages?: boolean;
    onPick: (item: GlobalSearch_items) => void;
    paddingHorizontal?: number;
    isForwarding?: boolean;
    featured?: boolean;
}

const getFeaturedTitleProps = (title: string) => {
    return {
        title: (
            <>
                <div className={titleFeaturedStyle}>
                    {title}
                </div>
                <div className={featuredIcon}>
                    <UIcon icon={<IcFeatured />} color={'#3DA7F2'} />
                </div>
            </>
        ),
        titleStyle: { flexDirection: 'row' as 'row' },
    };
};

export const DialogSearchItemRender = React.memo((props: DialogSearchItemRenderProps) => {
    const { item, index, selectedIndex, isForwarding, onPick, paddingHorizontal } = props;

    let selected = index === selectedIndex;
    if (item.__typename === 'SharedRoom') {
        if (!isForwarding || item.canSendMessage) {
            return (
                <UListItem
                    key={item.id}
                    onClick={() => onPick(item)}
                    hovered={selected}
                    description={plural(item.membersCount || 0, ['member', 'members'])}
                    avatar={{ id: item.id, photo: item.roomPhoto, title: item.title }}
                    useRadius={false}
                    paddingHorizontal={paddingHorizontal}
                    {...item.featured ? getFeaturedTitleProps(item.title) : { title: item.title }}
                />
            );
        }
    } else if (item.__typename === 'Organization') {
        return (
            <UListItem
                key={item.id}
                onClick={() => onPick(item)}
                hovered={selected}
                description={item.about}
                avatar={{ id: item.id, photo: item.photo, title: item.name }}
                useRadius={false}
                paddingHorizontal={paddingHorizontal}
                {...item.featured ? getFeaturedTitleProps(item.name) : { title: item.name }}
            />
        );
    } else if (item.__typename === 'User') {
        if (!isForwarding || !item.isBot) {
            return (
                <UUserView
                    key={item.id}
                    onClick={() => onPick(item)}
                    hovered={selected}
                    user={item}
                    useRadius={false}
                    paddingHorizontal={paddingHorizontal}
                    savedMessages={props.savedMessages}
                />
            );
        }
    }

    return null;
});

const DialogSearchInner = React.memo((props: DialogSearchResults) => {
    const { items, selectedIndex } = useGlobalSearch(props);
    let messenger = React.useContext(MessengerContext);

    if (items.length === 0) {
        return <DialogSearchEmptyView />;
    }

    const hideChats = props.hideChats || [];

    return (
        <XView flexGrow={1} flexDirection="column">
            {items.filter(e => e.__typename !== 'SharedRoom' || !hideChats.includes(e.id)).map((i, index) => <DialogSearchItemRender key={'item-' + i.id} item={i} index={index} selectedIndex={selectedIndex} savedMessages={i.id === messenger.user.id} {...props} />)}
        </XView>
    );
});

export const DialogSearchResults = (props: DialogSearchResults) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} transparentBackground={true} />}>
            <DialogSearchInner {...props} />
        </React.Suspense>
    );
};
