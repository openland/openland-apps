import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { ASListView } from 'react-native-async-view/ASListView';
import { MobileMessengerContext } from '../../../messenger/MobileMessenger';

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
            <ZSafeAreaContext.Consumer>
                {area => (
                    <MobileMessengerContext.Consumer>
                        {engine => (
                            <ASListView
                                dataView={engine.getConversation(this.props.engine.conversationId)}
                                inverted={true}
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                style={{ flexGrow: 1 }}
                                headerPadding={16}
                            />
                        )}
                    </MobileMessengerContext.Consumer>
                )}
            </ZSafeAreaContext.Consumer>
        );
    }
}