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

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 5,
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
        paddingLeft: 0,
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
        // fontWeight: isAndroid ? '500' : 'normal',
        marginBottom: 4,
        marginLeft: 16,
        // flexBasis: 0,
        // flexShrink: 1,
        color: '#b9c1cd',
        letterSpacing: 0.2
    } as TextStyle,
    date: {
        height: 16,
        lineHeight: 16,
        fontSize: 12,
        color: '#aaaaaa',
        marginLeft: 5,
        fontWeight: 'normal'
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
    } as TextStyle,
    textBubble: {
        backgroundColor: '#eff2f5',
        borderRadius: 18,
        borderBottomLeftRadius: 4,
        paddingHorizontal: 13,
        paddingTop: 7,
        paddingBottom: 8
    } as ViewStyle,
    textBubbleOut: {
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 4,
        backgroundColor: '#4747ec',
    } as ViewStyle
});

class MessageTextContent extends React.PureComponent<{ text: string, isOut: boolean }> {
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
        return (<View style={[styles.textBubble, this.props.isOut && styles.textBubbleOut]}><Text style={[styles.message, this.props.isOut && styles.messageOut]}>{parts}</Text></View>);
    }
}

class MessageImageContent extends React.PureComponent<{ file: string, width: number, height: number, isGif: boolean, isOut: boolean }, { modal: boolean }> {
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
            <TouchableOpacity onPress={this.handleTouch}>
                <View width={layout.width} height={layout.height} style={{ marginTop: 4, marginBottom: 4 }}>
                    <ZImage source={{ uuid: this.props.file }} resize={!this.props.isGif} width={layout.width} height={layout.height} style={{ borderRadius: 6 }} />
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
        );
    }
}

class MessageFileContent extends React.PureComponent<{ file: string, fileName?: string, size?: number, isOut: boolean }> {
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

export class MessageComponent extends React.PureComponent<{ onAvatarPress: (userId: string) => void, message: ModelMessage, engine: ConversationEngine }> {
    handlePress = () => {
        let sender = isServerMessage(this.props.message) ? this.props.message.sender : this.props.engine.engine.user;
        this.props.onAvatarPress(sender.id);
    }

    render() {
        let isOut = isPendingMessage(this.props.message) || this.props.message.sender.id === this.props.engine.engine.user.id;

        let sender = isServerMessage(this.props.message) ? this.props.message.sender : this.props.engine.engine.user;
        let content: any[] = [];
        // let content = <MessageTextContent text="" />;
        if (this.props.message.message) {
            content.push(<MessageTextContent text={this.props.message.message} isOut={isOut} />);
        }
        if (isServerMessage(this.props.message)) {
            if (this.props.message.file) {
                let w = this.props.message.fileMetadata!!.imageWidth ? this.props.message.fileMetadata!!.imageWidth!! : undefined;
                let h = this.props.message.fileMetadata!!.imageHeight ? this.props.message.fileMetadata!!.imageHeight!! : undefined;
                let name = this.props.message.fileMetadata!!.name ? this.props.message.fileMetadata!!.name!! : undefined;
                let size = this.props.message.fileMetadata!!.size ? this.props.message.fileMetadata!!.size!! : undefined;
                if (this.props.message.fileMetadata!!.isImage && !!w && !!h) {
                    content.push(<MessageImageContent file={this.props.message.file} width={w} height={h} isGif={this.props.message.fileMetadata!!.imageFormat === 'GIF'} isOut={isOut} />);
                } else {
                    content.push(<MessageFileContent file={this.props.message.file} fileName={name} size={size} isOut={isOut} />);
                }
            }
        }
        if (content.length === 0) {
            content.push(<MessageTextContent text="" isOut={isOut} />);
        }
        return (
            <View style={styles.container}>
                {!isOut && (
                    <TouchableOpacity onPress={this.handlePress}>
                        <ZAvatar src={sender.picture} size={36} placeholderKey={sender.id} placeholderTitle={sender.name} />
                    </TouchableOpacity>
                )}
                <View style={[styles.messageContainer, isOut && styles.messageContainerOut]}>
                    {!isOut && (
                        <View style={styles.header}>
                            <Text style={styles.sender}>{sender.name}</Text>
                            {/* <Text style={styles.date}>{formatTime(parseInt(this.props.message.date, 10))}</Text> */}
                        </View>)
                    }
                    {content}
                </View>
            </View>
        );
    }
}