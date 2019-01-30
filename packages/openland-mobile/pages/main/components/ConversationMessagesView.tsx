import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASListView } from 'react-native-async-view/ASListView';
import { MobileMessengerContext } from '../../../messenger/MobileMessenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { Platform } from 'react-native';
import { androidMessageInputListOverlap } from './ConversationView';

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
                                contentPaddingBottom={0}
                                style={{ flexGrow: 1 }}
                                headerPadding={Platform.select({ ios: 6, android: androidMessageInputListOverlap })}
                                overflowColor="#ffffff"
                            />
                        )}
                    </MobileMessengerContext.Consumer>
                )}
            </ASSafeAreaContext.Consumer>
        );
    }
}