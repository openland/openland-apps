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
import CircleIcon from './components/icons/circle-icon.svg';
import ArrowIcon from './components/icons/ic-arrow-rignt-1.svg';
import SearchIcon from '../icons/ic-search-small.svg';

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
    height: 16,
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
    alignItems: 'center'

}));

const ContentText = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    height: 16,
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

interface ConversationComponentProps {
    onSelect?: () => void;
    id: string;
    flexibleId: string;
    typename: 'ChannelConversation' | 'AnonymousConversation' | 'SharedConversation' | 'PrivateConversation' | 'GroupConversation';
    title: string;
    photos: string[];
    photo?: string | null;
    topMessage: {
        date: string,
        message: string | null,
        sender: {
            firstName: string
        }
    } | null;
    unreadCount: number;
    settings: {
        mute: boolean
    };
}

const ConversationComponent = (props: ConversationComponentProps) => (
    <Item path={'/mail/' + props.flexibleId} onClick={props.onSelect}>
        <XAvatar
            style={(props.typename === 'SharedConversation'
                ? 'organization'
                : props.typename === 'GroupConversation'
                    ? 'group'
                    : props.typename === 'ChannelConversation'
                        ? 'channel' : 'colorus'
            )}
            userName={props.title}
            userId={props.id}
            cloudImageUuid={(props.photos || []).length > 0 ? props.photos[0] : props.photo}
        />
        <Header>
            <Main>
                <Title className="title"><span>{props.title}</span></Title>
                {props.topMessage && <Date className="date"><XDate value={props.topMessage!!.date} format="datetime_short" /></Date>}
            </Main>
            <Content>
                <ContentText className="content">
                    {props.topMessage && props.topMessage.message && (
                        <span>{props.topMessage.sender.firstName}: {props.topMessage.message}</span>
                    )}
                    {props.topMessage && !props.topMessage.message && (
                        <span>{props.topMessage.sender.firstName}: File</span>
                    )}
                </ContentText>
                {props.unreadCount > 0 && <XCounter big={true} count={props.unreadCount} bgColor={props.settings.mute ? '#9f9f9f' : undefined} />}
            </Content>
        </Header>
    </Item>
);

const PlaceholderEmpty = Glamorous(XText)({
    opacity: 0.5
});

const PlaceholderLoader = Glamorous(XLoadingCircular)({
    alignSelf: 'center'
});

const NoResultWrapper = Glamorous(XVertical)({
    marginTop: 34
});

const Image = Glamorous.div({
    width: 178,
    height: 155,
    backgroundImage: 'url(\'/static/X/messenger/channels-search-empty.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
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
    return props.data && props.data.items
        ? items.length
            ? (
                <>
                    {items.map(i => (
                        <ConversationComponent
                            key={i.id}
                            id={i.id}
                            onSelect={(props as any).onSelect}
                            flexibleId={i.flexibleId}
                            typename={i.__typename}
                            title={i.title}
                            photos={i.photos}
                            photo={i.photo}
                            topMessage={i.topMessage}
                            unreadCount={i.unreadCount}
                            settings={i.settings}
                        />
                    ))}
                </>
            )
            : (
                <NoResultWrapper separator={10} alignItems="center">
                    <Image />
                    <PlaceholderEmpty>No results</PlaceholderEmpty>
                </NoResultWrapper>
            )
        : <PlaceholderLoader color="#334562" />;
}) as React.ComponentType<{ variables: { query: string }, onSelect: () => void }>;

const Search = Glamorous(XInput)({
    margin: 16,
    marginTop: 4,
    height: 36,
    '&:focus-within svg > g > path:last-child': {
        fill: 'rgba(23, 144, 255, 0.5)'
    }
});

const ExploreChannels = Glamorous(XMenuItem)({
    backgroundColor: '#F3F5F6',
    color: '#5c6a81',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        color: '#1790ff',
        '& svg > path': {
            fill: 'rgba(23, 144, 255, 0.5)'
        }
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

    onSelect = () => {
        this.setState({ query: '' });
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
                    icon={<SearchIcon />}
                    color="primary-sky-blue"
                    cleansable={true}
                />

                {search && <SearchChats variables={{ query: this.state.query!! }} onSelect={this.onSelect} />}
                {!search && (
                    <ExploreChannels path={'/mail/channels'}>
                        <XHorizontal alignItems="center" justifyContent="space-between">
                            <XHorizontal alignItems="center" separator={6}>
                                <CircleIcon />
                                <XText>Explore channels</XText>
                            </XHorizontal>
                            <ArrowIcon />
                        </XHorizontal>
                    </ExploreChannels>
                )}
                {!search && this.props.data && this.props.data.chats &&
                    this.props.data.chats.conversations.map(i => (
                        <ConversationComponent
                            key={i.id}
                            id={i.id}
                            onSelect={this.onSelect}
                            flexibleId={i.flexibleId}
                            typename={i.__typename}
                            title={i.title}
                            photos={i.photos}
                            topMessage={i.topMessage}
                            unreadCount={i.unreadCount}
                            settings={i.settings}
                        />
                    ))
                }
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