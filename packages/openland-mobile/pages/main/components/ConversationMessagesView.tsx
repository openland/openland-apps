import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASListView } from 'react-native-async-view/ASListView';
import { MobileMessengerContext } from '../../../messenger/MobileMessenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

export interface ConversationMessagesViewProps {
    loaded: boolean;
    engine: ConversationEngine;
}

export class ConversationMessagesView extends React.PureComponent<ConversationMessagesViewProps> {

    scrollToStart = () => {
        // TODO: Implement
    }

    render() {
        return (
            <ASSafeAreaContext.Consumer>
                {area => (
                    <MobileMessengerContext.Consumer>
                        {engine => (
                            <ASListView
                                dataView={engine.getConversation(this.props.engine.conversationId)}
                                inverted={true}
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom - area.keyboardHeight}
                                style={{ flexGrow: 1 }}
                                headerPadding={6}
                            />
                        )}
                    </MobileMessengerContext.Consumer>
                )}
            </ASSafeAreaContext.Consumer>
        );
    }
}