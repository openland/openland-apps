import * as React from 'react';
import Glamorous from 'glamorous';
import { XScrollView } from 'openland-x/XScrollView';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import ChannelIcon from './icons/ic-channels-empty.svg';
import ChatIcon from './icons/ic-organization-empty.svg';
import ListingIcon from './icons/ic-listings-empty.svg';

const ChannelsLineWidth = [
    {
        main: 109,
        sub: 79
    },
    {
        main: 129,
        sub: 99
    },
    {
        main: 89,
        sub: 59
    },
    {
        main: 109,
        sub: 79
    },
    {
        main: 119,
        sub: 89
    }
];

const ChatsLineWidth = [
    {
        main: 106,
        sub: 143
    },
    {
        main: 126,
        sub: 105
    },
    {
        main: 96,
        sub: 173
    },
    {
        main: 106,
        sub: 113
    }
];

const ListingsLineWidth = [
    {
        main: 149,
        sub: 63,
        sm: 33
    },
    {
        main: 129,
        sub: 69,
        sm: 38
    },
    {
        main: 169,
        sub: 93,
        sm: 0
    }
];

const SidebarWrapper = Glamorous(XScrollView)({
    flexShrink: 0,
    width: 280,
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: '#f9fafb',
    paddingLeft: 22,
    borderRight: '1px solid #E1E3E8'
});

const Logo = Glamorous.div<{ width?: number, height?: number }>((props) => ({
    width: '100%',
    height: 48,
    backgroundImage: 'url(\'/static/X/logotype.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    marginBottom: 20,
    marginTop: 27,
    marginLeft: -6
}));

const SidebarContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

const SidebarSection = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 25
});

const SectionContent = Glamorous(XVertical)({
    position: 'relative',
});

const SidebarTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: -0.4,
    color: '#334562',
    marginBottom: 18
});

const ChatAvatarWrapper = Glamorous.div<{ small: boolean, borderRadius: number }>(props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: props.small ? 36 : 44,
    height: props.small ? 36 : 44,
    borderRadius: props.borderRadius,
    backgroundColor: '#ECEEF3'
}));

const ChatMainLine = Glamorous.div<{ small: boolean, width: number }>(props => ({
    width: props.width,
    height: props.small ? 15 : 16,
    opacity: 0.3,
    borderRadius: 5,
    backgroundColor: '#707ea0'
}));

const ChatSubLine = Glamorous.div<{ small: boolean, width: number }>(props => ({
    width: props.width,
    height: props.small ? 8 : 12,
    borderRadius: 3,
    backgroundColor: 'rgba(198, 204, 218, 0.4)'
}));

const ChatSmWrapper = Glamorous(XHorizontal)({
    paddingLeft: 62
});

const ChatSmLine = Glamorous.div<{ width: number }>(props => ({
    width: props.width,
    height: 9,
    borderRadius: 3,
    backgroundColor: 'rgba(198, 204, 218, 0.4)'
}));

const Shadow = Glamorous.div({
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
    backgroundImage: 'linear-gradient(to bottom, rgba(249, 250, 251, 0), #f9fafb)'
});

export const Sidebar = () => {
    let channelsCount = 5;
    let chatsCount = 4;
    let listingsCount = 3;

    let ChannelsComponents: any[] = [];
    let ChatsComponents: any[] = [];
    let ListingsComponents: any[] = [];

    for (let i = 0; i < channelsCount; i++) {
        ChannelsComponents.push(
            <XHorizontal alignItems="center">
                <ChatAvatarWrapper small={true} borderRadius={5}>
                    <ChannelIcon />
                </ChatAvatarWrapper>
                <XVertical separator={4}>
                    <ChatMainLine width={ChannelsLineWidth[i].main} small={false} />
                    <ChatSubLine width={ChannelsLineWidth[i].sub} small={true} />
                </XVertical>
            </XHorizontal>
        );
    }

    for (let i = 0; i < chatsCount; i++) {
        ChatsComponents.push(
            <XHorizontal alignItems="center">
                <ChatAvatarWrapper small={false} borderRadius={50}>
                    <ChatIcon />
                </ChatAvatarWrapper>
                <XVertical separator={4}>
                    <ChatMainLine width={ChatsLineWidth[i].main} small={true} />
                    <ChatSubLine width={ChatsLineWidth[i].sub} small={true} />
                </XVertical>
            </XHorizontal>
        );
    }

    for (let i = 0; i < listingsCount; i++) {
        ListingsComponents.push(
            <XVertical>
                <XHorizontal alignItems="center" separator={9}>
                    <ChatAvatarWrapper small={false} borderRadius={9}>
                        <ListingIcon />
                    </ChatAvatarWrapper>
                    <XVertical separator={5}>
                        <ChatMainLine width={ChatsLineWidth[i].main} small={false} />
                        <ChatSubLine width={ChatsLineWidth[i].sub} small={false} />
                    </XVertical>
                </XHorizontal>
                <ChatSmWrapper separator={4}>
                    {i === 0 && <ChatSmLine width={ListingsLineWidth[i].sm}/>}
                    <ChatSmLine width={ListingsLineWidth[i].sm}/>
                </ChatSmWrapper>
            </XVertical>
        );
    }

    return (
        <SidebarWrapper>
            <Logo />
            <SidebarContent>
                <SidebarSection>
                    <SidebarTitle>Channels</SidebarTitle>
                    <SectionContent>
                        {ChannelsComponents}
                        <Shadow/>
                    </SectionContent>
                </SidebarSection>
                <SidebarSection>
                    <SidebarTitle>Chats</SidebarTitle>
                    <SectionContent>
                        {ChatsComponents}
                        <Shadow/>
                    </SectionContent>
                </SidebarSection>
                <SidebarSection>
                    <SidebarTitle>Listings</SidebarTitle>
                    <SectionContent>
                        {ListingsComponents}
                        <Shadow/>
                    </SectionContent>
                </SidebarSection>
            </SidebarContent>
        </SidebarWrapper>
    );
};