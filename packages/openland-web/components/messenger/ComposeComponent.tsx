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
import { XButton } from 'openland-x/XButton';
import ChannelIcon from './components/icons/ic-channel.svg';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { withChatCompose } from '../../api/withChatCompose';

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
    height: 50,
    paddingTop: 10,
    flexShrink: 0,
    maxWidth: 832,
    paddingLeft: 66,
    paddingRight: 66,
    width: '100%',
    alignSelf: 'center'
});

const HeaderButton = Glamorous(XButton)({
    '& svg': {
        marginLeft: -4
    },
    '&:active svg *': {
        fill: '#ffffff'
    }
});

const Title = Glamorous.div({
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    flexBasis: '100%',
    fontSize: 18,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: -0.5,
    color: '#121e2b'
});

const ComposeSelectWrapper = Glamorous.div({
    maxWidth: 832,
    marginTop: 10,
    paddingLeft: 66,
    paddingRight: 66,
    width: '100%',
    alignSelf: 'center',
    zIndex: 2,
    position: 'relative'
});

const EmptyWrapper = Glamorous(XVertical)({
    zIndex: 1,
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: -16,
    marginRight: -16
});

const EmptyReactangle = Glamorous.div({
    width: '100%',
    height: 600,
    position: 'absolute',
    top: 'calc(50% - 300px)',
    left: 0,
    backgroundImage: 'url(\'/static/X/messenger/reactangle.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    zIndex: 0,
    pointerEvents: 'none'
});

const EmptyContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginBottom: 50
});

const EmptyImage = Glamorous.div({
    width: 358,
    height: 311,
    background: 'url(/static/X/messenger/compose-empty.png) no-repeat',
    backgroundImage: '-webkit-image-set(url(/static/X/messenger/compose-empty.png) 1x, url(/static/X/messenger/compose-empty@2x.png) 2x)',
    backgroundSize: '100% auto',
    backgroundPosition: 'center bottom',
    marginBottom: 50
});

const EmptyTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: -0.35,
    color: '#334562',
    marginBottom: 4
});

const EmptyText = Glamorous.div({
    width: 320,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.35,
    color: '#5c6a81',
    textAlign: 'center'
});

const SearchPeopleModule = withChatCompose(props => {
    if (!(props.data && props.data.items)) {
        return (
            <XSelect
                creatable={true}
                multi={true}
                options={[]}
                render={
                    <XSelectCustomUsersRender
                        multi={true}
                        popper={true}
                        placeholder="Whom would you like to message?"
                        rounded={true}
                        onInputChange={(data) => (props as any).onChangeInput(data)}
                        helpText="Wait..."
                    />
                }
            />
        );
    }
    return (
        <XSelect
            value={(props as any).value}
            creatable={true}
            multi={true}
            options={props.data.items.map(i => {
                if (i.__typename === 'User') {
                    return { type: i.__typename, label: i.title, value: i.id, photo: i.photo, org: i.organization ? i.organization.name : '' };
                } else {
                    return { type: i.__typename, label: i.title, value: i.id, photo: i.photo, org: 'Organization' };
                }
            }) || []}
            onChange={(data) => (props as any).onChange(data)}
            render={
                <XSelectCustomUsersRender
                    multi={true}
                    placeholder="Whom would you like to message?"
                    rounded={true}
                    onInputChange={(data) => (props as any).onChangeInput(data)}
                />
            }
        />
    );
}) as React.ComponentType<{ value?: any, variables: { query?: string, organizations?: boolean }, onChange: (data: Option<OptionValues>[]) => void, onChangeInput: (data: string) => void }>;

class ComposeComponentRender extends React.Component<{ messenger: MessengerEngine, conversationId: string }, { values: Option<OptionValues>[], resolving: boolean, conversationId: string | null, query: string }> {
    state = {
        values: [] as Option<OptionValues>[],
        resolving: false,
        conversationId: null,
        query: ''
    };

    handleChange: OnChangeHandler = (vals) => {
        console.warn(vals);

        let nvals: Option<OptionValues>[] = [];
        if (vals === null) {
            nvals = [];
        } else if (Array.isArray(vals)) {
            nvals = [...vals];
        } else {
            nvals = [vals];
        }
        if (nvals.length === 1) {
            if ((nvals[0] as any).type === 'Organization') {
                Router.replaceRoute('/mail/' + (nvals[0] as any).value);
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

    handleSearchText = (query: string) => {
        this.setState({
            query: query
        });
    }

    render() {
        return (
            <Root flexGrow={1} separator={'none'}>
                <HeaderWrapper>
                    <Title>Find or start a conversation</Title>
                    <HeaderButton
                        text="New channel"
                        size="r-default"
                        icon={<ChannelIcon />}
                        query={{ field: 'createChannel', value: 'true' }}
                    />
                </HeaderWrapper>
                <ConversationContainer>
                    <ComposeSelectWrapper>
                        <SearchPeopleModule
                            onChange={this.handleChange}
                            onChangeInput={this.handleSearchText}
                            value={this.state.values}
                            variables={{
                                query: this.state.query,
                                organizations: this.state.values.length === 0
                            }}
                        />
                        {/* <ComposeSelect
                            placeholder="Whom would you like to message?"
                            onChange={this.handleChange}
                            value={this.state.values}
                            multi={true}
                            rounded={true}
                            variables={{ organizations: this.state.values.length === 0 }}
                        /> */}
                    </ComposeSelectWrapper>
                    <MessagesContainer>
                        {!this.state.conversationId && (
                            <EmptyWrapper separator={10} alignItems="center" justifyContent="center" flexGrow={1}>
                                <EmptyReactangle />
                                <EmptyContent>
                                    <EmptyImage />
                                    <EmptyTitle>Start a conversation</EmptyTitle>
                                    <EmptyText>You can message a person, create a group chat, or write to a channel</EmptyText>
                                </EmptyContent>
                            </EmptyWrapper>
                        )}
                        {this.state.conversationId && (
                            <ConversationMessagesComponent
                                conversation={this.props.messenger.getConversation(this.state.conversationId!!)}
                                conversationId={this.props.conversationId}
                            />
                        )}
                    </MessagesContainer>
                    <MessageComposeComponent onSend={this.handleSend} enabled={this.state.values.length > 0} />
                </ConversationContainer>
            </Root>
        );
    }
}

export const ComposeComponent = (props: {conversationId: string}) => {
    return (
        <MessengerContext.Consumer>
            {messenger => <ComposeComponentRender messenger={messenger!!} conversationId={props.conversationId} />}
        </MessengerContext.Consumer>
    );
};