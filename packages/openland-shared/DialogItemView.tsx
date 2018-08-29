import * as React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import { ConversationShortFragment } from 'openland-api/Types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { XPListItem } from 'openland-xp/XPListItem';
import { XPCounter } from 'openland-xp/XPCounter';
import { formatDate } from './utils/formatDate';
import { XPText } from 'openland-xp/XPText';

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 18,
        height: 18,
        flexGrow: 1,
        flexBasis: 0,
        paddingRight: 8,
        color: '#181818'
    } as TextStyle,
    date: {
        fontSize: 13,
        height: 18,
        lineHeight: 18,
        fontWeight: 'normal',
        color: '#aaaaaa'
    } as TextStyle,
    message: {
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 18,
        height: 36,
        textAlignVertical: 'top',
        color: '#7b7b7b'
    } as TextStyle,
    messageSingle: {
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 18,
        height: 18,
        textAlignVertical: 'top',
        color: '#7b7b7b'
    } as TextStyle,
    sender: {
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 18,
        height: 18,
        color: '#181818'
    } as TextStyle
});

interface DialogComponentProps {
    selected?: boolean;
    engine: MessengerEngine;
    item: any;
    onPress: (id: any) => void;
}
export class DialogItemView extends React.PureComponent<DialogComponentProps> {

    handlePress = () => {
        this.props.onPress(this.props.item);
    }

    render() {
        let messageText: string | undefined = undefined;
        let messageDate: string | undefined = undefined;
        if (this.props.item.topMessage) {
            let date = parseInt(this.props.item.topMessage.date, 10);
            messageDate = formatDate(date);
            if (this.props.item.topMessage.message) {
                messageText = this.props.item.topMessage.message;
            } else if (this.props.item.topMessage.file) {
                if (this.props.item.topMessage.fileMetadata) {
                    if (this.props.item.topMessage.fileMetadata.isImage) {
                        if (this.props.item.topMessage.fileMetadata.imageFormat === 'GIF') {
                            messageText = 'GIF';
                        } else {
                            messageText = 'Photo';
                        }
                    } else {
                        messageText = this.props.item.topMessage.fileMetadata!!.name;
                    }
                } else {
                    messageText = 'Document';
                }
            }
        }
        return (
            <XPListItem onPress={this.handlePress} style={{ height: 80 }} selected={this.props.selected}>
                <View width={80} height={80} alignItems="center" justifyContent="center">
                    <XPAvatar
                        src={this.props.item.photos!!.length > 0 ? this.props.item.photos!![0] : undefined}
                        size={60}
                        placeholderKey={this.props.item.flexibleId}
                        placeholderTitle={this.props.item.title}
                    />
                </View>
                <View flexGrow={1} paddingTop={12} paddingBottom={12} paddingRight={10} alignItems="stretch">
                    <View flexDirection="row" height={18}>
                        <XPText style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{this.props.item.title}</XPText>
                        <XPText style={styles.date}>{messageDate}</XPText>
                    </View>
                    <View flexDirection="row" height={36} marginTop={3}>
                        <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
                            {this.props.item.topMessage && this.props.item.topMessage.sender.id === this.props.engine.user.id && this.props.item.__typename === 'PrivateConversation' && (
                                <XPText style={styles.message} numberOfLines={2}>{messageText}</XPText>
                            )}
                            {this.props.item.topMessage && (!(this.props.item.topMessage.sender.id === this.props.engine.user.id && this.props.item.__typename === 'PrivateConversation')) && (
                                <>
                                    <XPText style={styles.sender} numberOfLines={1}>{this.props.item.topMessage!!.sender.id === this.props.engine.user.id ? 'You' : this.props.item.topMessage!!.sender.name}</XPText>
                                    <XPText style={styles.messageSingle} numberOfLines={1}>{messageText}</XPText>
                                </>
                            )}
                        </View>
                        {this.props.item.unreadCount!! > 0 && (
                            <View alignSelf="flex-end" marginBottom={2}>
                                <XPCounter value={this.props.item.unreadCount!!} />
                            </View>
                        )}
                    </View>
                </View>
            </XPListItem>
        );
    }
}