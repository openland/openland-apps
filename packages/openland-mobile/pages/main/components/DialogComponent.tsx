import * as React from 'react';
import { ZListItem } from '../../../components/ZListItem';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { ZCounter } from '../../../components/ZCounter';
import { ConversationShortFragment } from 'openland-api/Types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: '500',
        height: 18,
        textAlignVertical: 'center',
        flexGrow: 1,
        flexBasis: 0
    } as TextStyle,
    date: {
        fontSize: 13,
        height: 18,
        fontWeight: '300',
        color: '#99a2b0'
    } as TextStyle,
    message: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 18,
        height: 36,
        textAlignVertical: 'center',
        color: '#99a2b0'
    } as TextStyle,
    messageSingle: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 18,
        height: 18,
        textAlignVertical: 'center',
        color: '#99a2b0'
    } as TextStyle,
    sender: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 18,
        height: 18,
        color: '#334562'
    } as TextStyle
});

interface DialogComponentProps {
    engine: MessengerEngine;
    item: ConversationShortFragment;
    onPress: (id: string) => void;
}

let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

function formatDate(date: number) {
    let dt = new Date(date);
    let now = new Date();
    // let year = dt.getFullYear().toString();
    let month = months[dt.getMonth()];
    let day = dt.getDate();
    if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
        // return <span>Today</span>;
        let hours = dt.getHours();
        let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return hours + ':' + ('0' + dt.getMinutes()).substr(-2) + ampm;
    }
    return month + ' ' + day;
}

export class DialogComponent extends React.PureComponent<DialogComponentProps> {

    handlePress = () => {
        this.props.onPress(this.props.item.id);
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
            <ZListItem onPress={this.handlePress} height={80} separatorPaddingStart={80}>
                <View width={80} height={80} alignItems="center" justifyContent="center">
                    <ZAvatar
                        src={this.props.item.photos.length > 0 ? this.props.item.photos[0] : undefined}
                        size={60}
                        placeholderKey={this.props.item.flexibleId}
                        placeholderTitle={this.props.item.title}
                    />
                </View>
                <View flexGrow={1} paddingTop={12} paddingBottom={12} paddingRight={10} alignItems="stretch">
                    <View flexDirection="row" height={18}>
                        <Text style={styles.title}>{this.props.item.title}</Text>
                        <Text style={styles.date}>{messageDate}</Text>
                    </View>
                    <View flexDirection="row" height={36} marginTop={4}>
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
            </ZListItem>
        );
    }
}