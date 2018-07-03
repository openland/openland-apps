import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { XTable } from 'openland-x/XTable';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withChat } from '../../api/withChat';
import { XScrollView } from 'openland-x/XScrollView';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

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

// const CHAT_SUBSCRIPTION = gql`
//   subscription ChatSubscription($conversationId: ID!) {
//     alphaChatSubscribe(conversationId: $conversationId) {
//       id
//       message
//     }
//   }
// `;

export default withApp('Super Chat', 'super-admin', withChat(withQueryLoader((props) => {
    return (
        <DevToolsScaffold title={props.data.chat.title}>
            <XHeader text={props.data.chat.title} />
            <Container>
                {/* <Subscription /> */}
                <XScrollView>
                    <XTable>
                        <XTable.Body>
                            {props.data.messages.map((v) => (
                                <XTable.Row><XTable.Cell>{v.message}</XTable.Cell></XTable.Row>
                            ))}
                        </XTable.Body>
                    </XTable>
                </XScrollView>

                <XForm
                    defaultAction={(data) => props.sendMessage({ variables: { message: data.message } })}
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