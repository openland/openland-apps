import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { OnChangeHandler, Option, OptionValues } from 'react-select';
import { Router } from '../routes';
import { MessageComposeComponent } from '../components/messenger/components/view/MessageComposeComponent';
import { ConversationContainer } from '../components/messenger/components/view/ConversationContainer';
import { MessagesContainer } from '../components/messenger/components/view/MessagesContainer';
import { ConversationMessagesComponent } from '../components/messenger/components/ConversationMessagesComponent';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { XButton } from 'openland-x/XButton';
import RoomIcon from 'openland-icons/ic-channel-2.svg';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { withUserInfo } from '../components/UserInfo';
import { UserShort } from 'openland-api/Types';
import { TextCompose } from 'openland-text/TextCompose';
import { ModelMessage } from 'openland-engines/messenger/types';
import { withExplorePeople } from '../api/withExplorePeople';
import { MessageFull_mentions } from 'openland-api/Types';
import { RoomCreateMutation } from 'openland-api';

export let MessengerContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100vh',
    justifyContent: 'center',
    position: 'relative',
});

const Root = Glamorous(XVertical)({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
});

const HeaderWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingTop: 10,
    flexShrink: 0,
    maxWidth: 832,
    paddingLeft: 77,
    paddingRight: 77,
    width: '100%',
    alignSelf: 'center',
});

const HeaderButton = Glamorous(XButton)({
    '& svg': {
        marginLeft: -4,
    },
    '& svg *': {
        transition: 'all .15s ease',
        fill: 'rgba(0, 0, 0, 0.2)',
    },
    '&:hover svg *': {
        fill: 'rgba(0, 0, 0, 0.5)',
    },
    '&:active svg *': {
        fill: '#ffffff',
    },
});

const Title = Glamorous.div({
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    flexBasis: '100%',
    fontSize: 18,
    lineHeight: '20px',
    fontWeight: 600,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.9)',
});

const ComposeSelectWrapper = Glamorous.div({
    maxWidth: 832,
    marginTop: 10,
    paddingLeft: 61,
    paddingRight: 61,
    width: '100%',
    alignSelf: 'center',
    zIndex: 2,
    position: 'relative',
});

const EmptyWrapper = Glamorous(XVertical)({
    zIndex: 1,
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 30,
    marginLeft: -16,
    marginRight: -16,
});

const EmptyImage = Glamorous.div({
    width: 358,
    height: 311,
    background: 'url(/static/X/messenger/compose-empty.png) no-repeat',
    backgroundImage:
        '-webkit-image-set(url(/static/X/messenger/compose-empty.png) 1x, url(/static/X/messenger/compose-empty@2x.png) 2x)',
    backgroundSize: '100% auto',
    backgroundPosition: 'center bottom',
    marginBottom: 50,
});

