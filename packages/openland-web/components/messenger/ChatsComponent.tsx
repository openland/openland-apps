import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withChatsAll } from '../../api/withChatsAll';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { DialogListEngine } from 'openland-engines/messenger/DialogListEngine';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x-format/XDate';
import { ChatList } from 'openland-api/Types';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { withChatSearchText } from '../../api/withChatSearchText';
import { XText } from 'openland-x/XText';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XMenuItem } from 'openland-x/XMenuItem';
import ArrowIcon from './components/icons/ic-arrow-rignt-1.svg';
import SearchIcon from '../icons/ic-search-small.svg';
import PhotoIcon from './components/icons/ic-photo.svg';
import FileIcon from './components/icons/ic-file-2.svg';
import { withUserInfo, UserInfoComponentProps } from '../UserInfo';
import { XFont } from 'openland-x/XFont';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { Query } from 'react-apollo';
import { UserQuery } from 'openland-api';

const ItemContainer = Glamorous.a({
    display: 'flex',
    height: 72,
    fontSize: 15,
    fontWeight: 500,
    color: '#334562',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 4,
    paddingBottom: 4,
    position: 'relative',
    '&:hover, &:focus': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            color: '#334562'
        }
    },
    '&.is-active': {
        backgroundColor: 'rgba(112, 100, 255, 0.96)',
        '&:hover': {
            backgroundColor: 'rgba(112, 100, 255, 0.96)',
            color: '#334562'
        },
        '& .title, .date, .content': {
            color: '#fff !important',
            opacity: '1 !important'
            // color: '#1790ff !important',
            // opacity: '1 !important'
        },
    }
});

const Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'stretch',
    paddingLeft: 12,
    paddingRight: 8,
    paddingTop: 8,
    maxWidth: 'calc(100% - 46px)',
    position: 'relative',
    height: 72,
    '&:before': {
        content: ' ',
        display: 'block',
        position: 'absolute',
        left: 11, bottom: 0, right: 0,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
});

const Main = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
    height: 18,
    marginBottom: 4
});

const Title = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    height: 18,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& > span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    ...XFont.h400
});

const Date = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    flexShrink: 0,
    height: 18,
    ...XFont.h100,
    color: '#121e2b',
    opacity: 0.3,
    marginLeft: 5
});

const Content = Glamorous.div<{ counterColor?: string }>(props => ({
    '& svg': {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: '1px 5px -1px 1px',
        '&.document': {
            marginTop: 0,
            marginBottom: 0
        }
    },
}));

const ContentText = Glamorous.div({
    height: 34,

    ...XFont.b300,
    opacity: 0.8,
    // color: '#000',

    '& span': {
        display: 'block',
        height: '100%',
        overflow: 'hidden',
    },

    // Webkit line clamp
    '& > span': {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    '&.with-unread': {
        paddingRight: 32,
    }
});

const ContentCounter = Glamorous.div({
    position: 'absolute',
    right: 11,
    bottom: 10,
});

const ConversationAvatar = Glamorous(XAvatar)({
    marginTop: 2
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
            id: string,
            firstName: string
        },
        file: string | null,
        fileMetadata: {
            name: string,
            isImage: boolean,
        } | null,
    } | null;
    unreadCount: number;
    settings: {
        mute: boolean
    };
    selectedItem: boolean;
    allowSelection: boolean;
}

class ConversationComponentInner extends React.Component<ConversationComponentProps & UserInfoComponentProps> {
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

        let senderName = props.topMessage ? props.user && props.topMessage.sender.id === props.user.id ? 'You' : props.topMessage.sender.firstName : '';

