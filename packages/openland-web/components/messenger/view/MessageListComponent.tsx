import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { MessageComponent } from '../message/MessageComponent';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { ConversationEngine, DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { XButton } from 'openland-x/XButton';
import { MessageFull, UserShort, SharedRoomKind } from 'openland-api/Types';
import { EmptyBlock } from '../../../fragments/ChatEmptyComponent';
import { XResizeDetector } from 'openland-x/XResizeDetector';
import { EditPostProps } from '../../../fragments/MessengerRootComponent';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { DataSourceRender } from './DataSourceRender';
import glamorous from 'glamorous';
import { ServiceMessageComponent } from '../message/content/ServiceMessageComponent';
import { formatDate } from 'openland-mobile/utils/formatDate';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateFormat(date: number) {
    let now = new Date();
    let dt = date ? new Date(date) : new Date();
    let prefix = '';
    if (now.getFullYear() !== dt.getFullYear() + 1 && now.getFullYear() !== dt.getFullYear()) {
        prefix = dt.getFullYear().toString() + ', ';
    }
    if (
        now.getFullYear() === dt.getFullYear() &&
        now.getMonth() === dt.getMonth() &&
        now.getDate() === dt.getDate()
    ) {
        return 'Today';
    }
    return prefix + months[dt.getMonth()] + ' ' + dt.getDate() + 'th';
}

const messagesWrapperClassName = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-self: center;
    padding-top: 96px;
    padding-bottom: 40px;
    width: 100%;
    max-width: 930px;
    @media (min-width: 750px) {
        min-width: 512px;
    }
`;

const MessagesWrapper = (props: { children?: any }) => (
    <div className={messagesWrapperClassName}>{props.children}</div>
);

const messagesWrapperEmptyClassName = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-self: center;
    justify-content: center;
    flex-grow: 1;
    padding-top: 20px;
    padding-bottom: 0px;
    width: 100%;
    maxwidth: 930px;
    @media (min-width: 750px) {
        minwidth: 512px;
    }
`;

const MessagesWrapperEmpty = (props: { children?: any }) => (
    <div className={messagesWrapperEmptyClassName}>{props.children}</div>
);

interface MessageListProps {
    conversation: ConversationEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    conversationId: string;
    editPostHandler?: (data: EditPostProps) => void;
}

const getScrollElement = (src: any) => src;
const getScrollView = () => {
    return getScrollElement(
        document
            .getElementsByClassName('messages-wrapper')[0]
            .getElementsByClassName('simplebar-scroll-content')[0],
    );
};

const LoadingWrapper = glamorous.div({
    height: 50,
});

export class MessageListComponent extends React.PureComponent<MessageListProps> {
    private scroller = React.createRef<XScrollViewReversed>();
    unshifted = false;

    constructor(props: MessageListProps) {
        super(props);
    }

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
    };

    componentDidMount() {
        if (!canUseDOM) {
            return;
        }
        getScrollView().addEventListener('scroll', this.handleScroll, {
            passive: true,
        });
    }

    componentWillUnmount() {
        getScrollView().removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e: any) => {
        if (e.target.scrollTop < 50) {
            this.props.conversation.loadBefore();
        }
    };

    isEmpty = () => {
        return this.props.conversation.historyFullyLoaded && this.props.conversation.getState().messages.length === 1;
    };

    resizeHandler = (width: number, height: number) => {
        if (canUseDOM && this.scroller && this.scroller.current) {
            this.scroller.current.restorePreviousScroll();
        }
    };

    renderMessage = (i: DataSourceMessageItem | DataSourceDateItem) => {
        if (i.type === 'message') {
            return <MessageComponent key={i.key} message={i} conversation={this.props.conversation} editPostHandler={this.props.editPostHandler} me={this.props.me} />

        } else if (i.type === 'date') {
            let now = new Date();
            let date = 'Today';
            if (now.getFullYear() === i.year) {
                if (now.getMonth() !== i.month || now.getDate() !== i.date) {
                    date = months[i.month] + ' ' + i.date;
                }
            } else {
                date = i.year + ', ' + months[i.month] + ' ' + i.date;
            }
            return <XView
                key={'date-' + i.key}
                justifyContent="center"
                alignItems="center"
                zIndex={1}
                marginTop={24}
                marginBottom={0}
            >
                <XView
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#ffffff"
                    borderRadius={50}
                    paddingLeft={10}
                    paddingRight={10}
                    paddingTop={2}
                    paddingBottom={2}
                >
                    <XView fontSize={13} color="#99A2B0">{date}</XView>
                </XView>
            </XView>
        }
        return <div />;
    }

    renderLoading = () => {
        return (
            <LoadingWrapper>
                <XButton alignSelf="center" style="flat" loading={true} />
            </LoadingWrapper>

        );
    };

    getScrollElement = (src: any) => src.children[0].children[0];

    dataSourceWrapper = (props: any) => (
        <XScrollViewReversed
            ref={this.scroller}
            getScrollElement={this.getScrollElement}
        >
            <div className={scrollWrapper}>
                <XView flexGrow={1} width="100%" position="absolute">
                    <MessagesWrapper >
                        {props.children}
                    </MessagesWrapper>
                </XView>
            </div>
        </XScrollViewReversed>
    );

    render() {

        return (
            <>
                {this.isEmpty() && (
                    <XScrollViewReversed ref={this.scroller}>
                        <MessagesWrapperEmpty>
                            <EmptyBlock
                                conversationType={this.props.conversationType}
                                onClick={this.props.inputShower}
                            />
                        </MessagesWrapperEmpty>
                    </XScrollViewReversed>
                )}
                {!this.isEmpty() && (
                    <XResizeDetector
                        handleWidth={false}
                        handleHeight={true}
                        onResize={this.resizeHandler}
                    >
                        <DataSourceRender
                            dataSource={this.props.conversation.dataSource}
                            reverce={true}
                            wrapWith={this.dataSourceWrapper}
                            renderItem={this.renderMessage}
                            renderLoading={this.renderLoading}
                        />
                    </XResizeDetector>
                )}
            </>
        );
    }
}
