import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageComponent } from './MessageComponent';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
import {
    AutoSizer,
    InfiniteLoader,
    List,
    ScrollParams,
    CellMeasurer,
    ListRowProps,
    CellMeasurerCache,
} from 'react-virtualized';

const Loading = Glamorous.div({
    position: 'absolute',
    backgroundColor: 'red',
    color: 'white'
});

let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

function dateFormat(date: number) {
    let now = new Date();
    let dt = date ? new Date(date) : new Date();
    let prefix = '';
    if (now.getFullYear() !== dt.getFullYear()) {
        prefix = dt.getFullYear().toString() + ', ';
    }
    if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
        return 'Today';
    }
    return (prefix + months[dt.getMonth()] + ' ' + dt.getDate() + 'th');
}

const DateDivider = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 8,
    zIndex: 1,
    marginTop: 24,
    marginBottom: 24,
    '& > div': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        '& > span': {
            fontSize: 12,
            fontWeight: 500,
            color: '#334562',
            opacity: 0.5,
            letterSpacing: -0.2
        }
    }
});

let messagesArray: any[] = [];
let prevDate: string | undefined;
let prevMessageDate: number | undefined = undefined;
let prevMessageSender: string | undefined = undefined;
let currentCollapsed = 0;

let appendDateIfNeeded = (date: number) => {
    let dstr = dateFormat(date);
    if (dstr !== prevDate) {
        messagesArray.push(<DateDivider key={'date-' + dstr}><div><span>{dstr}</span></div></DateDivider>);
        prevDate = dstr;
        prevMessageDate = undefined;
        prevMessageSender = undefined;
        currentCollapsed = 0;
    }
};

let shouldCompact = (sender: string, date: number) => {
    if (prevMessageSender === sender && prevMessageDate !== undefined) {
        if (prevMessageDate - date < 10000 && currentCollapsed < 10) {
            prevMessageDate = date;
            currentCollapsed++;
            return true;
        }
    }
    prevMessageDate = date;
    prevMessageSender = sender;
    currentCollapsed = 0;
    return false;
};

interface MessageListProps {
    conversation: ConversationEngine;
    messages: ModelMessage[];
    loadBefore: (id: string) => void;
    conversationType?: string;
    inputShower?: (show: boolean) => void;
    me?: UserShortFragment | null;
}

interface MessageListState {
    scrollToIndex?: number;
    lastMessageId: string;
    messages: any[];
    loading: boolean;
    stopLoading: boolean;
    scrollTop: number;
    firstLoad: boolean;
    scrollHeight: number;
    clientHeight: number;
}

export class MessageListComponent extends React.Component<MessageListProps, MessageListState> {

    timer: any;
    timer2: any;
    timer3: any;

    private cache = new CellMeasurerCache({
        fixedWidth: true
    });

    constructor(props: MessageListProps) {
        super(props);

        this.state = {
            scrollToIndex: undefined,
            lastMessageId: '',
            messages: [],
            loading: false,
            stopLoading: false,
            scrollTop: 200,
            scrollHeight: 200,
            clientHeight: 200,
            firstLoad: true
        };
    }

    clearVirtualizedCache = () => {
        this.cache.clearAll();
    }

