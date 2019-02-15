import * as React from 'react';
import { XRouter } from 'openland-x-routing/XRouter';
import { includes } from 'openland-y-utils/isEqual';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

export interface MessagesStateContextProps {
    editMessageId: string | null;
    editMessage: string | null;
    setEditMessage: (id: string | null, message: string | null) => void;
    forwardMessagesId: Set<string>;
    forwardMessages: () => void;
    selectedMessages: Set<DataSourceMessageItem>;
    switchMessageSelect: (message: DataSourceMessageItem) => void;
    setForwardMessages: (id: Set<string>) => void;
    useForwardMessages: boolean;
    useForwardPlaceholder: boolean;
    useForwardHeader: boolean;
    changeForwardConverstion: () => void;
    replyMessagesId: Set<string>;
    replyMessages: Set<string>;
    replyMessagesSender: Set<string>;
    setReplyMessages: (id: Set<string>, messages: Set<string>, sender: Set<string>) => void;
    resetAll: () => void;
}

export const MessagesStateContext = React.createContext<MessagesStateContextProps>({
    editMessageId: null,
    editMessage: null,
    replyMessagesId: new Set(),
    replyMessagesSender: new Set(),
    replyMessages: new Set(),
    forwardMessagesId: new Set(),
    selectedMessages: new Set(),
    useForwardMessages: false,
    useForwardPlaceholder: false,
    useForwardHeader: false,
    setEditMessage: () => null,
    setForwardMessages: () => null,
    forwardMessages: () => null,
    changeForwardConverstion: () => null,
    setReplyMessages: () => null,
    resetAll: () => null,
    switchMessageSelect: () => null,
});

type MessagePageProps = {
    router: XRouter;
    userId?: string;
    organizationId?: string;
};
export class MessageStateProviderComponent extends React.PureComponent<
    MessagePageProps,
    MessagesStateContextProps
> {
    constructor(props: MessagePageProps) {
        super(props);

        this.state = {
            editMessageId: null,
            editMessage: null,
            forwardMessagesId: new Set(),
            selectedMessages: new Set(),
            replyMessagesId: new Set(),
            replyMessages: new Set(),
            replyMessagesSender: new Set(),
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
            setEditMessage: this.setEditMessage,
            setForwardMessages: this.setForwardMessages,
            forwardMessages: this.forwardMessages,
            setReplyMessages: this.setReplyMessages,
            changeForwardConverstion: this.changeForwardConverstion,
            switchMessageSelect: this.switchMessageSelect,
            resetAll: this.resetAll,
        };
    }

    componentWillReceiveProps(nextProps: MessagePageProps) {
        if (
            this.props.router.routeQuery.conversationId !==
                nextProps.router.routeQuery.conversationId &&
            !this.state.useForwardMessages
        ) {
            let target = {
                editMessageId: null,
                editMessage: null,
                forwardMessagesId: new Set(),
                selectedMessages: new Set(),
                replyMessagesId: new Set(),
                replyMessages: new Set(),
                replyMessagesSender: new Set(),
                useForwardMessages: false,
                useForwardPlaceholder: false,
                useForwardHeader: false,
            };

            if (!includes(this.state, target)) {
                this.setState(target);
            }
        }
    }

    private switchMessageSelect = (message: DataSourceMessageItem) => {
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

    private setForwardMessages = (id: Set<string>) => {
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

    private setReplyMessages = (id: Set<string>, messages: Set<string>, sender: Set<string>) => {
        this.setState({
            replyMessagesId: id,
            replyMessages: messages,
            replyMessagesSender: sender,
            forwardMessagesId: new Set(),
        });
    };

    private changeForwardConverstion = () => {
        this.setState({
            useForwardPlaceholder: false,
            useForwardHeader: false,
            replyMessagesId: new Set(),
            replyMessages: new Set(),
            replyMessagesSender: new Set(),
        });
    };

    private resetAll = () => {
        let target = {
            editMessageId: null,
            editMessage: null,
            forwardMessagesId: new Set(),
            selectedMessages: new Set(),
            replyMessagesId: new Set(),
            replyMessages: new Set(),
            replyMessagesSender: new Set(),
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
        };

        this.setState(target);
    };

    render() {
        let { children } = this.props;

        console.log('changeForwardConverstion', this.state);

        return (
            <MessagesStateContext.Provider value={this.state}>
                {children}
            </MessagesStateContext.Provider>
        );
    }
}
const getFirstInSet = (set: Set<string>) => {
    return [...set][0];
};

const getForwardText = ({ forwardMessagesId }: MessagesStateContextProps) => {
    return forwardMessagesId.size === 0
        ? null
        : `Forward ${forwardMessagesId.size} ` +
              (forwardMessagesId.size === 1 ? 'message' : 'messages');
};

const getReplyText = ({ replyMessagesId }: MessagesStateContextProps) => {
    return replyMessagesId.size === 0
        ? null
        : `Reply to ${replyMessagesId.size} ` +
              (replyMessagesId.size === 1 ? 'message' : 'messages');
};

const hasReply = ({ replyMessagesSender, replyMessages }: MessagesStateContextProps) => {
    return replyMessages.size && replyMessagesSender.size;
};

const getForwardOrReply = ({
    forwardMessagesId,
}: MessagesStateContextProps): 'forward' | 'reply' => {
    if (forwardMessagesId.size !== 0) {
        return 'forward';
    }
    return 'reply';
};

const hasForward = ({ useForwardMessages, forwardMessagesId }: MessagesStateContextProps) => {
    return useForwardMessages && forwardMessagesId.size;
};

export const getQuoteMessageReply = (messagesContext: MessagesStateContextProps) => {
    const mode = getForwardOrReply(messagesContext);

    if (mode === 'forward') {
        return hasForward(messagesContext) ? getForwardText(messagesContext) : '';
    }
    return hasReply(messagesContext)
        ? getFirstInSet(messagesContext.replyMessages)
        : getReplyText(messagesContext);
};

export const getQuoteMessageId = (messagesContext: MessagesStateContextProps) => {
    const mode = getForwardOrReply(messagesContext);

    if (mode === 'forward') {
        return hasForward(messagesContext)
            ? [getFirstInSet(messagesContext.forwardMessagesId)]
            : [];
    }
    return hasReply(messagesContext)
        ? [getFirstInSet(messagesContext.replyMessagesId)]
        : [...messagesContext.replyMessagesId];
};

export const getQuoteMessageSender = (messagesContext: MessagesStateContextProps) => {
    const mode = getForwardOrReply(messagesContext);

    if (mode === 'forward') {
        return hasForward(messagesContext) ? 'Forward' : '';
    }
    return hasReply(messagesContext) ? getFirstInSet(messagesContext.replyMessagesSender) : 'Reply';
};
