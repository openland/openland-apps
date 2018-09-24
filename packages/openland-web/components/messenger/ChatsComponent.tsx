import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
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
import { OnlinesComponent, OnlineContext } from './components/OnlineComponent';
import ArrowIcon from './components/icons/ic-arrow-rignt-1.svg';
import SearchIcon from '../icons/ic-search-small.svg';
import PhotoIcon from './components/icons/ic-photo.svg';
import FileIcon from './components/icons/ic-file-2.svg';
import { withUserInfo, UserInfoComponentProps } from '../UserInfo';

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
        },
        '& .content svg *': {
            fill: '#1790ff !important',
            opacity: '0.5 !important'
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
        },
        '& .content svg *': {
            fill: '#1790ff !important',
            opacity: '0.5 !important'
        }
    },
    position: 'relative'
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
    alignItems: 'center',
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

    online: boolean;
}

const OnlineDot = Glamorous.div({
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#69d06d',
    border: 'solid 1px #f9fafb',
    borderRadius: 50,
    left: 48,
    top: 42
});

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
                <XAvatar
                    style={(props.typename === 'SharedConversation'
                        ? 'organization'
                        : props.typename === 'GroupConversation'
                            ? 'group'
                            : props.typename === 'ChannelConversation'
                                ? 'channel' : 'colorus'
                    )}
                    userName={props.title}
                    userId={props.flexibleId}
                    cloudImageUuid={(props.photos || []).length > 0 ? props.photos[0] : props.photo}
                />
                {this.props.online && <OnlineDot />}
                <Header>
                    <Main>
                        <Title className="title"><span>{props.title}</span></Title>
                        {props.topMessage && <Date className="date"><XDate value={props.topMessage!!.date} format="datetime_short" /></Date>}
                    </Main>
                    <Content>
                        <ContentText className="content">
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
                        {props.unreadCount > 0 && <XCounter big={true} count={props.unreadCount} bgColor={props.settings.mute ? '#9f9f9f' : undefined} />}
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

                                online={false}
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
    backgroundColor: '#f0f2f4',
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
                    this.inputFocusHandler();
                    break;
                default: {
                    return;
                }
            }
        }

        if (!this.props.emptyState && e.code === 'Escape') {
            if (canUseDOM) {
                if (document.body.classList[0] === 'ReactModal__Body--open' || document.body.classList[0] === 'uploadcare--page') {
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
                    onFocus={this.inputFocusHandler}
                />
                {!search && (
                    <ExploreChannels path={'/mail/channels'}>
                        <XHorizontal alignItems="center" justifyContent="space-between">
                            <XText>Explore channels</XText>
                            <ArrowIcon />
                        </XHorizontal>
                    </ExploreChannels>
                )}

                <XScrollView height="100%">
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
                        <OnlinesComponent>
                            <OnlineContext.Consumer>
                                {onlines => {
                                    let onlinesArray: string[] = [];

                                    if (onlines !== undefined && onlines.onlines) {
                                        Array.from(onlines.onlines).map(i => onlinesArray.push(i[0]));
                                    }
                                    return (
                                        <>
                                            {this.props.data.chats.conversations.map((i, j) => {
                                                let isOnline = false;

                                                for (let item of onlinesArray) {
                                                    if (item === i.flexibleId) {
                                                        isOnline = true;
                                                    }
                                                }

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

                                                        online={isOnline}
                                                    />
                                                );
                                            })}
                                        </>
                                    );
                                }}
                            </OnlineContext.Consumer>
                        </OnlinesComponent>
                    )}
                </XScrollView>
            </XVertical>
        );
    }
}

export const ChatsComponent = withChatsAll(withRouter((props) => {
    return (
        <ChatsComponentInner data={props.data} emptyState={(props as any).emptyState} router={props.router} />
    );
})) as React.ComponentType<{ emptyState: boolean }>;