import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { MenuItem } from 'openland-web/components/MainLayout';
import { tabs } from '../../mail/tabs';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import RecommendationIcon from 'openland-icons/ic-cell-recommendation.svg';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchBox } from 'openland-web/pages/main/discover/components/SearchBox';
import { SortPicker } from 'openland-web/pages/main/discover/components/sortPicker';
import { XSubHeader } from 'openland-x/XSubHeader';
import { Navigation } from 'openland-web/components/Navigation';
import { XMemo } from 'openland-y-utils/XMemo';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { NewOptionsButton } from 'openland-web/components/NewOptionsButton';

const iconWrapper = css`
    & svg * {
        fill: #bfbfbf !important;
        opacity: 1 !important;
    }
`;

const RecommendationIconWrapper = () => {
    return (
        <div className={iconWrapper}>
            <RecommendationIcon />
        </div>
    );
};

export const SearchCardsOrShowProfile = XMemo(
    ({
        id,
        onlyFeatured,
        searchPlaceholder,
        noQueryText,
        hasQueryText,
        CardsComponent,
        ProfileComponent,
        sortOptions,
        defaultSortOption,
        withoutFeatured,
        page,
        withoutSort,
    }: {
        id?: string | null;
        onlyFeatured?: boolean;
        searchPlaceholder: string;
        noQueryText: string;
        hasQueryText: string;
        CardsComponent: any;
        ProfileComponent?: any;
        sortOptions?: {
            label: string;
            values: { label: string; value: string }[];
        };
        defaultSortOption?: string;
        withoutFeatured?: boolean;
        page?: number;
        withoutSort?: boolean;
    }) => {
        const [itemCount, setItemCount] = React.useState(0);
        const [query, setQuery] = React.useState('');
        const [sort, setSort] = React.useState({
            orderBy: defaultSortOption || 'createdAt',
            featured: true,
        });

        const tagsCount = (n: number) => {
            if (itemCount !== n) {
                setItemCount(n);
            }
        };

        return (
            <>
                {!id && (
                    <XVertical separator={0} height="100%">
                        <SearchBox
                            value={query}
                            onChange={setQuery}
                            placeholder={searchPlaceholder}
                        />
                        {query.length <= 0 && (
                            <XSubHeader
                                title={noQueryText}
                                right={
                                    !withoutSort && (
                                        <SortPicker
                                            sort={sort}
                                            onPick={setSort}
                                            withoutFeatured={withoutFeatured}
                                            options={sortOptions}
                                        />
                                    )
                                }
                            />
                        )}
                        {query.length > 0 &&
                            itemCount > 0 && (
                                <XSubHeader
                                    title={hasQueryText}
                                    counter={itemCount}
                                    right={
                                        !withoutSort && (
                                            <SortPicker
                                                sort={sort}
                                                onPick={setSort}
                                                withoutFeatured={withoutFeatured}
                                                options={sortOptions}
                                            />
                                        )
                                    }
                                />
                            )}
                        <CardsComponent
                            onlyFeatured={onlyFeatured}
                            featuredFirst={sort.featured}
                            orderBy={sort.orderBy}
                            tagsCount={tagsCount}
                            notFoundText={query}
                            variables={{
                                query,
                                page,
                            }}
                        />
                    </XVertical>
                )}

                {id && ProfileComponent && <ProfileComponent id={id} />}
            </>
        );
    },
);

