import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { ComposeSelect } from '../../api/ChatComposeSelect';
import { XHeader } from 'openland-x/XHeader';
import { OnChangeHandler, Option, OptionValues } from 'react-select';
import { MessengerContext, MessengerEngine } from './model/MessengerEngine';
import { Router } from '../../routes';
import { ChatCreateGroupMutation } from 'openland-api/ChatCreateGroupMutation';
import { MessageComposeComponent } from './components/view/MessageComposeComponent';
import { ConversationContainer } from './components/view/ConversationContainer';
import { MessagesContainer } from './components/view/MessagesContainer';
import { ConversationMessagesComponent } from './components/ConversationMessagesComponent';

const Root = Glamorous(XVertical)({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%'
});

class ComposeComponentRender extends React.Component<{ messenger: MessengerEngine }, { values: Option<OptionValues>[], resolving: boolean, conversationId: string | null }> {

    state = {
        values: [] as Option<OptionValues>[],
        resolving: false,
        conversationId: null
    };

    handleChange: OnChangeHandler = (vals) => {
        let nvals: Option<OptionValues>[] = [];
        if (vals === null) {
            nvals = [];
        } else if (Array.isArray(vals)) {
            nvals = [...vals];
        } else {
            nvals = [vals];
        }
        if (nvals.length === 1) {
            if ((nvals[0] as any)._obj.__typename === 'Organization') {
                Router.replaceRoute('/mail/' + (nvals[0] as any)._obj.id);
                return;
            }
            this.setState({ values: nvals, resolving: true, conversationId: null });
            (async () => {
                let id = await this.props.messenger.global.resolvePrivateConversation(nvals[0].value!! as string);
                this.setState({ conversationId: id.id, resolving: false });
            })();
        } else if (nvals.length > 1) {
            this.setState({ values: nvals, resolving: true, conversationId: null });
            (async () => {
                let id = await this.props.messenger.global.resolveGroup(nvals.map((v) => v.value!! as string));
                if (id) {
                    this.setState({ conversationId: id.id, resolving: false });
                } else {
                    this.setState({ conversationId: null, resolving: false });
                }
            })();
        } else {
            this.setState({ values: nvals, resolving: false, conversationId: null });
        }
    }

    handleSend = async (msg: string) => {
        if (this.state.values.length === 1) {
            let id = await this.props.messenger.global.resolvePrivateConversation(this.state.values[0].value!! as string);
            await this.props.messenger.sender.sendMessageAsync(id.id, msg);
            Router.replaceRoute('/mail/' + id.flexibleId);
        } else if (this.state.values.length > 1) {
            let id = await this.props.messenger.global.resolveGroup(this.state.values.map((v) => v.value!! as string));
            if (id) {
                await this.props.messenger.sender.sendMessageAsync(id.id, msg);
                Router.replaceRoute('/mail/' + id.flexibleId);
            } else {
                let res = await this.props.messenger.client.mutate({
                    mutation: ChatCreateGroupMutation.document,
                    variables: {
                        message: msg,
                        members: this.state.values.map((v) => v.value)
                    }
                });
                Router.replaceRoute('/mail/' + (res.data as any).group.id);
            }
        }
    }

    render() {
        return (
            <Root flexGrow={1} separator={'none'}>
                <XHeader text={'Compose new message'} separated={true} />
                <ConversationContainer>
                    <ComposeSelect
                        placeholder="Start typing name or multiple names..."
                        onChange={this.handleChange}
                        value={this.state.values}
                        multi={true}
                        minimumInput={3}
                        variables={{ organizations: this.state.values.length === 0 }}
                    />
                    <MessagesContainer>
                        {this.state.conversationId && <ConversationMessagesComponent conversation={this.props.messenger.getConversation(this.state.conversationId!!)} />}
                    </MessagesContainer>
                    <MessageComposeComponent onSend={this.handleSend} enabled={this.state.values.length > 0} />
                </ConversationContainer>
            </Root>
        );
    }
}

export const ComposeComponent = () => {
    return (
        <MessengerContext.Consumer>
            {messenger => <ComposeComponentRender messenger={messenger!!} />}
        </MessengerContext.Consumer>
    );
};