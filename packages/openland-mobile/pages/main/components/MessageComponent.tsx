import * as React from 'react';
import { ModelMessage, isServerMessage, isPendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Dimensions, Linking, Image, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { formatTime } from '../../../utils/formatTime';
import { layoutMedia } from './MediaLayout';
import { ZImage } from '../../../components/ZImage';
import { formatBytes } from '../../../utils/formatBytes';
import { preprocessText } from '../../../utils/TextProcessor';
import { isAndroid } from '../../../utils/isAndroid';
import ImageViewer from 'react-native-image-zoom-viewer';
import { MessageGroup } from 'openland-engines/messenger/ConversationState';
import { ZRoundedMask } from '../../../components/ZRoundedMask';
import { BubbleView, BubbleImage } from './chat/BubbleView';
import { UserShortFragment } from 'openland-api/Types';
import { doSimpleHash } from 'openland-y-utils/hash';

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        // paddingVertical: 5,
        width: '100%',
        alignItems: 'flex-end'
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'column',
        paddingLeft: 7,
        flexGrow: 1,
        flexBasis: 0,
        alignItems: 'flex-start'
    } as ViewStyle,
    messageContainerOut: {
        alignItems: 'flex-end',
        paddingLeft: 51,
    } as ViewStyle,
    header: {
        flexDirection: 'row',
        height: 16,
        marginBottom: 1
    } as ViewStyle,
    sender: {
        height: 14,
        lineHeight: 14,
        fontSize: 12,
        letterSpacing: 0.2
    } as TextStyle,
    message: {
        lineHeight: 22,
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        letterSpacing: 0.1
    } as TextStyle,
    messageOut: {
        color: '#fff',
    } as TextStyle
});

const senderColors = [
    '#FF8D00',
    '#FF655D',
    '#20A700',
    '#1970FF',
    '#00C6C8',
    '#8E00E6'
];

class MessageTextContent extends React.PureComponent<{ text: string, sender?: UserShortFragment, isOut: boolean, attach?: 'bottom' | 'top' | 'both' }> {
    render() {
        let preprocessed = preprocessText(this.props.text);
        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <Text key={'br-' + i} >{'\n'}</Text>;
            } else if (v.type === 'link') {
                return <Text key={'link-' + i} style={{ color: '#654bfa' }} onPress={() => Linking.openURL(v.link!!)}>{v.text}</Text>;
            } else {
                return <Text key={'text-' + i}>{v.text}</Text>;
            }
        });
        let sender: any = undefined;
        if (this.props.sender) {
            let placeholderIndex = doSimpleHash(this.props.sender.id) % senderColors.length;
            sender = <Text key="sender-name" style={[styles.sender, { color: senderColors[placeholderIndex] }]}>{this.props.sender.name}</Text>;
        }
        return (
            <BubbleView appearance="text" isOut={this.props.isOut} attach={this.props.attach}>
                {sender}
                <Text key="message" style={[styles.message, this.props.isOut && styles.messageOut]}>
                    {parts}
                </Text>
            </BubbleView>
        );
    }
}

class MessageImageContent extends React.PureComponent<{ file: string, width: number, height: number, isGif: boolean, isOut: boolean, attach?: 'bottom' | 'top' | 'both' }, { modal: boolean }> {
    state = {
        modal: false
    };

    handleTouch = () => {
        this.setState({ modal: true });
    }

    handleClose = () => {
        this.setState({ modal: false });
    }

