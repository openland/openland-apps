import * as React from 'react';
import { Sidebar, SidebarItem } from '../../../../components/MainLayout';
import Glamorous from 'glamorous';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import PlusIcon from 'openland-icons/dir-new.svg';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';
import { XWithRole } from 'openland-x-permissions/XWithRole';

const NewButtonWrapper = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
    '@media (max-width: 700px)': {
        '& span': {
            display: 'none',
        },
        '& svg': {
            margin: '0 !important',
        },
    },
});

class NewButton extends React.Component<{}, { show?: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
        };
    }

    switch = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    closer = () => {
        this.setState({
            show: false,
        });
    };

    render() {
        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="bottom-end"
                show={this.state.show}
                marginTop={10}
                marginRight={-5}
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
                arrow={null}
                onClickOutside={this.closer}
            >
                <NewButtonWrapper
                    onClick={this.switch}
                    style="light"
                    text={TextDirectory.create.title}
                    icon={<PlusIcon />}
                    size="small"
                />
            </XPopper>
        );
    }
}

export const Navigation = (props: { route: string }) => (
    <Sidebar title="Directory" rightContent={<NewButton />} route={props.route}>
        <SidebarItem path="/directory" title="Rooms" icon={<RoomIcon />} />
        <SidebarItem path="/directory/people" title="People" icon={<PeopleIcon />} />
        <SidebarItem
            path="/directory/organizations"
            title="Organizations"
            icon={<OrganizationsIcon />}
        />
        <SidebarItem path="/directory/communities" title="Communities" icon={<CommunityIcon />} />
        <XWithRole role="feature-non-production">
            <SidebarItem path="/directory/explore" title="Explore" icon={<CommunityIcon />} />
        </XWithRole>
    </Sidebar>
);
