import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASListView } from 'react-native-async-view/ASListView';
import { MobileMessengerContext } from '../../../messenger/MobileMessenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { Platform, View } from 'react-native';
import { androidMessageInputListOverlap } from './ConversationView';
import { ASFlex } from 'react-native-async-view/ASFlex';

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
                            <View marginTop={Platform.OS === 'ios' ? -500 : 0} justifyContent="flex-start" alignItems="stretch" flexGrow={1}>
                                <ASListView
                                    dataView={engine.getConversation(this.props.engine.conversationId)}
                                    inverted={true}
                                    contentPaddingTop={area.top + (Platform.OS === 'ios' ? 500 : 0)}
                                    contentPaddingBottom={0}
                                    style={{ flexGrow: 1 }}
                                    headerPadding={Platform.select({ ios: 6, android: androidMessageInputListOverlap })}
                                    overflowColor="#ffffff"
                                />
                            </View>
                        )}
                    </MobileMessengerContext.Consumer>
                )}
            </ASSafeAreaContext.Consumer>
        );
    }
}