import * as React from 'react';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withRouter } from 'openland-x-routing/withRouter';
import { MessageFull } from 'openland-api/Types';
import { MessagePageInner } from './Components';
import { tabs, tabsT } from './tabs';
import { MessagesUniversalNavigation } from './MessagesUniversalNavigation';
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
    const { path, routeQuery } = React.useContext(XRouterContext) as XRouter;
    let cid = routeQuery.conversationId;
    let oid = routeQuery.organizationId;
    let uid = routeQuery.userId;

    return <MessagesUniversalNavigation path={path} cid={cid} oid={oid} uid={uid} />;
});