        return (
            <Item path={'/mail/' + props.flexibleId} onClick={props.onSelect} ref={this.handleRef}>
                <ConversationAvatar
                    style={(props.typename === 'SharedConversation'
                        ? 'organization'
                        : props.typename === 'GroupConversation'
                            ? 'group'
                            : props.typename === 'ChannelConversation'
                                ? 'channel' :
                                props.typename === 'PrivateConversation' ? 'user' : undefined
                    )}
                    userName={props.title}
                    userId={props.flexibleId}
                    size="medium"
                    cloudImageUuid={(props.photos || []).length > 0 ? props.photos[0] : props.photo}
                    border="none"
                />
                <Header>
                    <Main>
                        <Title className="title"><span>{props.title}</span></Title>
                        {props.topMessage && <Date className="date"><XDate value={props.topMessage!!.date} format="datetime_short" /></Date>}
                    </Main>
                    <Content>
                        <ContentText className={'content' + ((props.unreadCount > 0) ? ' with-unread' : '')}>
                            {props.topMessage && props.topMessage.message && (
                                <span>{senderName}: {props.topMessage.message}</span>
                            )}
                            {props.topMessage && !props.topMessage.message && props.topMessage.file && props.topMessage.fileMetadata!.isImage && (
                                <span>{senderName}: <PhotoIcon />Image</span>
                            )}
                            {props.topMessage && !props.topMessage.message && props.topMessage.file && !props.topMessage.fileMetadata!.isImage && (
                                <span>{senderName}: <FileIcon className="document" />Document</span>
                            )}
                        </ContentText>
                        {props.unreadCount > 0 && (
                            <ContentCounter>
                                <XCounter big={true} count={props.unreadCount} bgColor={props.settings.mute ? '#9f9f9f' : undefined} />
                            </ContentCounter>
                        )}
                    </Content>
                </Header>
            </Item>
        );
    }
}

const ConversationComponent = withUserInfo((props) => (<ConversationComponentInner {...props} />)) as React.ComponentType<ConversationComponentProps>;

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
    let items = (props.data && props.data.items ? props.data.items : []).reduce(
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
    backgroundColor: '#f3f3f5',
    color: '#334562',
    fontWeight: 600,
    letterSpacing: -0.1,
    transition: 'box-shadow 0.08s ease-in 0s, color 0.08s ease-in 0s, border 0s ease 0s, all 0.15s ease 0s',
    '& svg > path': {
        fill: '#BCC3CC',
        transition: 'all 0.2s ease 0s',
    },
    '&:hover': {
        backgroundColor: '#ecedf0',
        color: '#334562',
    },
    '&:active': {
        backgroundColor: '#117fe4',
        color: '#ffffff',
        '& svg > path': {
            fill: '#ffffff',
        },
    }
});

const LoadingWrapper = Glamorous.div({
    height: 60
});

interface ChatsComponentInnerProps extends XWithRouter {
    data: ChatList;
    emptyState: boolean;
    messenger: MessengerEngine;
}

interface ChatsComponentInnerState {
    query: string;
    select: number;
    chatsLength: number;
    allowShortKeys: boolean;
}

const getScrollView = () => {
    if (!canUseDOM) {
        return null;
    }
    return document.getElementsByClassName('chats-list')[0].getElementsByClassName('scroll-bar')[0].firstChild;
};

class ChatsComponentInner extends React.Component<ChatsComponentInnerProps, ChatsComponentInnerState> {
    readonly dialogListEngine: DialogListEngine;
    inputRef: any;

    constructor(props: ChatsComponentInnerProps) {
        super(props);

        this.dialogListEngine = this.props.messenger.dialogList;

        this.state = {
            query: '',
            select: -1,
            chatsLength: 0,
            allowShortKeys: this.props.emptyState
        };
    }

    onInput = (q: string) => {
        this.setState({ query: q });
        if (q === '' && this.props.data && this.props.data.chats) {
            this.setState({
                chatsLength: this.props.data.chats.conversations.length
            });
        }
    }