const SearchPeopleModule = withExplorePeople(props => {
    if (!(props.data && props.data.items)) {
        console.warn(props);
        return (
            <XSelect
                creatable={true}
                multi={true}
                options={[]}
                render={
                    <XSelectCustomUsersRender
                        multi={true}
                        popper={true}
                        placeholder={TextCompose.searchPlaceholder}
                        rounded={true}
                        onInputChange={data => (props as any).onChangeInput(data)}
                        helpText={TextCompose.searchLoading}
                        inCompose={true}
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
            options={
                props.data.items.edges.map(i => {
                    let u = i.node;
                    return {
                        label: u.name,
                        value: u.id,
                        photo: u.photo,
                        org: u.primaryOrganization ? u.primaryOrganization.name : '',
                    };
                }) || []
            }
            onChange={data => (props as any).onChange(data)}
            render={
                <XSelectCustomUsersRender
                    multi={true}
                    placeholder={TextCompose.searchPlaceholder}
                    rounded={true}
                    onInputChange={data => (props as any).onChangeInput(data)}
                    inCompose={true}
                />
            }
        />
    );
}) as React.ComponentType<{
    value?: any;
    variables: { query?: string; organizations?: boolean };
    onChange: (data: Option<OptionValues>[]) => void;
    onChangeInput: (data: string) => void;
}>;

type ComposeComponentRenderProps = {
    messenger: MessengerEngine;
    me?: UserShort;
};

type ComposeComponentRenderState = {
    values: Option<OptionValues>[];
    resolving: boolean;
    conversationId: string | null;
    query: string;
    loading: boolean;
    messages: ModelMessage[];
};

class ComposeComponentRender extends React.Component<
    ComposeComponentRenderProps,
    ComposeComponentRenderState
    > {
    conversationMessages = React.createRef<ConversationMessagesComponent>();
    private conversation: ConversationEngine | null;
    unmounter: (() => void) | null = null;
    unmounter2: (() => void) | null = null;

    constructor(props: ComposeComponentRenderProps) {
        super(props);

        this.conversation = null;
        this.state = {
            values: [] as Option<OptionValues>[],
            resolving: false,
            conversationId: null,
            query: '',
            messages: [],
            loading: true,
        };
    }

    onMessageSend = () => {
        if (this.conversationMessages.current) {
            this.conversationMessages.current.scrollToBottom();
        }
    };

    onConversationUpdated = (state: ConversationState) => {
        this.setState({ loading: state.loading, messages: state.messages });
    };

    updateConversation = ({
        conversationId,
        messenger,
    }: {
        conversationId: string;
        messenger: any;
    }) => {
        if (this.unmounter) {
            this.unmounter();
        }
        if (this.unmounter2) {
            this.unmounter2();
        }

        this.conversation = messenger.getConversation(conversationId);
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.unmounter = this.conversation.engine.mountConversation(conversationId);
        this.unmounter2 = this.conversation.subscribe(this);

        let convState = this.conversation.getState();

        this.setState({
            messages: convState.messages,
            loading: convState.loading,
        });
    };

    componentWillUnmount() {
        if (this.unmounter) {
            this.unmounter();
        }
        if (this.unmounter2) {
            this.unmounter2();
        }
    }

    handleChange: OnChangeHandler = vals => {
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
            this.setState({
                values: nvals,
                resolving: true,
                conversationId: null,
            });
            (async () => {
                let id = await this.props.messenger.global.resolvePrivateConversation(nvals[0]
                    .value!! as string);

                this.setState({ conversationId: id.id, resolving: false }, () => {
                    this.updateConversation({
                        conversationId: id.id,
                        messenger: this.props.messenger,
                    });
                });
            })();
        } else if (nvals.length > 1) {
            this.setState({
                values: nvals,
                resolving: true,
                conversationId: null,
            });
            (async () => {
                let id = await this.props.messenger.global.resolveGroup(
                    nvals.map(v => v.value!! as string),
                );
                if (id) {
                    this.setState({ conversationId: id.id, resolving: false });
                } else {
                    this.setState({ conversationId: null, resolving: false });
                }
            })();
        } else {
            this.setState({
                values: nvals,
                resolving: false,
                conversationId: null,
            });
        }
    };

    handleSend = async (msg: string, mentions: MessageFull_mentions[] | null) => {
        if (this.state.values.length === 1) {
            let id = await this.props.messenger.global.resolvePrivateConversation(this.state
                .values[0].value!! as string);
            await this.props.messenger.sender.sendMessageAsync({
                conversationId: id.id,
                message: msg,
                mentions,
            });
            Router.replaceRoute('/mail/' + id.flexibleId);
        } else if (this.state.values.length > 1) {
            let id = await this.props.messenger.global.resolveGroup(
                this.state.values.map(v => v.value!! as string),
            );
            if (id) {
                await this.props.messenger.sender.sendMessageAsync({
                    conversationId: id.id,
                    message: msg,
                    mentions,
                });
                Router.replaceRoute('/mail/' + id.flexibleId);
            } else {
                let res = await this.props.messenger.client.client.mutate({
                    mutation: RoomCreateMutation.document,
                    variables: {
                        kind: 'GROUP',
                        message: msg,
                        title: this.state.values.map(v => v.label).join(', '),
                        members: this.state.values.map(v => v.value),
                    },
                });
                Router.replaceRoute('/mail/' + (res.data as any).room.id);
            }
        }
    };

    handleSearchText = (query: string) => {
        this.setState({
            query: query,
        });
    };

    render() {
        return (
            <MessengerContainer>
                <Root flexGrow={1} separator={'none'}>
                    <HeaderWrapper>
                        <Title>{TextCompose.headerTitle}</Title>
                        <HeaderButton
                            text={TextCompose.headerNewRoom}
                            icon={<RoomIcon />}
                            query={{ field: 'createRoom', value: 'true' }}
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
                                    organizations: this.state.values.length === 0,
                                }}
                            />
                        </ComposeSelectWrapper>
                        <MessagesContainer>
                            {!this.state.conversationId && (
                                <EmptyWrapper
                                    separator={10}
                                    alignItems="center"
                                    justifyContent="center"
                                    flexGrow={1}
                                >
                                    <EmptyImage />
                                </EmptyWrapper>
                            )}
                            {this.state.conversationId && (
                                <ConversationMessagesComponent
                                    messages={this.state.messages}
                                    loading={this.state.loading}
                                    me={this.props.me}
                                    conversation={this.props.messenger.getConversation(
                                        this.state.conversationId!!,
                                    )}
                                    conversationId={this.state.conversationId}
                                />
                            )}
                        </MessagesContainer>
                        <MessageComposeComponent
                            onSend={this.handleSend}
                            enabled={this.state.values.length > 0}
                        />
                    </ConversationContainer>
                </Root>
            </MessengerContainer>
        );
    }
}

export const ComposeFragment = withUserInfo((props: any) => {
    return (
        <MessengerContext.Consumer>
            {messenger => (
                <ComposeComponentRender messenger={messenger!!} me={(props as any).user} />
            )}
        </MessengerContext.Consumer>
    );
});
