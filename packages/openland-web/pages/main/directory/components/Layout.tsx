import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XScrollView } from 'openland-x/XScrollView';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import ChannelIcon from '../icons/dir-channels.svg';
import PeopleIcon from '../icons/dir-people.svg';
import OrganizationsIcon from '../icons/dir-organizations.svg';
import CommunityIcon from '../icons/dir-communities.svg';
import RightIcon from '../icons/ic-arrow-rignt.svg';
import PlusIcon from '../icons/dir-new.svg';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';

export const RootWrapper = Glamorous.div({
    height: '100vh',
    width: '100%',
    display: 'flex'
});

export const Container = Glamorous.div({
    flex: 1,
    height: '100%',
    position: 'relative',
});

export const SearchRow = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

export const Results = Glamorous(XScrollView)({
    height: 'calc(100vh - 118px)'
});

export const SearchFormWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export const SearchFormContent = Glamorous(XHorizontal)({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    '&:focus-within': {
        '& > svg > g > path:last-child': {
            fill: '#1790ff',
            opacity: 0.5
        },
    }
});

export const SearchInput = Glamorous.input({
    height: '100%',
    minHeight: 40,
    paddingLeft: 9,
    lineHeight: 1.43,
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 500,
    '::placeholder': {
        color: '#99A2B0'
    }
});

export const ResetButton = Glamorous.div({
    color: '#99a2b0',
    height: 32,
    lineHeight: '32px',
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 500,
    padding: '0 14px',
    cursor: 'pointer',
    '&:hover': {
        color: '#334562',
    },
    '&:active': {
        color: '#1790ff',
    },
});

const SidebarWrapper = Glamorous.div({
    width: 344,
    height: '100%',
    borderRight: '1px solid #ececec',
    backgroundColor: '#ffffff',
});

const SidebarHeader = Glamorous.div({
    display: 'flex',
    padding: '15px 16px 18px',

    '& > span': {
        flex: 1,
        fontSize: 22,
        lineHeight: '28px',
        letterSpacing: 0,
        fontWeight: 400,
        color: '#000000',
        opacity: 0.9
    }
});

const SidebarItemWrapper = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#000000 !important',
    padding: '12px 15px 12px 44px',
    position: 'relative',

    '& .icon-wrapper': {
        position: 'absolute',
        top: 0,
        left: 14,
        bottom: 0,
        width: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& svg *': {
            opacity: 0.25,
            fill: '#000000'
        },
    },

    '& span': {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 400,
        letterSpacing: 0,
        paddingRight: 10,
    },

    '& .right-icon path:last-child': {
        opacity: 0.2,
        fill: '#000000'
    },

    '&:hover': {
        background: '#f9f9f9',
        cursor: 'pointer !important',
    },

    '&.is-active': {
        background: '#f9f9f9',
        cursor: 'default !important'
    },
});

interface SidebarItemProps {
    path: string;
    icon: 'communities' | 'organizations' | 'channels' | 'people';
    active?: boolean;
}

const SidebarItem = (props: SidebarItemProps) => (
    <SidebarItemWrapper path={props.path} className={props.active ? 'is-active' : ''}>
        <div className="icon-wrapper">
            {props.icon === 'channels' && <ChannelIcon />}
            {props.icon === 'people' && <PeopleIcon />}
            {props.icon === 'organizations' && <OrganizationsIcon />}
            {props.icon === 'communities' && <CommunityIcon />}
        </div>
        <span>{TextDirectory.sidebar[props.icon]}</span>
        <RightIcon className="right-icon" />
    </SidebarItemWrapper>
);

const NewButtonWrapper = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s'
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5
    }
});

class NewButton extends React.Component<{}, { show?: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        };
    }

    switch = () => {
        this.setState({
            show: !this.state.show
        });
    }

    closer = () => {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="bottom-end"
                show={this.state.show}
                marginTop={10}
                marginRight={-5}
                content={(
                    <>
                        <XMenuItem query={{ field: 'createOrganization', value: 'true' }} icon="x-dropdown-organization">{TextDirectory.create.organization}</XMenuItem>
                        <XMenuItem query={{ field: 'createChannel', value: 'true' }} icon="x-dropdown-channel">{TextDirectory.create.channel}</XMenuItem>
                        <XMenuItem query={{ field: 'createOrganization', value: 'community' }} icon="x-dropdown-community">{TextDirectory.create.community}</XMenuItem>
                    </>
                )}
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

export const Sidebar = (props: { active?: string }) => (
    <SidebarWrapper>
        <SidebarHeader>
            <span>Directory</span>
            <NewButton />
        </SidebarHeader>
        <XVertical separator={0}>
            <SidebarItem path="/directory" icon="channels" active={props.active === 'channels'} />
            <SidebarItem path="/directory/people" icon="people" active={props.active === 'people'} />
            <SidebarItem path="/directory/organizations" icon="organizations" active={props.active === 'organizations'} />
            <SidebarItem path="/directory/communities" icon="communities" active={props.active === 'communities'} />
        </XVertical>
    </SidebarWrapper>
);