    componentDidMount() {
        window.addEventListener('resize', this.clearVirtualizedCache);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.clearVirtualizedCache);
        clearInterval(this.timer);
        clearInterval(this.timer2);
        clearInterval(this.timer3);
    }

    componentWillReceiveProps(newProps: MessageListProps) {
        if (!newProps) {
            return;
        }

        if (this.props.messages.length === 0 || (this.props.conversation.conversationId !== newProps.conversation.conversationId)) {
            this.setState({
                firstLoad: true
            });
            clearInterval(this.timer);
            clearInterval(this.timer2);
            clearInterval(this.timer3);
        }

        if (this.state.loading && this.props.conversation.conversationId === newProps.conversation.conversationId) {
            this.timer3 = setTimeout(() => {
                this.cache.clearAll();
                this.setState({
                    stopLoading: false
                });

            },                       1000);
        }

        if (!this.state.firstLoad && ((this.state.scrollTop + this.state.clientHeight - 200) < this.state.scrollHeight)) {
            this.setState({
                scrollToIndex: messagesArray.length
            });
        }

        this.messagesController(newProps);
    }

    scrollToBottom = () => {
        this.setState({
            scrollToIndex: this.state.messages.length,
            firstLoad: true
        });
    }

    messagesController = (props: MessageListProps) => {
        messagesArray = [];
        prevDate = undefined;
        prevMessageDate = undefined;
        prevMessageSender = undefined;
        currentCollapsed = 0;

        for (let m of props.messages) {
            let date = parseInt(m.date, 10);
            appendDateIfNeeded(date);
            if (isServerMessage(m)) {
                messagesArray.push(
                    <MessageComponent
                        key={'message-' + m.id}
                        compact={shouldCompact(m.sender.id, date)}
                        sender={m.sender as any}
                        message={m}
                        conversation={props.conversation}
                        out={!!(props.me && props.me.id === m.sender.id)}
                    />
                );
            } else {
                messagesArray.push(
                    <MessageComponent
                        key={'pending-' + m.key}
                        compact={shouldCompact(props.conversation.engine.user.id, date)}
                        sender={props.conversation.engine.user}
                        message={m}
                        conversation={props.conversation}
                        out={true}
                    />
                );
            }
        }

        let serverMessages = props.messages.filter(m => isServerMessage(m));
        let lastMessage = serverMessages[0];

        let lastId = '';

        if (!props.conversation.historyFullyLoaded && lastMessage) {
            lastId = (lastMessage as MessageFullFragment).id;
        }

        if (this.state.stopLoading) {
            this.setState({
                scrollToIndex: messagesArray.length - this.state.messages.length + 5
            });
        }

        this.setState({
            messages: messagesArray,
            lastMessageId: lastId,
            loading: false
        });
    }

    isRowLoaded = () => {
        return this.state.scrollTop > 100;
    }

    loadMoreRows = () => {
        let done;
        if (this.state.lastMessageId === '' || this.state.firstLoad || this.state.stopLoading) {
            return new Promise(resolve => done = resolve);
        }

        this.setState({
            loading: true,
            stopLoading: true
        });

        this.timer = setTimeout(() => {
            this.props.loadBefore(this.state.lastMessageId);
        },                      500);
        return new Promise(resolve => done = resolve);
    }

    onScroll = (info: ScrollParams) => {
        let scrollToIndex = undefined;

        if (this.state.firstLoad) {
            scrollToIndex = this.state.messages.length;
        }

        this.timer = setTimeout(() => {
            this.setState({
                firstLoad: false
            });
        },                      100);

        this.setState({
            scrollTop: info.scrollTop,
            clientHeight: info.clientHeight,
            scrollHeight: info.scrollHeight,
            scrollToIndex: scrollToIndex
        });
    }

    render() {

        let { messages, scrollToIndex, loading } = this.state;

        let rowRenderer = (info: ListRowProps) => (
            <CellMeasurer
                cache={this.cache}
                columnIndex={0}
                key={info.key}
                parent={info.parent}
                rowIndex={info.index}
            >
                {({ measure }) => (
                    <div style={info.style} onLoad={measure}>
                        {messages[info.index]}
                    </div>
                )}
            </CellMeasurer>
        );

        return (
            <>
                {loading && <Loading>Loading</Loading>}
                {messages.length > 0 && (
                    <InfiniteLoader
                        isRowLoaded={this.isRowLoaded}
                        loadMoreRows={() => this.loadMoreRows()}
                        rowCount={messages.length}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ width, height }) => (
                                    <List
                                        deferredMeasurementCache={this.cache}
                                        height={height}
                                        width={width}
                                        rowHeight={this.cache.rowHeight}
                                        rowCount={messages.length}
                                        rowRenderer={rowRenderer}
                                        onRowsRendered={onRowsRendered}
                                        scrollToIndex={scrollToIndex}
                                        scrollToAlignment="end"
                                        ref={registerChild}
                                        onScroll={this.onScroll}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </InfiniteLoader>
                )}
            </>
        );
    }
}