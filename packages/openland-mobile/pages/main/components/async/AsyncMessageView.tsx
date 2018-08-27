import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

export class AsyncMessageView extends React.PureComponent<{ message: DataSourceMessageItem, engine: ConversationEngine }> {
    render() {
        return (
            <ASFlex flexDirection="row" marginLeft={4} marginRight={4} alignItems="flex-end">
                {!this.props.message.isOut &&
                    <ASFlex marginBottom={7} marginRight={-4} marginLeft={4}>
                        <AsyncAvatar
                            size={28}
                            src={this.props.message.senderPhoto}
                            // placeholderKey={sender.id}
                            placeholderTitle={this.props.message.senderName}
                        />
                    </ASFlex>
                }
                <ASFlex flexDirection="column" alignItems={this.props.message.isOut ? 'flex-end' : 'flex-start'} flexGrow={1} flexBasis={0} marginLeft={this.props.message.isOut ? 50 : 0} marginRight={this.props.message.isOut ? 0 : 50}>
                    <AsyncBubbleView isOut={this.props.message.isOut} compact={true}>
                        <ASFlex marginLeft={14} marginRight={14} marginTop={7} marginBottom={8} flexDirection="column">
                            <ASText color={this.props.message.isOut ? '#fff' : '#000'} lineHeight={22} fontSize={16}>{this.props.message.message}</ASText>
                        </ASFlex>
                    </AsyncBubbleView>
                </ASFlex>
            </ASFlex>
        );
    }
}