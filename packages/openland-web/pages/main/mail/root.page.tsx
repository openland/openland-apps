import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { MessageFull } from 'openland-api/Types';
import { MessagesNavigation } from './components/MessagesNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

type MessagePageProps = {
    router: XRouter;
    userId?: string;
    organizationId?: string;
};

class MessageStateProviderComponent extends React.PureComponent<
    MessagePageProps,
    MessagesStateContextProps
> {
    constructor(props: MessagePageProps) {
        super(props);

        this.state = {
            editMessageId: null,
            editMessage: null,
            forwardMessagesId: null,
            selectedMessages: new Set(),
            replyMessagesId: null,
            replyMessages: null,
            replyMessagesSender: null,
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
            setEditMessage: this.setEditMessage,
            setForwardMessages: this.setForwardMessages,
            forwardMessages: this.forwardMessages,
            setReplyMessages: this.setReplyMessages,
            changeForwardConverstion: this.changeForwardConverstion,
            resetAll: this.resetAll,
            switchMessageSelect: this.switchMessageSelect,
        };
    }

    componentWillReceiveProps(nextProps: MessagePageProps) {
        if (
            this.props.router.routeQuery.conversationId !==
                nextProps.router.routeQuery.conversationId &&
            !this.state.useForwardMessages
        ) {
            this.state.resetAll();
        }
    }

    private switchMessageSelect = (message: MessageFull) => {
        let res = new Set(this.state.selectedMessages);
        if (res.has(message)) {
            res.delete(message);
        } else {
            res.add(message);
        }
        this.setState({
            selectedMessages: res,
        });
    };

    private setEditMessage = (id: string | null, message: string | null) => {
        this.setState({
            editMessageId: id,
            editMessage: message,
        });
    };

    private setForwardMessages = (id: Set<string> | null) => {
        let useHeader = false;
        if (id && id.size > 0) {
            useHeader = true;
        }
        this.setState({
            forwardMessagesId: id,
            useForwardHeader: useHeader,
        });
    };

    private forwardMessages = () => {
        this.setState({
            useForwardMessages: true,
            useForwardPlaceholder: true,
            useForwardHeader: false,
        });
    };

    private setReplyMessages = (
        id: Set<string> | null,
        messages: Set<string> | null,
        sender: Set<string> | null,
    ) => {
        this.setState({
            replyMessagesId: id,
            replyMessages: messages,
            replyMessagesSender: sender,
            forwardMessagesId: null,
        });
    };

    private changeForwardConverstion = () => {
        this.setState({
            useForwardPlaceholder: false,
            useForwardHeader: false,
        });
    };

    private resetAll = () => {
        this.setState({
            editMessageId: null,
            editMessage: null,
            forwardMessagesId: null,
            selectedMessages: new Set(),
            replyMessagesId: null,
            replyMessages: null,
            replyMessagesSender: null,
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
        });
    };

    render() {
        let { children } = this.props;

        return (
            <MessagesStateContext.Provider value={this.state}>
                {children}
            </MessagesStateContext.Provider>
        );
    }
}

export default withApp('Mail', 'viewer', () => {
    const router = React.useContext(XRouterContext) as XRouter;
    const { path, routeQuery } = router;
    let cid = routeQuery.conversationId;
    let oid = routeQuery.organizationId;
    let uid = routeQuery.userId;

    return (
        <MessageStateProviderComponent router={router}>
            <MessagesNavigation path={path} cid={cid} oid={oid} uid={uid} />
        </MessageStateProviderComponent>
    );
});
