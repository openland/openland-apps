import * as React from 'react';
import { css } from 'linaria';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XScrollView2 } from 'openland-x/XScrollView2';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import PlusIcon from 'openland-icons/dir-new.svg';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';

const RootWrapperStyle = css`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

export const RootWrapper = (props: { children: any }) => (
    <div className={RootWrapperStyle}>{props.children}</div>
);

const ContainerStyle = css`
    width: calc(100% - 344px);
    height: 100%;
    position: relative;
    @media (max-width: 1100px) {
        width: calc(100% - 300px);
    }
    @media (max-width: 950px) {
        width: calc(100% - 230px);
    }
    @media (max-width: 700px) {
        width: 100%;
        height: calc(100% - 53px);
    }
`;

export const Container = (props: { children: any }) => (
    <div className={ContainerStyle}>{props.children}</div>
);

export const Results = Glamorous(XScrollView2)({
    height: 'calc(100vh - 61px)',
    '@media (max-width: 700px)': {
        height: 'calc(100vh - 114px)',
    },
});

const SidebarWrapper = css`
    width: 344px;
    height: 100%;
    border-right: 1px solid #ececec;
    background-color: #ffffff;
    flex-shrink: 0;
    position: relative;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
    @media (max-width: 700px) {
        width: 100%;
        display: flex;
        height: 53px;
        border-right: none;
        border-bottom: 1px solid #ececec;
    }
`;

const SidebarHeader = css`
    display: flex;
    padding: 14px 15px 19px 17px;

    & > span {
        flex: 1;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0;
        font-weight: 400;
        color: #000;
        opacity: 0.9;
    }
    @media (max-width: 700px) {
        width: 100%;
        justify-content: space-between;
        padding: 10px 15px 19px 17px;
    }
`;

const SidebarItemWrapper = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#000000 !important',
    padding: '12px 15px 12px 46px',
    position: 'relative',
    background: '#fff',

    '& .icon-wrapper': {
        position: 'absolute',
        top: 0,
        left: 16,
        bottom: 0,
        width: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& svg *': {
            opacity: 0.25,
            fill: '#000000',
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
        fill: '#000000',
    },

    '&:hover': {
        background: '#f9f9f9',
        cursor: 'pointer !important',
    },

    '&.is-active': {
        background: '#f9f9f9',
        cursor: 'default !important',
    },
});

interface SidebarItemProps {
    path: string;
    icon: 'communities' | 'organizations' | 'rooms' | 'people';
    active?: boolean;
    onClick: () => void;
}

const SidebarItem = (props: SidebarItemProps) => (
    <SidebarItemWrapper
        path={props.path}
        className={props.active ? 'is-active' : ''}
        onClick={props.onClick}
    >
        <div className="icon-wrapper">
            {props.icon === 'rooms' && <RoomIcon />}
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

const MobileMenuButton = css`
    display: none;
    width: 140px;
    height: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
    font-size: 18px;
    font-weight: 600;
    color: #000000;
    position: absolute;
    left: calc(50% - 70px);
    top: calc(50% - 10px);
    & > .select-icon {
        transform: rotate(90deg);
        margin-left: 6px;
    }
    @media (max-width: 700px) {
        display: flex;
    }
`;

const LinksWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #fff;
    @media (max-width: 700px) {
        position: absolute;
        z-index: 1;
        overflow: hidden;
        height: 0;
        top: 53px;
        width: 100%;

        &.show {
            height: auto;
            overflow: visible;

            &::before {
                content: '';
                display: block;
                position: absolute;
                width: 100%;
                height: calc(100vh - 53px);
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
    }
`;

export const Sidebar = React.memo<{ active?: string }>(props => {
    let [showMenu, handler] = React.useState(false);

    const menuHandler = () => {
        handler(!showMenu);
    };

    return (
        <div className={SidebarWrapper}>
            <div className={SidebarHeader}>
                <span>Directory</span>
                <NewButton />
            </div>
            <div className={MobileMenuButton} onClick={menuHandler}>
                {props.active && (
                    <span>{props.active.charAt(0).toUpperCase() + props.active.slice(1)}</span>
                )}
                <RightIcon className="select-icon" />
            </div>
            <div className={`${LinksWrapper} ${showMenu ? 'show' : undefined}`}>
                <SidebarItem
                    path="/directory"
                    icon="rooms"
                    active={props.active === 'rooms'}
                    onClick={menuHandler}
                />
                <SidebarItem
                    path="/directory/people"
                    icon="people"
                    active={props.active === 'people'}
                    onClick={menuHandler}
                />
                <SidebarItem
                    path="/directory/organizations"
                    icon="organizations"
                    active={props.active === 'organizations'}
                    onClick={menuHandler}
                />
                <SidebarItem
                    path="/directory/communities"
                    icon="communities"
                    active={props.active === 'communities'}
                    onClick={menuHandler}
                />
            </div>
        </div>
    );
});
