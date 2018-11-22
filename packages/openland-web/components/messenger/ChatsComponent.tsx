import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { DialogListEngine, DialogDataSourceItem, formatMessage } from 'openland-engines/messenger/DialogListEngine';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';
import { XAvatar } from 'openland-x/XAvatar';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { withChatSearchText } from '../../api/withChatSearchText';
import { XText } from 'openland-x/XText';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import SearchIcon from '../icons/ic-search-small.svg';
import PhotoIcon from './components/icons/ic-photo.svg';
import FileIcon from './components/icons/ic-file-2.svg';
import { withUserInfo } from '../UserInfo';
import { XFont } from 'openland-x/XFont';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { DataSourceRender } from './components/DataSourceRender';
import { XLink } from 'openland-x/XLink';
import InviteIcon from './components/icons/ic-invite-plus.svg';
import { XDate } from 'openland-x/XDate';
import { DialogView } from './components/DialogView';

const ItemContainer = Glamorous.a({
    display: 'flex',
    height: 72,
    fontSize: 15,
    fontWeight: 500,
    color: '#334562',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
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
        backgroundColor: '#4596e1',
        '&:hover': {
            backgroundColor: '#4596e1',
            color: '#334562'
        },
        '& .title, .content': {
            color: '#fff !important',
            opacity: '1 !important'
        },
        '& .date': {
            color: 'rgba(255, 255, 255, 0.8) !important',
        },
        '& .header:before': {
            display: 'none'
        },
    },
    '&:last-child .header:before': {
        display: 'none'
    }
});

const Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'stretch',
    paddingLeft: 12,
    paddingRight: 16,
    paddingTop: 8,
    maxWidth: 'calc(100% - 40px)',
    position: 'relative',
    height: 72,
    '&:before': {
        content: ' ',
        display: 'block',
        position: 'absolute',
        left: 11, bottom: 0, right: 0,
        height: 1,
        backgroundColor: '#ececec'
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
    ...XFont.h400,
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
});

const Date = Glamorous.div({
    ...XFont.h100,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    flexShrink: 0,
    height: 18,
    color: 'rgba(0, 0, 0, 0.3)',
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
    ...XFont.b300,
    height: 34,
    opacity: 0.8,

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
    right: 16,
    bottom: 8,
});

