import * as React from 'react';
import { XView } from 'react-mental';
import { MenuItem } from 'openland-web/components/MainLayout';
import NewIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs } from '../../mail/tabs';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { PopperOptionsButton } from 'openland-web/pages/main/directory/components/PopperOptionsButton';
import { XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchBox } from 'openland-web/pages/main/directory/components/SearchBox';
import { SortPicker } from 'openland-web/pages/main/directory/components/sortPicker';
import { XSubHeader } from 'openland-x/XSubHeader';
import { Navigation } from 'openland-web/components/Navigation';
import { XMemo } from 'openland-y-utils/XMemo';
import { useIsMobile } from 'openland-web/hooks';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { showCreateOrganization } from 'openland-web/fragments/showCreateOrganization';

export const SearchCardsOrShowProfile = XMemo(
    ({
        id,
        searchPlaceholder,
        noQueryText,
        hasQueryText,
        CardsComponent,
        ProfileComponent,
        sortOptions,
        defaultSortOption,
        withoutFeatured,
        page,
    }: {
        id?: string | null;
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
                                    <SortPicker
                                        sort={sort}
                                        onPick={setSort}
                                        withoutFeatured={withoutFeatured}
                                        options={sortOptions}
                                    />
                                }
                            />
                        )}
                        {query.length > 0 &&
                            itemCount > 0 && (
                                <XSubHeader
                                    title={hasQueryText}
                                    counter={itemCount}
                                    right={
                                        <SortPicker
                                            sort={sort}
                                            onPick={setSort}
                                            withoutFeatured={withoutFeatured}
                                            options={sortOptions}
                                        />
                                    }
                                />
                            )}
                        <CardsComponent
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

export const DirectoryNavigation = XMemo(
    ({
        title,
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
    }: {
        title: string;
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
    }) => {
        const [isMobile] = useIsMobile();
        return (
            <Navigation
                title={isMobile ? title : 'Directory'}
                swapFragmentsOnMobile
                tab={tabs.empty}
                menuRightContent={
                    <PopperOptionsButton
                        icon={<NewIcon />}
                        title={TextDirectory.create.title}
                        content={
                            <>
                                <XMenuItem
                                    onClick={() => showCreateOrganization('organization')}
                                    icon="x-dropdown-organization"
                                >
                                    {TextDirectory.create.organization}
                                </XMenuItem>
                                <XMenuItem
                                    onClick={() => showCreateOrganization('community')}
                                    icon="x-dropdown-community"
                                >
                                    {TextDirectory.create.community}
                                </XMenuItem>
                            </>
                        }
                    />
                }
                menuChildrenContent={
                    <>
                        <MenuItem path="/directory" title="Groups" icon={<RoomIcon />} />
                        <MenuItem
                            path="/directory/communities"
                            title="Communities"
                            icon={<CommunityIcon />}
                        />
                        <MenuItem path="/directory/people" title="People" icon={<PeopleIcon />} />
                        <MenuItem
                            path="/directory/organizations"
                            title="Organizations"
                            icon={<OrganizationsIcon />}
                        />
                        <XWithRole role="feature-non-production">
                            <MenuItem
                                path="/directory/explore"
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
    featuredFirst,
    orderBy,
    variables,
    tagsCount,
    customMenu,
    notFoundText,
    CustomButtonComponent,
}: {
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
                variables={{
                    ...(queryToPrefix ? { prefix: variables.query } : { query: variables.query }),
                    sort: noSort
                        ? ''
                        : JSON.stringify([
                              ...(featuredFirst
                                  ? [{ ['featured']: { order: 'desc' } } as any]
                                  : []),
                              { [orderBy]: { order: 'desc' } },
                          ]),
                    ...(variables.page ? { page: variables.page } : {}),
                }}
                customMenu={customMenu}
                CustomButtonComponent={CustomButtonComponent}
                notFoundText={notFoundText}
            />
        </React.Suspense>
    );
};
