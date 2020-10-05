import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewRouteContext } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { MyContacts_myContacts_items_user, MyContactsSearch_myContactsSearch_edges_node } from 'openland-api/spacex.types';
import ChatIcon from 'openland-icons/s/ic-message-24.svg';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useClient } from 'openland-api/useClient';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { InvalidateSync } from '@openland/patterns';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';

const noResultContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 34px;
`;

const imageStyle = css`
    width: 178px;
    height: 155px;
    background-image: url("/static/X/messenger/channels-search-empty.svg");
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
`;

const wrapperClassName = css`
    &:hover {
        .${messageBtnWrapper} {
            display: flex;
        }
    }
`;

const messageBtnWrapperSelected = css`
    display: flex;
`;

export const ContactsSearchEmptyView = React.memo(() => (
    <div className={noResultContainer}>
        <div className={imageStyle} />
        <XView color="var(--foregroundSecondary)">No results</XView>
    </div>
));

interface ListNavigationProps {
    selectedIndex: number;
    onPick: (item: MyContactsSearch_myContactsSearch_edges_node) => void;
    onMessagePick: (item: MyContactsSearch_myContactsSearch_edges_node) => void;
}

interface ContactsSearchItemRenderProps extends ListNavigationProps {
    item: MyContacts_myContacts_items_user;
    index: number;
}

interface ContactsSearchResultsProps extends ListNavigationProps {
    query: string;
    onItemsCountChange: (count: number) => void;
}

export const ContactsSearchItemRender = React.memo((props: ContactsSearchItemRenderProps) => {
    const { item, index, selectedIndex, onPick, onMessagePick } = props;
    const route = React.useContext(XViewRouteContext)!;

    let hovered = index === selectedIndex;
    let selected = route.path === `/contacts/${item.id}`;
    return (
        <XView selected={selected}>
            <UUserView
                key={item.id}
                onClick={() => onPick(item)}
                hovered={hovered}
                user={item}
                wrapperClassName={wrapperClassName}
                useRadius={false}
                rightElement={(
                    <div
                        className={cx('x', messageBtnWrapper, hovered && messageBtnWrapperSelected)}
                    >
                        <UIconButton
                            icon={<ChatIcon />}
                            color={selected ? 'var(--foregroundContrast)' : 'var(--foregroundSecondary)'}
                            onClick={(e) => {
                                e.stopPropagation();
                                onMessagePick(item);
                            }}
                        />
                    </div>
                )}
            />
        </XView>
    );
});

const ContactsSearchInner = React.memo((props: ContactsSearchResultsProps) => {
    const client = useClient();
    const { query, selectedIndex, onPick, onMessagePick } = props;
    const { edges: initialEdges, pageInfo: initialPageInfo } = client.useMyContactsSearch({ query, first: 10, page: 0 }, { fetchPolicy: 'cache-and-network' }).myContactsSearch;
    const [items, setItems] = React.useState<MyContactsSearch_myContactsSearch_edges_node[]>(initialEdges.map(x => x.node));
    const [page, setPage] = React.useState<number>(initialPageInfo.currentPage);
    const [hasNextPage, setHasNextPage] = React.useState(initialPageInfo.hasNextPage);
    const [loading, setLoading] = React.useState(false);
    const [invalidator] = React.useState<InvalidateSync>(new InvalidateSync(async () => {
        await client.refetchMyContactsSearch({ query, first: 10, page: 0 }, { fetchPolicy: 'network-only' });
    }));

    const handleLoadMore = async () => {
        if (!loading && hasNextPage) {
            setLoading(true);
            const { edges, pageInfo } = (await client.queryMyContactsSearch({ query, first: 10, page: page + 1 }, { fetchPolicy: 'network-only' })).myContactsSearch;
            setItems(prev => prev.concat(edges.map(x => x.node)));
            setPage(pageInfo.currentPage);
            setHasNextPage(pageInfo.hasNextPage);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        invalidator.invalidate();
    }, [query]);

    React.useEffect(() => {
        props.onItemsCountChange(items.length);
    }, [items]);

    useShortcuts([
        {
            keys: ['Enter'],
            callback: () => {
                let d = items[props.selectedIndex];
                if (d) {
                    props.onPick(d);
                }
            },
        },
    ]);

    if (items.length === 0) {
        return <ContactsSearchEmptyView />;
    }

    return (
        <UFlatList
            loadingHeight={56}
            padded={false}
            renderItem={(x, i) => (
                <ContactsSearchItemRender
                    item={x}
                    index={i}
                    selectedIndex={selectedIndex}
                    onPick={onPick}
                    onMessagePick={onMessagePick}
                />
            )}
            loading={loading}
            items={items}
            loadMore={handleLoadMore}
        />
    );
});

export const ContactsSearchResults = (props: ContactsSearchResultsProps) => {
    // TODO: Use when import is ready
    // let importBtn = (
    //     <UListItem
    //         icon={<CycleIcon />}
    //         iconBackground="var(--accentPrimary)"
    //         title="Import contacts"
    //         titleStyle={TextStyles.Label1}
    //     />
    // );

    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <ContactsSearchInner key={props.query} {...props} />
        </React.Suspense>
    );
};
