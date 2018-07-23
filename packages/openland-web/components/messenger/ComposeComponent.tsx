import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { ComposeSelect } from '../../api/ChatComposeSelect';
import { OnChangeHandler, Option, OptionValues } from 'react-select';
import { Router } from '../../routes';
import { ChatCreateGroupMutation } from 'openland-api/ChatCreateGroupMutation';
import { MessageComposeComponent } from './components/view/MessageComposeComponent';
import { ConversationContainer } from './components/view/ConversationContainer';
import { MessagesContainer } from './components/view/MessagesContainer';
import { ConversationMessagesComponent } from './components/ConversationMessagesComponent';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';

const Root = Glamorous(XVertical)({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%'
});

const HeaderWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexShrink: 0,
    paddingLeft: 40,
    paddingRight: 40
});

const Title = Glamorous.div({
    alignItems: 'center',
    maxWidth: 850,
    width: '100%',
    flexBasis: '100%',
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    color: '#334562'
});

const ComposeSelectWrapper = Glamorous.div({
    maxWidth: 930,
    paddingLeft: 40,
    paddingRight: 40,
    width: '100%',
    alignSelf: 'center'
});

const EmptyDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexGrow: 1,
    flexBasis: '100%'
});

const ComposeText = Glamorous.div({
    fontSize: 14,
    letterSpacing: -0.3,
    color: '#99a2b0',
    marginTop: 10
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
                let res = await this.props.messenger.client.client.mutate({
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
                <HeaderWrapper>
                    <Title>Compose new message</Title>
                </HeaderWrapper>
                <ConversationContainer>
                    <ComposeSelectWrapper>
                        <ComposeSelect
                            placeholder="Start typing name or multiple names..."
                            onChange={this.handleChange}
                            value={this.state.values}
                            multi={true}
                            minimumInput={3}
                            variables={{ organizations: this.state.values.length === 0 }}
                        />
                    </ComposeSelectWrapper>
                    <MessagesContainer>
                        {!this.state.conversationId && (
                            <EmptyDiv>
                                <img src={'/static/X/chat-compose.svg'}/>
                                <ComposeText>There are no people to create a chat</ComposeText>
                            </EmptyDiv>
                        )}
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