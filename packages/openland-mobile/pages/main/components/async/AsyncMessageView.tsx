import * as React from 'react';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';

export class AsyncMessageView extends React.PureComponent<{ message: ModelMessage, engine: ConversationEngine }> {
    render() {
        const sender = isServerMessage(this.props.message) ? this.props.message.sender : this.props.engine.engine.user;
        const isOut = sender.id === this.props.engine.engine.user.id;
        return (
            <ASFlex flexDirection="row">
                <AsyncAvatar
                    size={28}
                    src={sender.picture}
                    placeholderKey={sender.id}
                    placeholderTitle={sender.name}
                />
                <ASFlex flexDirection="column" flexGrow={1} flexBasis={0}>
                    <AsyncBubbleView isOut={isOut} compact={true}>
                        <ASFlex marginLeft={14} marginRight={14} marginTop={7} marginBottom={8} flexDirection="column">
                            <ASText numberOfLines={2} flexShrink={0}>{this.props.message.message}</ASText>
                        </ASFlex>
                    </AsyncBubbleView>
                </ASFlex>
            </ASFlex>
        );
    }
}