const ConversationAvatar = Glamorous(XAvatar)({

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

let SelectContext = React.createContext({ select: -1 });

class ConversationComponent extends React.PureComponent<{ conversation: DialogDataSourceItem, selectedItem: boolean, allowSelection: boolean, onSelect: () => void }> {
    refComponent: any;

    componentWillUnmount() {
        console.log('componentWillUnmount ConversationComponent');
    }

    componentDidMount() {
        this.checkFocus();
    }

    componentDidUpdate() {
        this.checkFocus();
    }

    checkFocus = () => {
        if (this.props.selectedItem === true && this.props.allowSelection) {
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

        return (<DialogView item={this.props.conversation} />);
        // let conv = this.props.conversation;
        // let isPrivate = conv.type === 'PrivateConversation';
        // return (
        //     <Item path={'/mail/' + conv.key} onClick={this.props.onSelect} ref={this.handleRef}>
        //         <ConversationAvatar
        //             style={(conv.type === 'SharedConversation'
        //                 ? 'organization'
        //                 : conv.type === 'GroupConversation'
        //                     ? 'group'
        //                     : conv.type === 'ChannelConversation'
        //                         ? 'room' :
        //                         isPrivate ? 'user' : undefined
        //             )}
        //             objectName={conv.title}
        //             objectId={conv.flexibleId}
        //             online={conv.online}
        //             cloudImageUuid={conv.photo}
        //         />
        //         <Header className="header">
        //             <Main>
        //                 <Title className="title"><span>{conv.title}</span></Title>
        //                 {conv.date && <Date className="date"><XDate value={conv.date.toString()} format="datetime_short" /></Date>}
        //             </Main>
        //             <Content>
        //                 <ContentText className={'content' + ((conv.unread > 0) ? ' with-unread' : '')}>
        //                     {conv.typing || (
        //                         <>
        //                             {!!(conv.message) && !conv.fileMeta && (
        //                                 <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} {conv.message}</span>
        //                             )}
        //                             {conv.fileMeta && conv.fileMeta.isImage && (
        //                                 <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <PhotoIcon />Image</span>
        //                             )}
        //                             {conv.fileMeta && !conv.fileMeta.isImage && (
        //                                 <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <FileIcon className="document" />Document</span>
        //                             )}
        //                         </>
        //                     )}
        //                 </ContentText>
        //                 {conv.unread > 0 && (
        //                     <ContentCounter>
        //                         <XCounter big={true} count={conv.unread} />
        //                         {/* <XCounter big={true} count={props.unread} bgColor={(props.settings && props.settings.mute) ? '#9f9f9f' : undefined} /> */}
        //                     </ContentCounter>
        //                 )}
        //             </Content>
        //         </Header>
        //     </Item>
        // );
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

const SearchChats = withChatSearchText(withUserInfo((props) => {
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
                            <SelectContext.Consumer>
                                {select => {
                                    console.warn('context changed');
                                    return <ConversationComponent
                                        key={i.id}
                                        onSelect={(props as any).onSelect}
                                        conversation={{
                                            sender: i.topMessage ? (props.user && (i.topMessage.sender.id === props.user.id) ? 'You' : i.topMessage.sender.name) : undefined,
                                            key: i.id,
                                            flexibleId: i.flexibleId,
                                            message: i.topMessage && formatMessage(i.topMessage),
                                            type: i.__typename,
                                            title: i.title,
                                            photo: i.photo || i.photos[0],
                                            unread: i.unreadCount,
                                            fileMeta: i.topMessage && i.topMessage.fileMetadata
                                        }}
                                        selectedItem={select.select === j}
                                        allowSelection={(props as any).allowSelection}
                                    />;
                                }}
                            </SelectContext.Consumer>

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
})) as React.ComponentType<{ variables: { query: string }, onSelect: () => void, itemsCount: (el: number) => void, allowSelection: boolean }>;

const Search = Glamorous(XInput)({
    marginLeft: 16,
    marginRight: 16,
    marginTop: 5,
    marginBottom: 12,
    height: 36,
    '& svg > g > path:last-child': {
        fill: '#c8c8c8'
    },
    '&:focus-within svg > g > path:last-child': {
        fill: 'rgba(23, 144, 255, 0.5)'
    },
    '& .input-placeholder, & input': {
        paddingLeft: 33,
    },
    '> .icon': {
        left: 12
    },
});

const LoadingWrapper = Glamorous.div({
    height: 60
});

interface ChatsComponentInnerProps extends XWithRouter {
    emptyState: boolean;
    messenger: MessengerEngine;
}

interface ChatsComponentInnerState {
    query: string;
    select: number;
    allowShortKeys: boolean;
}

const InviteWrapper = Glamorous(XLink)({
    borderTop: '1px solid #ececec',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2196f3',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    '&:hover': {
        backgroundColor: '#F9F9F9',
    },
    '& svg': {
        width: 16,
        height: 16,
        display: 'block',
        opacity: 0.6,
        marginRight: 6,
        '& *': {
            fill: '#2196f3'
        }
    },
    'span': {
        display: 'block',
    }
});

class ChatsComponentInner extends React.PureComponent<ChatsComponentInnerProps, ChatsComponentInnerState> {
    readonly dialogListEngine: DialogListEngine;
    items: DialogDataSourceItem[] = [];
    searchCount = 0;
    inputRef: any;

    constructor(props: ChatsComponentInnerProps) {
        super(props);

        this.dialogListEngine = this.props.messenger.dialogList;

        this.state = {
            query: '',
            select: -1,
            allowShortKeys: this.props.emptyState,
        };
    }

    onInput = (q: string) => {
        this.setState({ query: q });
    }

    onSelect = () => {
        this.setState({
            query: '',
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('click', this.mouseHandler);
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

    handleScroll = (top: number) => {
        if (top > 0.9) {
            this.dialogListEngine.loadNext();
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

        if (!canUseDOM) {
            return;
        }

        let { allowShortKeys } = this.state;

        let stayChecker = document.body.classList[0] === 'ReactModal__Body--open' || document.body.classList[0] === 'uploadcare--page';

        if (!e.altKey && e.ctrlKey) {
            if (stayChecker) {
                return;
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

        if (e.altKey && !e.ctrlKey) {
            if (stayChecker) {
                return;
            }

            let index = this.items.findIndex(d => d.key === this.props.router.routeQuery.conversationId);
            switch (e.code) {
                case 'ArrowUp':
                    index--;
                    break;
                case 'ArrowDown':
                    index++;
                    break;
                default: {
                    return;
                }
            }
            index = Math.max(0, index);
            index = Math.min(this.items.length - 1, index);

            if (this.items[index]) {
                this.props.router.push('/mail/' + this.items[index].key);
            }
        }

        if (e.altKey && e.ctrlKey) {
            if (stayChecker) {
                return;
            }

            if (e.code === 'KeyN') {
                this.props.router.push('/mail/new');
            }
        }

        if (!this.props.emptyState && e.code === 'Escape') {
            if (stayChecker || (document as any).isEditMessage) {
                return;
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

            y = Math.min(((this.state.query && this.state.query.length > 0) ? this.searchCount : this.items.length) - 1, Math.max(-1, y));

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
        this.searchCount = items;
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

    renderConversationComponent = (props: any) => (
        <>
            {props.items.map((i: any, j: any) => {
                return (
                    <SelectContext.Consumer key={i.key}>
                        {select => {
                            return (
                                <ConversationComponent
                                    key={i.key}
                                    onSelect={this.onSelect}
                                    conversation={i}
                                    selectedItem={select.select === j}
                                    allowSelection={this.state.allowShortKeys}
                                />
                            );
                        }}
                    </SelectContext.Consumer>

                );
            })}
            {!props.completed && (
                <LoadingWrapper>
                    <XButton alignSelf="center" style="flat" loading={true} />
                </LoadingWrapper>
            )}
        </>
    )

    render() {
        let search = this.state.query && this.state.query.length > 0;
        return (
            <XVertical separator={'none'} flexGrow={1} flexBasis={0}>
                <Search
                    value={this.state.query}
                    onChange={this.onInput}
                    size="large"
                    placeholder="Search"
                    icon={<SearchIcon />}
                    cleanable={true}
                    innerRef={this.handleRef}
                    onFocus={this.inputFocusHandler}
                />
                <SelectContext.Provider value={{ select: this.state.select }}>
                    <XScrollView2 flexGrow={1} flexBasis={0} onScroll={this.handleScroll}>
                        {search && (
                            <SearchChats
                                variables={{ query: this.state.query!! }}
                                onSelect={this.onSelect}
                                itemsCount={this.itemsCount}
                                allowSelection={this.state.allowShortKeys}
                            />
                        )}
                        {!search && (
                            <DataSourceRender
                                onChange={(items) => {
                                    this.items = items;
                                }}
                                dataSource={this.props.messenger.dialogList.dataSource}
                                render={this.renderConversationComponent}
                            />
                        )}
                    </XScrollView2>
                </SelectContext.Provider>

                <InviteWrapper query={{ field: 'invite_global', value: 'true' }}>
                    <InviteIcon />
                    <span>Invite people</span>
                </InviteWrapper>
            </XVertical>
        );
    }
}

const ChatsComponentWrapper = withRouter((props) => {
    return (
        <ChatsComponentInner
            emptyState={(props as any).emptyState}
            router={props.router}
            messenger={(props as any).messenger}
        />
    );
}) as React.ComponentType<{ emptyState: boolean, messenger: MessengerEngine; }>;

export class ChatsComponent extends React.PureComponent<{ emptyState: boolean }> {
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