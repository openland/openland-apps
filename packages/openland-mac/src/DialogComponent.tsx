import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ConversationShortFragment } from 'openland-api/Types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { ZAvatar } from './ZAvatar';
import { AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItem } from './ZListItem';

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
    engine: MessengerEngine;
    item: ConversationShortFragment;
    selected?: boolean;
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
            // messageDate = formatDate(date);
            messageDate = 'date';
            if (this.props.item.topMessage.message) {
                messageText = this.props.item.topMessage.message;
            } else if (this.props.item.topMessage.file) {
                messageText = 'Sent file';
            }
        }
        return (
            <ZListItem style={{ height: 80, flexDirection: 'row' }} onPress={this.handlePress} selected={this.props.selected}>
                <View style={{ width: 80, height: 80 }} alignItems="center" justifyContent="center" shouldRasterizeIOS={true}>
                    <View position="absolute" style={{ width: 80, height: 80 }} alignItems="center" justifyContent="center">
                        <ZAvatar
                            src={this.props.item.photos.length > 0 ? this.props.item.photos[0] : undefined}
                            size={60}
                            placeholderKey={this.props.item.flexibleId}
                            placeholderTitle={this.props.item.title}
                        />
                    </View>
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
                                {/* <ZCounter value={this.props.item.unreadCount} /> */}
                            </View>
                        )}
                    </View>
                </View>
            </ZListItem>
        );
    }
}