export const DiscoverNavigation = XMemo(
    ({
        title = '',
        onlyFeatured,
        id,
        ProfileComponent,
        CardsComponent,
        searchPlaceholder,
        noQueryText,
        hasQueryText,
        children,
        withoutFeatured,
        page,
        defaultSortOption,
        sortOptions,
        withoutSort,
    }: {
        title?: string;
        onlyFeatured?: boolean;
        id?: string | null;
        ProfileComponent?: any;
        CardsComponent?: any;
        searchPlaceholder?: string;
        noQueryText?: string;
        hasQueryText?: string;
        children?: any;
        withoutFeatured?: boolean;
        page?: number;
        defaultSortOption?: string;
        sortOptions?: {
            label: string;
            values: { label: string; value: string }[];
        };
        withoutSort?: boolean;
    }) => {
        const isMobile = useIsMobile();
        return (
            <Navigation
                title={isMobile ? title : 'Discover'}
                swapFragmentsOnMobile
                tab={tabs.empty}
                menuRightContent={<NewOptionsButton />}
                menuChildrenContent={
                    <>
                        <MenuItem
                            path="/discover/recommended"
                            title="Chats for you"
                            icon={<RecommendationIconWrapper />}
                        />
                        <MenuItem
                            path="/discover"
                            title="Groups and channels"
                            icon={<RoomIcon />}
                        />
                        <MenuItem
                            path="/discover/communities"
                            title="Communities"
                            icon={<CommunityIcon />}
                        />
                        <MenuItem path="/discover/people" title="People" icon={<PeopleIcon />} />
                        <MenuItem
                            path="/discover/organizations"
                            title="Organizations"
                            icon={<OrganizationsIcon />}
                        />
                        <XWithRole role="feature-non-production">
                            <MenuItem
                                path="/discover/explore"
                                title="Explore"
                                icon={<CommunityIcon />}
                            />
                        </XWithRole>
                    </>
                }
                secondFragment={
                    <XView
                        flexGrow={1}
                        height={isMobile ? undefined : '100%'}
                        position="relative"
                        flexShrink={1}
                    >
                        <XScrollView3 flexGrow={1} flexShrink={1}>
                            <XView flexGrow={1} flexShrink={1}>
                                <React.Suspense
                                    fallback={
                                        <XView flexGrow={1} flexShrink={0}>
                                            <XLoader loading={true} />
                                        </XView>
                                    }
                                >
                                    {children ? (
                                        children
                                    ) : (
                                        <SearchCardsOrShowProfile
                                            onlyFeatured={onlyFeatured}
                                            id={id}
                                            ProfileComponent={ProfileComponent}
                                            CardsComponent={CardsComponent}
                                            searchPlaceholder={searchPlaceholder || ''}
                                            noQueryText={noQueryText || ''}
                                            hasQueryText={hasQueryText || ''}
                                            withoutFeatured={withoutFeatured}
                                            sortOptions={sortOptions}
                                            defaultSortOption={defaultSortOption}
                                            page={page}
                                            withoutSort={withoutSort}
                                        />
                                    )}
                                </React.Suspense>
                            </XView>
                        </XScrollView3>
                    </XView>
                }
            />
        );
    },
);

export const ComponentWithSort = ({
    Component,
    queryToPrefix,
    noSort,
}: {
    Component: any;
    queryToPrefix?: boolean;
    noSort?: boolean;
}) => ({
    onlyFeatured,
    featuredFirst,
    orderBy,
    variables,
    tagsCount,
    customMenu,
    notFoundText,
    CustomButtonComponent,
}: {
    onlyFeatured?: boolean;
    featuredFirst: boolean;
    orderBy: string;
    variables: {
        query: string;
        page?: string;
    };
    tagsCount: Function;
    customMenu: any;
    notFoundText: string;
    CustomButtonComponent: any;
}) => {
    const finalQuery = variables.query
        ? variables.query
        : onlyFeatured
            ? JSON.stringify({ featured: 'true' })
            : variables.query;

    const finalVariables = {
        ...(queryToPrefix
            ? {
                  prefix: variables.query,
                  query: !variables.query && onlyFeatured ? finalQuery : undefined,
              }
            : {
                  query: finalQuery,
              }),
        sort: noSort
            ? ''
            : JSON.stringify([
                  ...(featuredFirst ? [{ ['featured']: { order: 'desc' } } as any] : []),
                  { [orderBy]: { order: 'desc' } },
              ]),
        ...(variables.page ? { page: variables.page } : {}),
    };

    return (
        <React.Suspense
            fallback={
                <XView flexGrow={1} flexShrink={0}>
                    <XLoader loading={true} />
                </XView>
            }
        >
            <Component
                tagsCount={tagsCount}
                variables={finalVariables}
                customMenu={customMenu}
                CustomButtonComponent={CustomButtonComponent}
                notFoundText={notFoundText}
            />
        </React.Suspense>
    );
};
