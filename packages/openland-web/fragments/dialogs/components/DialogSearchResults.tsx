import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { plural } from 'openland-y-utils/plural';
import { GlobalSearch_items, GlobalSearchVariables } from 'openland-api/spacex.types';
import { useGlobalSearch } from './useGlobalSearch';

const noResultContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 34px;
`;

const imageStyle = css`
    width: 178px;
    height: 155px;
    background-image: url(/static/X/messenger/channels-search-empty.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-bottom: 20px;
`;

export interface DialogSearchResults {
    variables: GlobalSearchVariables;
    onPick: (item: GlobalSearch_items) => void;
    paddingHorizontal?: number;
    isForwarding?: boolean;
}

export const DialogSearchEmptyView = React.memo(() => (
    <div className={noResultContainer}>
        <div className={imageStyle} />
        <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
    </div>
));

interface DialogSearchItemRenderProps extends DialogSearchResults {
    item: GlobalSearch_items;
    index: number;
    selectedIndex: number;
    onMouseOver: (index: number) => void;
    onMouseMove: (index: number) => void;
}

export const DialogSearchItemRender = React.memo((props: DialogSearchItemRenderProps) => {
    const { item, index, selectedIndex, isForwarding, onPick, onMouseOver, onMouseMove, paddingHorizontal } = props;

    let selected = index === selectedIndex;
    if (item.__typename === 'SharedRoom') {
        if (!isForwarding || item.canSendMessage) {
            return (
                <UListItem
                    key={item.id}
                    onClick={() => onPick(item)}
                    onMouseOver={() => onMouseOver(index)}
                    onMouseMove={() => onMouseMove(index)}
                    hovered={selected}
                    title={item.title}
                    description={plural(item.membersCount || 0, ['member', 'members'])}
                    avatar={{ id: item.id, photo: item.roomPhoto, title: item.title }}
                    useRadius={false}
                    disableHover={true}
                    paddingHorizontal={paddingHorizontal}
                />
            );
        }
    } else if (item.__typename === 'Organization') {
        return (
            <UListItem
                key={item.id}
                onClick={() => onPick(item)}
                onMouseOver={() => onMouseOver(index)}
                onMouseMove={() => onMouseMove(index)}
                hovered={selected}
                title={item.name}
                description={item.about}
                avatar={{ id: item.id, photo: item.photo, title: item.name }}
                useRadius={false}
                disableHover={true}
                paddingHorizontal={paddingHorizontal}
            />
        );
    } else if (item.__typename === 'User') {
        if (!isForwarding || !item.isBot) {
            return (
                <UUserView
                    key={item.id}
                    onClick={() => onPick(item)}
                    onMouseOver={() => onMouseOver(index)}
                    onMouseMove={() => onMouseMove(index)}
                    hovered={selected}
                    user={item}
                    useRadius={false}
                    disableHover={true}
                    paddingHorizontal={paddingHorizontal}
                />
            );
        }
    }

    return null;
});

const DialogSearchInner = React.memo((props: DialogSearchResults) => {
    const { items, selectedIndex, setSelectedIndex, handleMouseOver, handleMouseMove } = useGlobalSearch(props);

    if (items.length === 0) {
        return <DialogSearchEmptyView />;
    }

    return (
        <XView flexGrow={1} flexDirection="column" onMouseLeave={() => setSelectedIndex(-1)}>
            {items.map((i, index) => <DialogSearchItemRender key={'item-' + i.id} item={i} index={index} selectedIndex={selectedIndex} onMouseOver={handleMouseOver} onMouseMove={handleMouseMove} {...props} />)}
        </XView>
    );
});

export const DialogSearchResults = (props: DialogSearchResults) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <DialogSearchInner {...props} />
        </React.Suspense>
    );
};
