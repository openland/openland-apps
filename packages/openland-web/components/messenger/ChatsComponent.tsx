import * as React from 'react';
import { withChatsAll } from '../../api/withChatsAll';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x-format/XDate';
import { ChatListQuery } from 'openland-api/Types';
import { XInput } from 'openland-x/XInput';
import { withChatSearchText } from '../../api/withChatSearchText';
import { XText } from 'openland-x/XText';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import EmptyImage from './components/icons/channels-search-empty.svg';
import CircleIcon from './components/icons/circle-icon.svg';
import ArrowIcon from './components/icons/ic-arrow-rignt.svg';

const ItemContainer = Glamorous.a({
    display: 'flex',
    height: 64,
    fontSize: 15,
    fontWeight: 500,
    color: '#334562',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    '&.is-active': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.05)',
            color: '#334562'
        },
        '& .title, .date, .content': {
            color: '#1790ff !important',
            opacity: '1 !important'
        }
    },
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.05)',
            color: '#334562'
        },
        '& .title, .date, .content': {
            color: '#1790ff !important',
            opacity: '1 !important'
        }
    }
});

const Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 12,
    flexGrow: 1,
    alignItems: 'stretch',
    maxWidth: 'calc(100% - 40px)'
});

const Main = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
    height: 16,
    marginBottom: 6
});

const Title = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.14,
    color: '#5c6a81',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& > span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});

const Date = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.1,
    color: '#5c6a81',
    opacity: 0.5,
    marginLeft: 5
});

const Content = Glamorous.div<{ counterColor?: string }>(props => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .counter': {
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        fontSize: 12,
        fontWeight: 600,
        border: 'none',
        textAlign: 'center',
        backgroundColor: props.counterColor || '#1790ff',
        lineHeight: '10px'
    }
}));

const ContentText = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    fontSize: 14,
    lineHeight: 1.14,
    opacity: 0.5,
    color: '#5c6a81',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& > span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});

let Item = makeNavigable((props) => (
    <ItemContainer
        href={props.href}
        target={props.hrefTarget}
        onClick={props.onClick}
        className={props.active ? 'is-active' : undefined}
    >
        {props.children}
    </ItemContainer>
));

const renderConversation = (v: any) => (
    <Item path={'/mail/' + v.flexibleId} key={v.id}>
        <XAvatar
            style={(v.__typename === 'SharedConversation'
                ? 'organization'
                : v.__typename === 'GroupConversation'
                    ? 'group'
                    : v.__typename === 'ChannelConversation'
                        ? 'channel' : undefined
            )}
            cloudImageUuid={(v.photos || []).length > 0 ? v.photos[0] : undefined}
        />
        <Header>
            <Main>
                <Title className="title"><span>{v.title}</span></Title>
                {v.topMessage && <Date className="date"><XDate value={v.topMessage!!.date} format="datetime_short" /></Date>}
            </Main>
            <Content counterColor={v.settings.mute ? '#9f9f9f' : undefined}>
                <ContentText className="content">
                    {v.topMessage && v.topMessage.message && (
                        <span>{v.topMessage.sender.firstName}: {v.topMessage.message}</span>
                    )}
                    {v.topMessage && !v.topMessage.message && (
                        <span>{v.topMessage.sender.firstName}: File</span>
                    )}
                </ContentText>
                {v.unreadCount > 0 && <XCounter count={v.unreadCount} />}
            </Content>
        </Header>
    </Item>
);

const PlaceholderEmpty = Glamorous(XText)({
    marginLeft: 16,
    opacity: 0.5
});

const PlaceholderLoader = Glamorous(XLoadingCircular)({
    alignSelf: 'center'
});

const NoResultWrapper = Glamorous(XVertical)({
    marginTop: 34
});

const SearchChats = withChatSearchText((props) => {
    let items = (props.data && props.data.items ? props.data.items : []).filter(c => c.topMessage).reduce(
        (p, x) => {
            if (!p.find(c => c.id === x.id)) {
                p.push(x);
            }
            return p;
        },
        [] as any[]
    );
    return props.data && props.data.items ? items.length
        ? (
            <>
                {items.map(renderConversation)}
            </>
        )
        : (
            <NoResultWrapper separator={10} alignItems="center">
                <EmptyImage />
                <PlaceholderEmpty>No results</PlaceholderEmpty>
            </NoResultWrapper>
        )
        : <PlaceholderLoader color="#334562" />;
});

const Search = Glamorous(XInput)({
    margin: 16,
    marginTop: 4,
    height: 36
});

const ExploreChannels = Glamorous(XMenuItem)({
    backgroundColor: '#F3F5F6',
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        color: '#334562'
    }
});

class ChatsComponentInner extends React.PureComponent<{ data: ChatListQuery }, { query: string }> {
    constructor(props: { data: ChatListQuery }) {
        super(props);
        this.state = { query: '' };
    }

    onInput = (q: string) => {
        this.setState({ query: q });
    }

    render() {
        let search = this.state.query && this.state.query.length > 0;
        return (
            <XVertical separator={'none'}>
                <Search
                    value={this.state.query}
                    onChange={this.onInput}
                    size="r-default"
                    placeholder="Search"
                    icon="search"
                    color="primary-sky-blue"
                    cleansable={true}
                />


                {search && <SearchChats variables={{ query: this.state.query!! }} />}
                {!search && <ExploreChannels path={'/mail/channels'}>
                    <XHorizontal alignItems="center" justifyContent="space-between">
                        <XHorizontal alignItems="center" separator={6}>
                            <CircleIcon />
                            <XText>Explore channels</XText>
                        </XHorizontal>
                        <ArrowIcon />
                    </XHorizontal>
                </ExploreChannels>}
                {!search && this.props.data && this.props.data.chats && this.props.data.chats.conversations.map(renderConversation)}
            </XVertical>
        );
    }
}

export const ChatsComponent = withChatsAll((props) => {
    return (
        <XScrollView height="100%">
            <ChatsComponentInner data={props.data} />
        </XScrollView>
    );
});