    render() {
        let maxSize = Math.min(Dimensions.get('window').width - 70, 400);
        let layout = layoutMedia(this.props.width, this.props.height, maxSize, maxSize);
        return (
            <BubbleView isOut={this.props.isOut} attach={this.props.attach} appearance="media">
                <TouchableOpacity onPress={this.handleTouch}>
                    <View width={layout.width} height={layout.height}>
                        <BubbleImage
                            uuid={this.props.file}
                            resize={!this.props.isGif}
                            width={layout.width}
                            height={layout.height}
                            isOut={this.props.isOut}
                            attach={this.props.attach}
                        />
                        <Modal visible={this.state.modal} transparent={true}>
                            <ImageViewer
                                imageUrls={[{ url: 'https://ucarecdn.com/' + this.props.file + '/' }]}
                                onSwipeDown={this.handleClose}
                                loadingRender={() => <ActivityIndicator
                                    color="#fff"
                                    style={{
                                        height: Dimensions.get('window').height,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                />}
                                enableSwipeDown={true}
                            />
                        </Modal>
                    </View>
                </TouchableOpacity>
            </BubbleView>
        );
    }
}

class MessageFileContent extends React.PureComponent<{ file: string, fileName?: string, size?: number, isOut: boolean, attach?: 'bottom' | 'top' }> {
    render() {
        return (
            <View style={{ height: 56, borderRadius: 5, borderColor: '#e7e7ea', borderWidth: 1, width: 250, marginTop: 3, marginBottom: 3, flexDirection: 'row' }}>
                <View style={{ width: 40, height: 40, backgroundColor: '#f4f4f4', borderRadius: 20, marginLeft: 12, marginRight: 12, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('assets/ic-signup-1.png')} style={{ width: 12, height: 16 }} />
                </View>
                <View flexGrow={1} flexBasis={0} flexDirection="column" marginTop={10} marginBottom={10}>
                    <Text style={{ color: '#181818', height: 16, fontSize: 14, lineHeight: 16, fontWeight: '500' }}>{this.props.fileName || 'file'}</Text>
                    <Text style={{ color: '#aaaaaa', height: 16, fontSize: 14, lineHeight: 16, marginTop: 4 }}>{formatBytes(this.props.size)}</Text>
                </View>
            </View>
        );
    }
}

export class MessageComponent extends React.PureComponent<{ onAvatarPress: (userId: string) => void, message: MessageGroup, engine: ConversationEngine }> {
    handlePress = () => {
        this.props.onAvatarPress(this.props.message.sender.id);
    }

    render() {
        let isOut = this.props.message.sender.id === this.props.engine.engine.user.id;

        let content: any[] = [];
        let i = 0;
        for (let m of this.props.message.messages) {
            let key = isServerMessage(m) ? m.id : m.key;
            let attach: 'bottom' | 'top' | 'both' | undefined;
            if (i === 0 && this.props.message.messages.length > 1) {
                attach = 'bottom';
            } else if (i !== 0) {
                if (i === this.props.message.messages.length - 1) {
                    attach = 'top';
                } else {
                    attach = 'both';
                }
            }
            let sender = (i === 0 && !isOut) ? this.props.message.sender : undefined;
            // let content = <MessageTextContent text="" />;
            if (m.message) {
                content.push(<MessageTextContent key={'msg-text-' + key} sender={sender} text={m.message} isOut={isOut} attach={attach} />);
            }
            if (isServerMessage(m)) {
                if (m.file) {
                    let w = m.fileMetadata!!.imageWidth ? m.fileMetadata!!.imageWidth!! : undefined;
                    let h = m.fileMetadata!!.imageHeight ? m.fileMetadata!!.imageHeight!! : undefined;
                    let name = m.fileMetadata!!.name ? m.fileMetadata!!.name!! : undefined;
                    let size = m.fileMetadata!!.size ? m.fileMetadata!!.size!! : undefined;
                    if (m.fileMetadata!!.isImage && !!w && !!h) {
                        content.push(<MessageImageContent key={'msg-file-' + key} attach={attach} file={m.file} width={w} height={h} isGif={m.fileMetadata!!.imageFormat === 'GIF'} isOut={isOut} />);
                    } else {
                        content.push(<MessageFileContent key={'msg-file-' + key} file={m.file} fileName={name} size={size} isOut={isOut} />);
                    }
                }
            }
            i++;
        }
        if (content.length === 0) {
            content.push(<MessageTextContent key={'msg-empty'} sender={this.props.message.sender} text="" isOut={isOut} />);
        }
        return (
            <View style={styles.container}>
                {!isOut && (
                    <View paddingBottom={7}>
                        <TouchableOpacity onPress={this.handlePress}>
                            <ZAvatar
                                src={this.props.message.sender.picture}
                                size={36}
                                placeholderKey={this.props.message.sender.id}
                                placeholderTitle={this.props.message.sender.name}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={[styles.messageContainer, isOut && styles.messageContainerOut]}>
                    {content}
                </View>
            </View>
        );
    }
}