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
            <ASFlex flexDirection="row" marginLeft={4} marginRight={4} alignItems="flex-end">
                {!isOut &&
                    <ASFlex marginBottom={7} marginRight={-4} marginLeft={4}>
                        <AsyncAvatar
                            size={28}
                            src={sender.picture}
                            placeholderKey={sender.id}
                            placeholderTitle={sender.name}
                        />
                    </ASFlex>
                }
                <ASFlex flexDirection="column" alignItems={isOut ? 'flex-end' : 'flex-start'} flexGrow={1} flexBasis={0} marginLeft={isOut ? 50 : 0} marginRight={isOut ? 0 : 50}>
                    <AsyncBubbleView isOut={isOut} compact={true}>
                        <ASFlex marginLeft={14} marginRight={14} marginTop={7} marginBottom={8} flexDirection="column">
                            <ASText color={isOut ? '#fff' : '#000'} lineHeight={22} fontSize={16}>{this.props.message.message}</ASText>
                        </ASFlex>
                    </AsyncBubbleView>
                </ASFlex>
            </ASFlex>
        );
    }
}