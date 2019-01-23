import * as React from 'react';
import { Menu, MenuItem } from 'openland-web/components/MainLayout';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import PlusIcon from 'openland-icons/dir-new.svg';
import { XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { PopperOptionsButton } from './PopperOptionsButton';

export const DirectoryNavigation = ({ route }: { route: string }) => (
    <Menu
        title={route}
        rightContent={
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
                            query={{ field: 'createRoom', value: 'true' }}
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
    >
        <MenuItem path="/directory" title="Rooms" icon={<RoomIcon />} />
        <MenuItem path="/directory/people" title="People" icon={<PeopleIcon />} />
        <MenuItem
            path="/directory/organizations"
            title="Organizations"
            icon={<OrganizationsIcon />}
        />
        <MenuItem path="/directory/communities" title="Communities" icon={<CommunityIcon />} />
        <XWithRole role="feature-non-production">
            <MenuItem path="/directory/explore" title="Explore" icon={<CommunityIcon />} />
        </XWithRole>
    </Menu>
);
