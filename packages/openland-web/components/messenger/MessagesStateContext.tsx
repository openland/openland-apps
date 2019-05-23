import * as React from 'react';
import { XRouter } from 'openland-x-routing/XRouter';
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
    getChatId: () => string;
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
    getChatId: () => '',
});

type MessagePageProps = {
    router: XRouter;
    userId?: string;
    organizationId?: string;
    cid: string;
};

function eqSet(as: any, bs: any) {
    if (as.size !== bs.size) {
        return false;
    }
    for (let a of as) {
        if (!bs.has(a)) {
            return false;
        }
    }
    return true;
}

export class MessageStateProviderComponent extends React.PureComponent<
    MessagePageProps,
    MessagesStateContextProps
> {
    chatId = '';
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
            getChatId: this.getChatId,
        };
        this.chatId = props.cid;
    }

    getChatId = () => this.chatId;

    componentWillReceiveProps(nextProps: MessagePageProps) {
        this.chatId = nextProps.cid;
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

            if (!this.checkMixIsSame(this.state, target)) {
                console.log('set state');
                this.setState(target);
            }
        }
    }

    private checkIsSame = (state1: any, state2: any) => {
        for (let key of Object.keys(state1)) {
            const item1 = state1[key];
            const item2 = state2[key];

            if (typeof item1 === typeof item2 && item2 instanceof Set) {
                if (!eqSet(item1, item2)) {
                    return false;
                }
            } else if (item1 !== item2) {
                return false;
            }
        }

        return true;
    };

    private checkMixIsSame = (state1: any, mix: any) => {
        const result = this.checkIsSame(mix, state1);
        return result;
    };

    private switchMessageSelect = (message: DataSourceMessageItem) => {
        let res = new Set(this.state.selectedMessages);
        if (res.has(message)) {
            res.delete(message);
        } else {
            res.add(message);
        }

        let target = {
            selectedMessages: res,
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    private setEditMessage = (id: string | null, message: string | null) => {
        let target = {
            editMessageId: id,
            editMessage: message,
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    private setForwardMessages = (id: Set<string>) => {
        let useHeader = false;
        if (id && id.size > 0) {
            useHeader = true;
        }

        let target = {
            forwardMessagesId: id,
            useForwardHeader: useHeader,
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    private forwardMessages = () => {
        let target = {
            useForwardMessages: true,
            useForwardPlaceholder: true,
            useForwardHeader: false,
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    private setReplyMessages = (id: Set<string>, messages: Set<string>, sender: Set<string>) => {
        let target = {
            replyMessagesId: id,
            replyMessages: messages,
            replyMessagesSender: sender,
            forwardMessagesId: new Set(),
            useForwardHeader: false,
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    private changeForwardConverstion = () => {
        let target = {
            useForwardPlaceholder: false,
            useForwardHeader: false,
            replyMessagesId: new Set(),
            replyMessages: new Set(),
            replyMessagesSender: new Set(),
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    private resetAll = () => {
        console.log('resetAll');
        let target = {
            editMessageId: null,
            editMessage: null,
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
            forwardMessagesId: new Set(),
            selectedMessages: new Set(),
            replyMessagesId: new Set(),
            replyMessages: new Set(),
            replyMessagesSender: new Set(),
        };

        if (!this.checkMixIsSame(this.state, target)) {
            console.log('set state');
            this.setState(target);
        }
    };

    render() {
        // console.log('render MessageStateProviderComponent', this.state);
        return (
            <MessagesStateContext.Provider value={this.state}>
                {this.props.children}
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

export const getQuoteMessagesId = (messagesContext: MessagesStateContextProps) => {
    const mode = getForwardOrReply(messagesContext);

    if (mode === 'forward') {
        return hasForward(messagesContext) ? [...messagesContext.forwardMessagesId] : [];
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