    onSelect = () => {
        this.setState({
            query: '',
            chatsLength: this.props.data.chats.conversations.length
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('click', this.mouseHandler);
        if (getScrollView()) {
            getScrollView()!.addEventListener('scroll', this.handleScroll, { passive: true });
        }
        if (this.props.data && this.props.data.chats) {
            this.setState({
                chatsLength: this.props.data.chats.conversations.length
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
        document.removeEventListener('click', this.mouseHandler);
        if (getScrollView()) {
            getScrollView()!.removeEventListener('scroll', this.handleScroll);
        }
    }

    componentWillReceiveProps(nextProps: ChatsComponentInnerProps) {
        if (nextProps.emptyState) {
            this.setState({
                allowShortKeys: true
            });
        }
    }

    handleScroll = (e: any) => {
        let childHeight = (getScrollView() as any)!.firstChild!.offsetHeight;
        let wrapHeight = e.target.offsetHeight;
        let scrollTop = e.target.scrollTop;
        if ((childHeight - (wrapHeight + scrollTop)) < 100) {
            if (this.props.data.chats.next) {
                this.dialogListEngine.loadNext();
            }
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
            if (canUseDOM) {
                if (document.body.classList[0] === 'ReactModal__Body--open' || document.body.classList[0] === 'uploadcare--page') {
                    return;
                }
            }
            switch (String.fromCharCode(e.which).toLowerCase()) {
                case 's':
                    e.preventDefault();
                    this.inputFocusHandler();
                    break;
                default: {
                    return;
                }
            }
        }

        // if (e.shiftKey) {
        //     if (canUseDOM) {
        //         if (document.body.classList[0] === 'ReactModal__Body--open' || document.body.classList[0] === 'uploadcare--page') {
        //             return;
        //         }
        //     }

        //     switch (e.code) {
        //         case 'ArrowUp':
        //             console.log('ArrowUp');
        //             break;
        //         case 'ArrowDown':
        //             console.log('ArrowDown');
        //             break;
        //         default: {
        //             return;
        //         }
        //     }
        // }

        if (!this.props.emptyState && e.code === 'Escape') {
            if (canUseDOM) {
                if (document.body.classList[0] === 'ReactModal__Body--open' || document.body.classList[0] === 'uploadcare--page') {
                    return;
                }

                if ((document as any).isEditMessage) {
                    return;
                }
            }

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
                this.inputFocusHandler();
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

    inputFocusHandler = () => {
        this.inputRef.focus();
        this.setState({
            select: -1,
            allowShortKeys: true
        });
    }

    render() {
        let search = this.state.query && this.state.query.length > 0;
        return (
            <XVertical separator={'none'} flexGrow={1} flexBasis={0}>
                <Search
                    value={this.state.query}
                    onChange={this.onInput}
                    size="r-default"
                    placeholder="Search"
                    icon={<SearchIcon />}
                    color="primary-sky-blue"
                    cleansable={true}
                    innerRef={this.handleRef}
                    onFocus={this.inputFocusHandler}
                />
                {/* {!search && (
                    <ExploreChannels path={'/mail/channels'}>
                        <XHorizontal alignItems="center" justifyContent="space-between">
                            <XText>Explore channels</XText>
                            <ArrowIcon />
                        </XHorizontal>
                    </ExploreChannels>
                )} */}

                <XScrollView2 flexGrow={1} flexBasis={0} className="chats-list">
                    {search && (
                        <SearchChats
                            variables={{ query: this.state.query!! }}
                            onSelect={this.onSelect}
                            itemsCount={this.itemsCount}
                            selectedItem={this.state.select}
                            allowSelection={this.state.allowShortKeys}
                        />
                    )}
                    {!search && this.props.data && this.props.data.chats && (
                        <>
                            {this.props.data.chats.conversations.map((i, j) => {
                                return (
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
                                );
                            })}
                            {this.props.data.chats.next && (
                                <LoadingWrapper>
                                    <XButton alignSelf="center" style="flat" loading={true} />
                                </LoadingWrapper>
                            )}
                        </>

                    )}

                </XScrollView2>
            </XVertical>
        );
    }
}

const ChatsComponentWrapper = withChatsAll(withRouter((props) => {
    return (
        <ChatsComponentInner
            data={props.data}
            emptyState={(props as any).emptyState}
            router={props.router}
            messenger={(props as any).messenger}
        />
    );
})) as React.ComponentType<{ emptyState: boolean, messenger: MessengerEngine; }>;

export class ChatsComponent extends React.Component<{ emptyState: boolean }> {
    render() {
        if (!canUseDOM) {
            return null;
        }
        return (
            <MessengerContext.Consumer>
                {messenger => (
                    <ChatsComponentWrapper
                        emptyState={this.props.emptyState}
                        messenger={messenger}
                    />
                )}
            </MessengerContext.Consumer>
        );
    }
}