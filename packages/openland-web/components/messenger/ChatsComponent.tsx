import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withChatsAll } from '../../api/withChatsAll';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
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
    '&:hover, &:focus': {
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
        innerRef={(props as any).ref}
        tabIndex={0}
    >
        {props.children}
    </ItemContainer>
)) as React.ComponentType<{ ref: (e: any) => void, path: string, onClick?: () => void }>;

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
    selectedItem: boolean;
    allowSelection: boolean;
}

class ConversationComponent extends React.Component<ConversationComponentProps> {
    refComponent: any;

    componentWillReceiveProps(nextProps: ConversationComponentProps) {
        if (nextProps.selectedItem === true && nextProps.allowSelection) {
            this.reactDom(this.refComponent);
        }
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.refComponent = e;
    }

    reactDom = (el: any) => {
        if (ReactDOM.findDOMNode(el) !== null) {
            this.setFocus(ReactDOM.findDOMNode(el));
        }
    }

    setFocus = (el: any) => {
        el.focus();
    }

    render() {

        let { props } = this;

        return (
            <Item path={'/mail/' + props.flexibleId} onClick={props.onSelect} ref={this.handleRef}>
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
    }
}

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

    if (props.data && props.data.items && items) {
        (props as any).itemsCount(items.length);
    }

    return (
        props.data && props.data.items
            ? items.length
                ? (
                    <>
                        {items.map((i, j) => (
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
                                selectedItem={(props as any).selectedItem === j}
                                allowSelection={(props as any).allowSelection}
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
            : <PlaceholderLoader color="#334562" />
    );
}) as React.ComponentType<{ variables: { query: string }, onSelect: () => void, itemsCount: (el: number) => void, selectedItem: number, allowSelection: boolean }>;

const Search = Glamorous(XInput)({
    marginLeft: 12,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 16,
    height: 36,
    '&:focus-within svg > g > path:last-child': {
        fill: 'rgba(23, 144, 255, 0.5)'
    }
});

const ExploreChannels = Glamorous(XMenuItem)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 13,
    paddingTop: 1,
    paddingBottom: 0,
    backgroundColor: '#F3F5F6',
    color: '#5c6a81',
    fontWeight: 600,
    letterSpacing: -0.1,
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        color: '#1790ff',
        '& svg > path': {
            fill: 'rgba(23, 144, 255, 0.5)'
        }
    }
});

interface ChatsComponentInnerProps extends XWithRouter {
    data: ChatListQuery;
    emptyState: boolean;
}

interface ChatsComponentInnerState {
    query: string;
    select: number;
    chatsLength: number;
    allowShortKeys: boolean;
}

class ChatsComponentInner extends React.Component<ChatsComponentInnerProps, ChatsComponentInnerState> {
    inputRef: any;

    constructor(props: ChatsComponentInnerProps) {
        super(props);

        this.state = {
            query: '',
            select: -1,
            chatsLength: 0,
            allowShortKeys: this.props.emptyState
        };
    }

    onInput = (q: string) => {
        this.setState({ query: q });
    }

    onSelect = () => {
        this.setState({ query: '' });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('click', this.mouseHandler);
        if (this.props.data && this.props.data.chats) {
            this.setState({
                chatsLength: this.props.data.chats.conversations.length
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
        document.removeEventListener('click', this.mouseHandler);
    }

    componentWillReceiveProps(nextProps: ChatsComponentInnerProps) {
        if (nextProps.emptyState) {
            this.setState({
                allowShortKeys: true
            });
        }
    }

    mouseHandler = (e: any) => {
        if (!this.props.emptyState) {
            this.setState({
                allowShortKeys: ReactDOM.findDOMNode(this.inputRef)!.contains(e.target)
            });
        }
    }

    keydownHandler = (e: any) => {

        let { allowShortKeys } = this.state;

        if (e.ctrlKey) {
            switch (String.fromCharCode(e.which).toLowerCase()) {
                case 's':
                    e.preventDefault();
                    this.inputFocusHandler(-1);
                    break;
                default: {
                    return;
                }
            }
        }

        if (!this.props.emptyState && e.code === 'Escape') {
            this.props.router.replace('/mail');
        }

        if (!allowShortKeys) {
            return;
        }

        if (allowShortKeys && (e.code === 'ArrowUp' || e.code === 'ArrowDown')) {

            let dy = 0;

            if (e.code === 'ArrowUp') {
                e.preventDefault();
                dy = -1;
            }
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                dy = 1;
            }

            let y = this.state.select + dy;

            y = Math.min(this.state.chatsLength - 1, Math.max(-1, y));

            if (y === -1) {
                this.inputFocusHandler(y);
                return;
            }

            this.setState({
                select: y
            });
        }
    }

    itemsCount = (items: number) => {
        if (items !== this.state.chatsLength) {
            this.setState({
                chatsLength: items
            });
        }
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.inputRef = e;
    }

    inputFocusHandler = (y: number) => {
        this.inputRef.focus();
        this.setState({
            select: y,
            allowShortKeys: true
        });
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
                    innerRef={this.handleRef}
                    onFocus={() => this.inputFocusHandler(-1)}
                />

                {search && (
                    <SearchChats
                        variables={{ query: this.state.query!! }}
                        onSelect={this.onSelect}
                        itemsCount={this.itemsCount}
                        selectedItem={this.state.select}
                        allowSelection={this.state.allowShortKeys}
                    />
                )}
                {!search && (
                    <ExploreChannels path={'/mail/channels'}>
                        <XHorizontal alignItems="center" justifyContent="space-between">
                            <XText>Explore channels</XText>
                            <ArrowIcon />
                        </XHorizontal>
                    </ExploreChannels>
                )}
                {!search && this.props.data && this.props.data.chats &&
                    this.props.data.chats.conversations.map((i, j) => (
                        <ConversationComponent
                            key={i.id}
                            id={i.id}
                            onSelect={this.onSelect}
                            flexibleId={i.flexibleId}
                            typename={i.__typename}
                            title={i.title}
                            photos={i.photos}
                            photo={(i as any).photo}
                            topMessage={i.topMessage}
                            unreadCount={i.unreadCount}
                            settings={i.settings}
                            selectedItem={this.state.select === j}
                            allowSelection={this.state.allowShortKeys}
                        />
                    ))
                }
            </XVertical>
        );
    }
}

export const ChatsComponent = withChatsAll(withRouter((props) => {
    return (
        <XScrollView height="100%">
            <ChatsComponentInner data={props.data} emptyState={(props as any).emptyState} router={props.router} />
        </XScrollView>
    );
})) as React.ComponentType<{ emptyState: boolean }>;