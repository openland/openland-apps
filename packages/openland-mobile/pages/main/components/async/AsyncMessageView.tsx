import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASImage } from 'react-native-async-view/ASImage';
import { formatTime } from '../../../../utils/formatTime';
import { Platform, Dimensions } from 'react-native';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';

export class AsyncMessageTextView extends React.PureComponent<{ message: DataSourceMessageItem, engine: ConversationEngine }> {
    paddedText = ' ' + '\u00A0'.repeat(13);
    paddedTextOut = ' ' + '\u00A0'.repeat(16);
    render() {
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={false}>
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
        );
    }
}

export class AsyncMessageImageView extends React.PureComponent<{ message: DataSourceMessageItem, engine: ConversationEngine }> {
    render() {
        let maxSize = Platform.select({
            default: 400,
            ios: Math.min(Dimensions.get('window').width - 120, 400),
            android: Math.min(Dimensions.get('window').width - 120, 400)
        });
        let layout = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, maxSize, maxSize);
        let optimalSize = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, 1024, 1024);

        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={false} appearance="media">
                <ASImage
                    source={{ uri: 'https://ucarecdn.com/' + this.props.message.file!!.fileId + '/' }}
                    width={layout.width}
                    height={layout.height}
                    borderRadius={10}
                />
            </AsyncBubbleView>
        );
    }
}
export class AsyncMessageView extends React.PureComponent<{ message: DataSourceMessageItem, engine: ConversationEngine, onAvatarPress: (id: string) => void }> {

    private handlePress = () => {
        this.props.onAvatarPress(this.props.message.senderId);
    }

    render() {
        return (
            <ASFlex flexDirection="row" marginLeft={4} marginRight={4} alignItems="flex-end">
                {!this.props.message.isOut &&
                    <ASFlex marginBottom={4} marginRight={-4} marginLeft={4} onPress={this.handlePress}>
                        <AsyncAvatar
                            size={28}
                            src={this.props.message.senderPhoto}
                            placeholderKey={this.props.message.senderId}
                            placeholderTitle={this.props.message.senderName}
                        />
                    </ASFlex>
                }
                <ASFlex flexDirection="column" alignItems={this.props.message.isOut ? 'flex-end' : 'flex-start'} flexGrow={1} flexBasis={0} marginLeft={this.props.message.isOut ? 50 : 0} marginRight={this.props.message.isOut ? 0 : 50}>
                    {this.props.message.text && !this.props.message.file && (
                        <AsyncMessageTextView message={this.props.message} engine={this.props.engine} />
                    )}
                    {this.props.message.file && this.props.message.file.isImage && (
                        <AsyncMessageImageView message={this.props.message} engine={this.props.engine} />
                    )}
                </ASFlex>
            </ASFlex>
        );
    }
}