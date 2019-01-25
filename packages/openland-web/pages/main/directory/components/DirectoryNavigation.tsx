import * as React from 'react';
import { XView } from 'react-mental';
import { MenuItem } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
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
import { Navigation } from '../../../../components/Navigation';
import { XScrollView2 } from 'openland-x/XScrollView2';

export const DirectoryContent = React.memo(
    ({
        id,
        searchPlaceholder,
        noQueryText,
        hasQueryText,
        CardsComponent,
        ProfileComponent,
        sortOptions,
        withoutFeatured,
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
        withoutFeatured?: boolean;
    }) => {
        const [itemCount, setItemCount] = React.useState(0);
        const [query, setQuery] = React.useState('');
        const [sort, setSort] = React.useState({
            orderBy: 'createdAt',
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
                        {query.length > 0 && itemCount > 0 && (
                            <XSubHeader
                                title={hasQueryText}
                                counter={itemCount}
                                right={
                                    <SortPicker
                                        sort={sort}
                                        onPick={setSort}
                                        withoutFeatured={withoutFeatured}
                                    />
                                }
                            />
                        )}
                        <CardsComponent
                            featuredFirst={sort.featured}
                            orderBy={sort.orderBy}
                            tagsCount={tagsCount}
                            variables={{
                                query,
                            }}
                        />
                    </XVertical>
                )}
                {id && ProfileComponent && <ProfileComponent id={id} />}
            </>
        );
    },
);

export const DirectoryNavigation = React.memo(
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
    }) => {
        return (
            <Navigation
                title={title}
                swapFragmentsOnMobile
                tab={tabs.empty}
                menuRightContent={
                    <PopperOptionsButton
                        icon={<PlusIcon />}
                        title={TextDirectory.create.title}
                        content={
                            <>
                                <XMenuItem
                                    query={{
                                        field: 'createOrganization',
                                        value: 'true',
                                    }}
                                    icon="x-dropdown-organization"
                                >
                                    {TextDirectory.create.organization}
                                </XMenuItem>
                                <XMenuItem
                                    query={{
                                        field: 'createRoom',
                                        value: 'true',
                                    }}
                                    icon="x-dropdown-room"
                                >
                                    {TextDirectory.create.room}
                                </XMenuItem>
                                <XMenuItem
                                    query={{
                                        field: 'createOrganization',
                                        value: 'community',
                                    }}
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
                        <MenuItem path="/directory" title="Rooms" icon={<RoomIcon />} />
                        <MenuItem path="/directory/people" title="People" icon={<PeopleIcon />} />
                        <MenuItem
                            path="/directory/organizations"
                            title="Organizations"
                            icon={<OrganizationsIcon />}
                        />
                        <MenuItem
                            path="/directory/communities"
                            title="Communities"
                            icon={<CommunityIcon />}
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
                    <XView flexGrow={1} height="100%" position="relative">
                        <XScrollView2 height="100%">
                            <XView flexGrow={1}>
                                {children ? (
                                    children
                                ) : (
                                    <DirectoryContent
                                        id={id}
                                        ProfileComponent={ProfileComponent}
                                        CardsComponent={CardsComponent}
                                        searchPlaceholder={searchPlaceholder || ''}
                                        noQueryText={noQueryText || ''}
                                        hasQueryText={hasQueryText || ''}
                                        withoutFeatured={withoutFeatured}
                                    />
                                )}
                            </XView>
                        </XScrollView2>
                    </XView>
                }
            />
        );
    },
);

export const ComponentWithSort = ({
    Component,
    queryToPrefix,
}: {
    Component: any;
    queryToPrefix?: boolean;
}) => ({ featuredFirst, orderBy, variables, tagsCount }: any) => {
    return (
        <Component
            tagsCount={(n: number) => {
                tagsCount(n);
            }}
            variables={{
                ...(queryToPrefix ? { prefix: variables.query } : { query: variables.query }),
                sort: JSON.stringify([
                    ...(featuredFirst ? [{ ['featured']: { order: 'desc' } } as any] : []),
                    { [orderBy]: { order: 'desc' } },
                ]),
            }}
        />
    );
};
