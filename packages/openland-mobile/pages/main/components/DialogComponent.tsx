import * as React from 'react';
import { ZListItemBase } from '../../../components/ZListItemBase';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { ZCounter } from '../../../components/ZCounter';
import { ConversationShortFragment } from 'openland-api/Types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { formatDate } from '../../../utils/formatDate';
import { isAndroid } from '../../../utils/isAndroid';

const styles = StyleSheet.create({
    title: {
        fontSize: isAndroid ? 16 : 15,
        fontWeight: isAndroid ? '400' : '600',
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
    engine: MessengerEngine;
    item: ConversationShortFragment;
    onPress: (id: ConversationShortFragment) => void;
}
export class DialogComponent extends React.PureComponent<DialogComponentProps> {

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
                messageText = 'Sent file';
            }
        }
        return (
            <ZListItemBase onPress={this.handlePress} height={80} separatorPaddingStart={80}>
                <View width={80} height={80} alignItems="center" justifyContent="center" transform={[{ rotate: '20deg' }]}>
                    <ZAvatar
                        src={this.props.item.photos.length > 0 ? this.props.item.photos[0] : undefined}
                        size={isAndroid ? 56 : 60}
                        placeholderKey={this.props.item.flexibleId}
                        placeholderTitle={this.props.item.title}
                    />
                </View>
                <View flexGrow={1} paddingTop={12} paddingBottom={12} paddingRight={10} alignItems="stretch">
                    <View flexDirection="row" height={18}>
                        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{this.props.item.title}</Text>
                        <Text style={styles.date}>{messageDate}</Text>
                    </View>
                    <View flexDirection="row" height={36} marginTop={3}>
                        <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
                            {this.props.item.topMessage && this.props.item.topMessage.sender.id === this.props.engine.user.id && (
                                <Text style={styles.message} numberOfLines={2}>{messageText}</Text>
                            )}
                            {this.props.item.topMessage && this.props.item.topMessage.sender.id !== this.props.engine.user.id && (
                                <>
                                    <Text style={styles.sender} numberOfLines={1}>{this.props.item.topMessage!!.sender.name}</Text>
                                    <Text style={styles.messageSingle} numberOfLines={1}>{messageText}</Text>
                                </>
                            )}
                        </View>
                        {this.props.item.unreadCount > 0 && (
                            <View alignSelf="flex-end" marginBottom={2}>
                                <ZCounter value={this.props.item.unreadCount} />
                            </View>
                        )}
                    </View>
                </View>
            </ZListItemBase>
        );
    }
}