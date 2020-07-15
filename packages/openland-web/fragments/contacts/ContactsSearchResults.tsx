import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewRouteContext } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { GlobalSearch_items, GlobalSearchVariables } from 'openland-api/spacex.types';
import { useGlobalSearch } from '../dialogs/components/useGlobalSearch';
import { UIconSelectable } from 'openland-web/components/unicorn/UIcon';
import ChatIcon from 'openland-icons/s/ic-message-24.svg';

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

const messageBtnWrapper = css`
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    display: none;
    margin-right: -5px;

    &:hover {
        svg path {
            opacity: 0.6;
        }
    }
`;

const messageBtnWrapperSelected = css`
    display: flex;
`;

export interface ContactsSearchResultsProps {
    variables: GlobalSearchVariables;
    onPick: (item: GlobalSearch_items) => void;
    onMessagePick: (item: GlobalSearch_items) => void;
    paddingHorizontal?: number;
}

export const ContactsSearchEmptyView = React.memo(() => (
    <div className={noResultContainer}>
        <div className={imageStyle} />
        <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
    </div>
));

interface ContactsSearchItemRenderProps extends ContactsSearchResultsProps {
    item: GlobalSearch_items;
    index: number;
    selectedIndex: number;
    onMouseOver: (index: number) => void;
    onMouseMove: (index: number) => void;
}

export const ContactsSearchItemRender = React.memo((props: ContactsSearchItemRenderProps) => {
    const { item, index, selectedIndex, onPick, onMouseOver, onMouseMove, onMessagePick, paddingHorizontal } = props;

    let selected = index === selectedIndex;
    if (item.__typename === 'Organization') {
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
                paddingHorizontal={paddingHorizontal}
                disableHover={true}
            />
        );
    } else if (item.__typename === 'User') {
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
                rightElement={(
                    <div
                        className={cx('x', messageBtnWrapper, selected && messageBtnWrapperSelected)}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMessagePick(item);
                        }}
                    >
                        <UIconSelectable
                            icon={<ChatIcon />}
                            color="var(--foregroundSecondary)"
                            selectedColor="var(--foregroundContrast)"
                            size={24}
                        />
                    </div>
                )}
            />
        );
    }

    return null;
});

const ContactsSearchInner = React.memo((props: ContactsSearchResultsProps) => {
    const { items, selectedIndex, handleMouseOver, handleMouseMove, } = useGlobalSearch(props);
    const route = React.useContext(XViewRouteContext)!;

    if (items.length === 0) {
        return <ContactsSearchEmptyView />;
    }

    return (
        <>
            {items
                .filter(item => item.__typename === 'Organization' || (item.__typename === 'User' && !item.isBot))
                .map((i, index) => (
                    <XView key={'item-' + i.id} selected={route.path === `/contacts/${i.id}`} >
                        <ContactsSearchItemRender item={i} index={index} selectedIndex={selectedIndex} onMouseOver={handleMouseOver} onMouseMove={handleMouseMove} {...props} />
                    </XView>
                ))}
        </>
    );
});

export const ContactsSearchResults = (props: ContactsSearchResultsProps) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <ContactsSearchInner {...props} />
        </React.Suspense>
    );
};
