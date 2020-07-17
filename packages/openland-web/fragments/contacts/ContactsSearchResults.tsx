import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewRouteContext } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { UIconSelectable } from 'openland-web/components/unicorn/UIcon';
import ChatIcon from 'openland-icons/s/ic-message-24.svg';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useClient } from 'openland-api/useClient';
import { ContactDataSourceItem } from 'openland-engines/contacts/ContactsEngine';

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

export const ContactsSearchEmptyView = React.memo(() => (
    <div className={noResultContainer}>
        <div className={imageStyle} />
        <XView color="rgba(0, 0, 0, 0.5)">No results</XView>
    </div>
));

interface ListNavigationProps {
    selectedIndex: number;
    onMouseOver: (index: number) => void;
    onMouseMove: (index: number) => void;
    onPick: (item: GlobalSearch_items) => void;
    onMessagePick: (item: GlobalSearch_items) => void;
}

interface ContactsSearchItemRenderProps extends ListNavigationProps {
    item: ContactDataSourceItem;
    index: number;
}

interface ContactsSearchResultsProps extends ListNavigationProps {
    query: string;
}

export const ContactsSearchItemRender = React.memo((props: ContactsSearchItemRenderProps) => {
    const { item, index, selectedIndex, onPick, onMouseOver, onMouseMove, onMessagePick } = props;

    let selected = index === selectedIndex;
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
});

const ContactsSearchInner = React.memo((props: ContactsSearchResultsProps) => {
    const client = useClient();
    const route = React.useContext(XViewRouteContext)!;
    const { query, ...other } = props;
    const { edges } = client.useMyContactsSearch({ query, first: 20 }).myContactsSearch;
    const items = edges.map(x => ({ ...x.node, key: x.node.id }));

    useShortcuts([
        {
            keys: ['Enter'],
            callback: () => {
                // let d = items[selectedIndex];
                // if (d) {
                //     opts.onPick(d);
                // }
            },
        },
    ]);

    if (items.length === 0) {
        return <ContactsSearchEmptyView />;
    }

    return (
        <>
            {items.map((i, index) => (
                <XView key={'item-' + i.id} selected={route.path === `/contacts/${i.id}`} >
                    <ContactsSearchItemRender item={i} index={index} {...other} />
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
