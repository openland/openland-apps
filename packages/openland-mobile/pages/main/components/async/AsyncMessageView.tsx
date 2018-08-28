import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASImage } from 'react-native-async-view/ASImage';
import { formatTime } from '../../../../utils/formatTime';

export class AsyncMessageView extends React.PureComponent<{ message: DataSourceMessageItem, engine: ConversationEngine }> {

    paddedText = ' ' + '\u00A0'.repeat(13);
    paddedTextOut = ' ' + '\u00A0'.repeat(16);

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
                        <ASFlex marginLeft={14} marginRight={14} marginTop={6} marginBottom={9} flexDirection="column">
                            <ASText
                                color={this.props.message.isOut ? '#fff' : '#000'}
                                lineHeight={21.7}
                                letterSpacing={-0.29}
                                fontSize={18}
                                fontWeight="400"
                            >
                                {this.props.message.text}
                                {this.props.message.isOut ? this.paddedTextOut : this.paddedText}
                            </ASText>
                        </ASFlex>
                        <ASFlex overlay={true} alignItems="flex-end" justifyContent="flex-end" marginRight={14} marginBottom={12}>
                            <ASFlex flexDirection="row" height={15}>
                                <ASText backgroundColor="#f00" fontSize={13} lineHeight={15} color={this.props.message.isOut ? '#fff' : '#8a8a8f'}>{formatTime(this.props.message.date)}</ASText>
                                {this.props.message.isOut && (
                                    <ASFlex width={18} height={13} marginLeft={2} justifyContent="center" alignItems="flex-start">
                                        {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                        {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} marginTop={2} />}
                                    </ASFlex>
                                )}
                            </ASFlex>
                        </ASFlex>
                    </AsyncBubbleView>
                </ASFlex>
            </ASFlex>
        );
    }
}