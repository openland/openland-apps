import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withChat } from '../../api/withChat';
import { XScrollView } from 'openland-x/XScrollView';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';
import { UserShort } from 'openland-api/fragments/UserShort';
import { ApolloClient } from 'apollo-client';
import { ChatQuery } from 'openland-api';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XDate } from 'openland-x-format/XDate';

let Container = Glamorous.div({
    display: 'flex',
    flexBasis: 0,
    flexGrow: 1,
    flexDirection: 'column'
});

let SendMessageContainer = Glamorous.div({
    display: 'flex',
    height: '128px',
    flexDirection: 'row',
    flexShrink: 0,
    paddingTop: '8px',
    paddingLeft: '16px',
    paddingRight: '16px'
});

const CHAT_SUBSCRIPTION = gql`
  subscription ChatSubscription($conversationId: ID!, $seq: Int!) {
    event: alphaChatSubscribe(conversationId: $conversationId, fromSeq: $seq) {
      seq
      ... on ConversationEventMessage {
        message {
            id
            message
            sender {
                ...UserShort
            }
            date
        }
      }
    }
  }
  ${UserShort}
`;

class ChatWatcher extends React.Component<{ conversationId: string, refetch: () => void, seq: number, client: ApolloClient<{}> }> {

    // componentDidMount() {
    //     this.props.subscribeForMore({
    //         document: CHAT_SUBSCRIPTION,
    //         variables: { conversationId: this.props.conversationId, seq: this.props.seq },
    //         updateQuery: (prev: any, event: any) => {
    //             console.warn(event);
    //             return prev;
    //         }
    //     });
    // }

    render() {
        return (
            <Subscription
                subscription={CHAT_SUBSCRIPTION}
                variables={{ conversationId: this.props.conversationId, seq: this.props.seq }}
                shouldResubscribe={true}
            >
                {(result) => {
                    if (result.data && result.data.event) {
                        let seq = result.data.event.seq as number;
                        let shouldRefetch = false;
                        if (seq === this.props.seq + 1) {
                            if (result.data.event.__typename === 'ConversationEventMessage') {
                                console.warn('Received new message');
                                let data = this.props.client.readQuery({
                                    query: ChatQuery.document,
                                    variables: { conversationId: this.props.conversationId }
                                });
                                (data as any).messages.seq = seq;
                                (data as any).messages.messages = [result.data.event.message, ...(data as any).messages.messages];
                                this.props.client.writeQuery({
                                    query: ChatQuery.document,
                                    variables: { conversationId: this.props.conversationId },
                                    data: data
                                });
                            } else {
                                shouldRefetch = true;
                            }
                        } else if (seq > this.props.seq + 1) {
                            shouldRefetch = true;
                        }
                        if (shouldRefetch) {
                            this.props.refetch();
                        }
                    }
                    return null;
                }}
            </Subscription>
        );
    }
}

const Name = Glamorous.div({
    fontSize: '14px',
    fontWeight: 500,
    flexGrow: 1
});

const Date = Glamorous.div({
    fontSize: '14px',
    fontWeight: 300,
    opacity: 0.7
});

export default withApp('Super Chat', 'super-admin', withChat(withQueryLoader((props) => {
    return (
        <DevToolsScaffold title={props.data.chat.title}>
            <XHeader text={props.data.chat.title} />
            <Container>
                <ChatWatcher
                    conversationId={props.data.chat.id}
                    refetch={props.refetch}
                    seq={props.data.messages.seq}
                    client={(props as any).client}
                />
                <XScrollView>
                    <XVertical>
                        {props.data.messages.messages.map((v) => (
                            <XContent>
                                <XHorizontal alignSelf="stretch">
                                    <XAvatar cloudImageUuid={v.sender.picture ? v.sender.picture : undefined} />
                                    <XVertical separator={'none'}>
                                        <XHorizontal separator={8}>
                                            <Name>{v.sender.name}</Name><Date><XDate value={v.date} format="humanize"/></Date>
                                        </XHorizontal>
                                        <span>{v.message}</span>
                                    </XVertical>
                                </XHorizontal>
                            </XContent>
                        ))}
                    </XVertical>
                </XScrollView>
                <XForm
                    defaultAction={(data) => props.sendMessage({ variables: { message: data.message } })}
                    defaultData={{ message: '' }}
                    resetAfterSubmit={true}
                >
                    <SendMessageContainer>
                        <XInput field="message" flexGrow={1} />
                        <XFormSubmit text="Send" size="medium" />
                    </SendMessageContainer>
                </XForm>
            </Container>

        </DevToolsScaffold>
    );
})));