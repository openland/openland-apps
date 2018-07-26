import * as React from 'react';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Dimensions, Linking, Image } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { formatTime } from '../../../utils/formatTime';
import { layoutMedia } from './MediaLayout';
import { ZCloudImage } from '../../../components/ZCloudImage';
import { formatBytes } from '../../../utils/formatBytes';
import { preprocessText } from '../../../utils/TextProcessor';
import { isAndroid } from '../../../utils/isAndroid';

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '100%'
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'column',
        paddingLeft: 12,
        flexGrow: 1,
        flexBasis: 0
    } as ViewStyle,
    header: {
        flexDirection: 'row',
        height: 16,
        marginBottom: 1
    } as ViewStyle,
    sender: {
        height: 16,
        lineHeight: 16,
        fontSize: 15,
        fontWeight: isAndroid ? '500' : '600',
        marginBottom: 3,
        // flexBasis: 0,
        flexShrink: 1,
        color: '#181818'
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
        marginTop: 1,
        lineHeight: 18,
        fontSize: 14,
        fontWeight: 'normal',
        color: '#5b5b5b',
    } as TextStyle
});

class MessageTextContent extends React.PureComponent<{ text: string }> {
    render() {
        let preprocessed = preprocessText(this.props.text);
        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <Text key={'br-' + i}>{'\n'}</Text>;
            } else if (v.type === 'link') {
                return <Text key={'link-' + i} style={{ color: '#654bfa' }} onPress={() => Linking.openURL(v.link!!)}>{v.text}</Text>;
            } else {
                return <Text key={'text-' + i}>{v.text}</Text>;
            }
        });
        return (<Text style={styles.message}>{parts}</Text>);
    }
}

class MessageImageContent extends React.PureComponent<{ file: string, width: number, height: number }> {
    render() {
        let maxSize = Math.min(Dimensions.get('window').width - 70, 400);
        let layout = layoutMedia(this.props.width, this.props.height, maxSize, maxSize);
        return (
            <View width={layout.width} height={layout.height} style={{ marginTop: 4, marginBottom: 4 }}>
                <ZCloudImage src={this.props.file} width={layout.width} height={layout.height} style={{ borderRadius: 6 }} />
            </View>
        );
    }
}

class MessageFileContent extends React.PureComponent<{ file: string, fileName?: string, size?: number }> {
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

export class MessageComponent extends React.PureComponent<{ message: ModelMessage, engine: ConversationEngine }> {
    render() {
        let sender = isServerMessage(this.props.message) ? this.props.message.sender : this.props.engine.engine.user;
        let content: any[] = [];
        // let content = <MessageTextContent text="" />;
        if (this.props.message.message) {
            content.push(<MessageTextContent text={this.props.message.message} />);
        }
        if (isServerMessage(this.props.message)) {
            if (this.props.message.file) {
                let w = this.props.message.fileMetadata!!.imageWidth ? this.props.message.fileMetadata!!.imageWidth!! : undefined;
                let h = this.props.message.fileMetadata!!.imageHeight ? this.props.message.fileMetadata!!.imageHeight!! : undefined;
                let name = this.props.message.fileMetadata!!.name ? this.props.message.fileMetadata!!.name!! : undefined;
                let size = this.props.message.fileMetadata!!.size ? this.props.message.fileMetadata!!.size!! : undefined;
                if (this.props.message.fileMetadata!!.isImage && !!w && !!h) {
                    content.push(<MessageImageContent file={this.props.message.file} width={w} height={h} />);
                } else {
                    content.push(<MessageFileContent file={this.props.message.file} fileName={name} size={size} />);
                }
            }
        }
        if (content.length === 0) {
            content.push(<MessageTextContent text="" />);
        }
        return (
            <View style={styles.container}>
                <ZAvatar src={sender.picture} size={32} placeholderKey={sender.id} placeholderTitle={sender.name} />
                <View style={styles.messageContainer}>
                    <View style={styles.header}>
                        <Text style={styles.sender}>{sender.name}</Text>
                        <Text style={styles.date}>{formatTime(parseInt(this.props.message.date, 10))}</Text>
                    </View>
                    {content}
                </View>
            </View>
        );
    }
}