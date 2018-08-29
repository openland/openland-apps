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
import { formatBytes } from '../../../../utils/formatBytes';

const paddedText = ' ' + '\u00A0'.repeat(10);
const paddedTextOut = ' ' + '\u00A0'.repeat(12);

export class AsyncMessageTextView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={false}>
                <ASFlex
                    marginLeft={14}
                    marginRight={14}
                    marginTop={7}
                    marginBottom={11}
                    flexDirection="column"
                >
                    <ASText
                        color={this.props.message.isOut ? '#fff' : '#000'}
                        lineHeight={20}
                        letterSpacing={-0.3}
                        fontSize={16}
                        fontWeight="400"
                    >
                        {this.props.message.text}
                        {this.props.message.isOut ? paddedTextOut : paddedText}
                    </ASText>
                </ASFlex>
                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={this.props.message.isOut ? 10 : 12}
                    marginBottom={10}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                    >
                        <ASText
                            backgroundColor="#f00"
                            fontSize={11}
                            lineHeight={13}
                            color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            opacity={this.props.message.isOut ? 0.7 : 0.6}
                        >
                            {formatTime(this.props.message.date)}
                        </ASText>
                        {this.props.message.isOut && (
                            <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </AsyncBubbleView>
        );
    }
}

export class AsyncMessageImageView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        let maxSize = Platform.select({
            default: 400,
            ios: Math.min(Dimensions.get('window').width - 120, 400),
            android: Math.min(Dimensions.get('window').width - 120, 400)
        });
        let layout = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, maxSize, maxSize);
        let optimalSize = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, 1024, 1024);
        let url = 'https://ucarecdn.com/' + this.props.message.file!!.fileId + '/';
        if (this.props.message.file!!.imageSize!!.width !== optimalSize.width || this.props.message.file!!.imageSize!!.height !== optimalSize.height) {
            url += '-/scale_crop/' + optimalSize.width + 'x' + optimalSize.height + '/';
        }
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={false} appearance="media">
                <ASImage
                    source={{ uri: url }}
                    width={layout.width}
                    height={layout.height}
                    borderRadius={10}
                />
            </AsyncBubbleView>
        );
    }
}

{/* <View style={{ height: 64, flexDirection: 'row', minWidth: this.props.isOut ? 200 : 180 }}>
                        <View style={{ width: 40, height: 40, backgroundColor: this.props.isOut ? '#2828c9' : '#ffffff', borderRadius: 20, margin: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={this.props.isOut ? require('assets/ic-file-download-my.png') : require('assets/ic-file-download-ios.png')} style={{ width: 16, height: 20 }} />
                        </View>
                        <View flexGrow={1} flexDirection="column" marginTop={12} marginBottom={12} marginRight={14} alignSelf="center">
                            <Text style={{ color: this.props.isOut ? '#ffffff' : '#000000', height: 20, fontSize: 15, lineHeight: 20, fontWeight: '600' }}>{this.props.fileName || 'file'}</Text>
                            <Text style={{ color: this.props.isOut ? '#ffffff' : '#000000', height: 15, fontSize: 13, lineHeight: 15, marginTop: 2, fontWeight: '500', opacity: 0.7 }}>{formatBytes(this.props.size)}</Text>
                        </View>
                        <View style={{ position: 'absolute', bottom: 6, height: 15, alignItems: 'center', justifyContent: 'center', right: this.props.isOut ? 0 : 8, flexDirection: 'row' }}>
                            <Text style={[styles.date, this.props.isOut && styles.dateOut]}>{formatTime(parseInt(this.props.date, 10))}</Text>
                            {this.props.isOut && (
                                <View style={{ width: 18, height: 13, marginLeft: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
                                    {this.props.isSending && <Image source={require('assets/ic-sending.png')} style={{ width: 13, height: 13 }} />}
                                    {!this.props.isSending && <Image source={require('assets/ic-sent.png')} style={{ marginTop: 2, width: 9, height: 8 }} />}
                                </View>
                            )}
                        </View>
                    </View> */}

export class AsyncDocumentView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={false}>
                <ASFlex height={60} flexDirection="row">
                    <ASFlex
                        width={40}
                        height={40}
                        backgroundColor={this.props.message.isOut ? '#5555ea' : 'rgba(224, 227, 231, 0.5)'}
                        borderRadius={20}
                        marginLeft={10}
                        marginTop={10}
                        marginBottom={10}
                        marginRight={10}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ASImage
                            source={this.props.message.isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png')}
                            width={16}
                            height={20}
                        />
                    </ASFlex>
                    <ASFlex
                        flexGrow={1}
                        flexDirection="column"
                        marginTop={12}
                        marginBottom={12}
                        marginRight={14}
                        alignSelf="center"
                    >
                        <ASText
                            color={this.props.message.isOut ? '#ffffff' : '#000000'}
                            height={18}
                            fontSize={15}
                            lineHeight={18}
                            numberOfLines={1}
                        >
                            {this.props.message.file!!.fileName}
                        </ASText>
                        <ASText
                            color={this.props.message.isOut ? '#ffffff' : '#8a8a8f'}
                            height={15}
                            lineHeight={15}
                            fontSize={13}
                            marginTop={3}
                            numberOfLines={1}
                            opacity={0.7}
                        >
                            {formatBytes(this.props.message.file!!.fileSize)}
                        </ASText>
                    </ASFlex>
                </ASFlex>
                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={this.props.message.isOut ? 10 : 12}
                    marginBottom={10}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                    >
                        <ASText
                            backgroundColor="#f00"
                            fontSize={11}
                            lineHeight={13}
                            color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            opacity={this.props.message.isOut ? 0.7 : 0.6}
                        >
                            {formatTime(this.props.message.date)}
                        </ASText>
                        {this.props.message.isOut && (
                            <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
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
                        <AsyncMessageTextView message={this.props.message} />
                    )}
                    {this.props.message.file && this.props.message.file.isImage && (
                        <AsyncMessageImageView message={this.props.message} />
                    )}
                    {this.props.message.file && !this.props.message.file.isImage && (
                        <AsyncDocumentView message={this.props.message} />
                    )}
                </ASFlex>
            </ASFlex>
        );
    }
}